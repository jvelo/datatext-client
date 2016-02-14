import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {Page, PagesService} from '../services/pages';

@Component({
  selector: 'editpage',
  templateUrl: './datatext/editpage/editpage.html'
})
export class EditPage implements OnInit {

  page: Page;

  constructor(
    private router: Router,
    private routeParams: RouteParams,
    private pagesService: PagesService
  ) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.pagesService.getPage(id).subscribe(result => this.page = result.page,
                                            err => console.error(err));
  }

  savePage(options = { done: false}) {
    this.pagesService.updatePage(this.page)
        .subscribe(() => {
          if (options.done) {
            this.router.navigate(['Page', { id: this.page.id }]);
          }
        }, err => console.error(err),
        () => console.log('Pages saved'));
  }
}
