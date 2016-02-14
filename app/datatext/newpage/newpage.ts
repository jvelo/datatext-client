import {Component} from 'angular2/core';
import {Page, DefaultPage, PagesService} from '../services/pages';

@Component({
  selector: 'newpage',
  templateUrl: './datatext/newpage/newpage.html'
})
export class NewPage {
  pagesService: PagesService;
  model: Page = new DefaultPage({
    content: '',
    title: ''
  });
  submitted = false;

  constructor(pagesService: PagesService) {
    this.pagesService = pagesService;
  }

  onSubmit() {
    this.pagesService.createPage(this.model)
        .subscribe(data => console.log(data),
                   err => console.error(err),
                   () => console.log('Pages created'));
    console.log('Hello, submitted');
    this.submitted = true;
  }
}
