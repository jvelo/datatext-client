import {Component, Directive, ElementRef, OnInit, Input, Inject, OnChanges, SimpleChange} from 'angular2/core';
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
    Array.prototype.forEach.call(this.elementRef.nativeElement.querySelectorAll('table'),
    node => node.classList.add('table'));
  }
}

@Component({
  selector: 'page',
  templateUrl: './paidia/page/page.html',
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

  editPage(page: PageModel) {
    this.router.navigate( ['EditPage', { id: page.id }] );
  }

  openRevisions(page: PageModel) {
    this.router.navigate( ['PageRevisions', { id: page.id }] );
  }
}
