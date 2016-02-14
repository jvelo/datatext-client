import {Http} from 'angular2/http';
import {Injectable, EventEmitter, provide} from 'angular2/core';
import {Observable} from 'rxjs';

export interface Page {
  title: string;
  content: string;
  id?: string;
  htmlContent?: string;

  clone() : Page;
}

export class DefaultPage implements Page {

  title:string;
  content: string;
  htmlContent: string;
  id: string;

  constructor(json: any) {
    this.title = json.title;
    this.content = json.content;
    this.id = json.id;
    this.htmlContent = json.html_content;
  }

  clone() {
    return new DefaultPage({
      title: this.title,
      content: this.content,
      id: this.id,
      html_content: this.htmlContent
    });
  }
}

@Injectable()
export class PagesService {
  http: Http;

  editPage: EventEmitter<Page> = new EventEmitter();

  constructor(http: Http) {
    this.http = http;
  }

  createPage(page: Page) {
    return this.http.post('http://localhost:8000/api/pages/', JSON.stringify(page))
        .map(res => res.json());
  }

  listPages() {
    return this.http.get('http://localhost:8000/api/pages/').map(res => res.json());
  }

  getPage(id: string): Observable<Page> {
    return this.http.get(`http://localhost:8000/api/pages/${id}`)
        .map(res => res.json())
        .map(json => new DefaultPage(json.page));
  }

  updatePage(page: Page) {
    return this.http.post(`http://localhost:8000/api/pages/${page.id}`, JSON.stringify(page))
        .map(res => res.json());
  }

  getPageRevisions(id: string) {
    return this.http.get(`http://localhost:8000/api/pages/${id}/revisions`).map(res => res.json());
  }

  getPageRevision(id: string, revisionId: number) {
    return this.http.get(`http://localhost:8000/api/pages/${id}/revisions/${revisionId}`).map(res => res.json());
  }
}

export const PAIDIA_PROVIDERS: any[] = [
  provide(PagesService, { useClass: PagesService })
];
