import {Component, Input} from 'angular2/core';
import {Control} from 'angular2/common';

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

  preview: Page;

  content = new Control();
  title = new Control();

  ngOnChanges() {
    if (this.page !== undefined) {
      this.preview = this.page.clone();
    }
  }

  constructor(
    private pagesService: PagesService
  ) {
    ['title', 'content'].forEach(property => {
      this[property].valueChanges
                    .debounceTime(400)
                    .subscribe(content => this.previewPage());
    });
  }

  previewPage() {
    this.pagesService.preview(this.page)
        .subscribe(page => {
          this.preview = page;
        }, err => console.error(err));
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
