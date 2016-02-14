import {
  Component,
  Directive,
  ElementRef,
  OnInit,
  Input,
  Inject,
  OnChanges,
  SimpleChange
} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {PagesService} from '../services/pages';
import {Page as PageModel} from '../services/pages';

@Directive({
  selector: '[htmlContent]',
  properties: [
    'content: htmlContent'
  ]
})
export class HTMLContent implements OnChanges {
  private content: string;
  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    this.elementRef.nativeElement.innerHTML = this.content;
    const tables = this.elementRef.nativeElement.querySelectorAll('table');
    Array.prototype.forEach.call(tables, node => node.classList.add('table'));
  }
}

@Component({
  selector: 'page',
  templateUrl: './datatext/page/page.html',
  directives: [ HTMLContent ]
})
export class Page implements OnInit {

  page: PageModel;

  @Input() id;

  constructor(
    private router: Router,
    private routeParams: RouteParams,
    private pagesService: PagesService
  ) {
  }

  ngOnInit() {
    let id = this.id || this.routeParams.get('id');
    this.pagesService.getPage(id).subscribe(result => this.page = result.page,
                                            err => console.error(err));
  }

  editPage() {
    this.pagesService.editPage.next(this.page);
  }

  openRevisions() {
    this.router.navigate( ['PageRevisions', { id: this.page.id }] );
  }
}
