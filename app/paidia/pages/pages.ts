import {Component} from 'angular2/core';
import {Page, PagesService} from '../services/pages';

import {Router} from 'angular2/router';

@Component({
  selector: 'pages',
  templateUrl: './paidia/pages/pages.html'
})
export class Pages {
  pages: Array<Page>;

  constructor(private _router: Router, private pagesService: PagesService) {

    this.pagesService.listPages()
        .subscribe(data => this.pages = data.pages,
                   err => console.error(err));
  }

  openPage(page: Page) {
    this._router.navigate( ['Page', { id: page.id }] );
  }
}
