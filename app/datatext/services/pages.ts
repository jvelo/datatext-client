import {Http} from 'angular2/http';
import {Injectable, EventEmitter, provide} from 'angular2/core';

export interface Page {
  title: String;
  content: string;
  id?: string;
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

  getPage(id: string) {
    return this.http.get(`http://localhost:8000/api/pages/${id}`).map(res => res.json());
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
