import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {Page, PagesService} from '../services/pages';

@Component({
  selector: 'revisions',
  templateUrl: './datatext/revisions/revisions.html'
})
export class Revisions implements OnInit {

  page: Page;
  revisions: any;

  constructor(
    private router: Router,
    private routeParams: RouteParams,
    private pagesService: PagesService
  ) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.pagesService.getPageRevisions(id).subscribe(result => {
      this.page = result.page;
      this.revisions = result.revisions;
    }, err => console.error(err));
  }

  openRevision(revision: any) {
    this.router.navigate( ['PageRevision', { id: this.page.id, revisionId: revision.revision_id }] );
  }
}
