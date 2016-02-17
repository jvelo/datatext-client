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

  constructor( @Inject(ElementRef) private elementRef: ElementRef) {
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    const fragment = document.createDocumentFragment(),
          wrapper = document.createElement('div');

    wrapper.innerHTML = this.content;

    const scripts = wrapper.querySelectorAll('script');
    fragment.appendChild(wrapper);

    this.elementRef.nativeElement.innerHTML = wrapper.innerHTML;

    [].forEach.call(scripts, script => {
      const payload = script.innerHTML,
            element = document.createElement('script');
      element.text = payload;
      document.body.appendChild(element);
    });
  }
}

@Component({
  selector: 'page',
  templateUrl: './datatext/page/page.html',
  directives: [HTMLContent]
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

  fetchPage() {
    const id = this.id || this.routeParams.get('id');
    this.pagesService.getPage(id).subscribe(page => this.page = page,
      err => console.error(err));
  }

  ngOnInit() {
    this.fetchPage();

    this.pagesService.editPage.subscribe(page => {
      if (page === undefined) {
        // Stopped editing : reload page
        this.fetchPage();
      }
    });
  }

  editPage() {
    this.pagesService.editPage.next(this.page);
  }

  openRevisions() {
    this.router.navigate(['PageRevisions', { id: this.page.id }]);
  }
}
