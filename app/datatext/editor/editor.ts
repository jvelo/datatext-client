import {Component, Input} from 'angular2/core';

import {Page, PagesService} from '../services/pages';
import {HTMLContent} from '../page/page';

@Component({
  selector: 'datatext-editor',
  templateUrl: './datatext/editor/editor.html',
  directives: [ HTMLContent ]
})
export class Editor {

  @Input()
  page: Page;

  constructor(
    private pagesService: PagesService
  ) {
  }

  savePage(options = { done: false}) {
    this.pagesService.updatePage(this.page)
        .subscribe(() => {
          if (options.done) {
            this.close();
          }
        }, err => console.error(err),
        () => console.log('Pages saved'));
  }

  close() {
    this.pagesService.editPage.next(undefined);
  }
}
