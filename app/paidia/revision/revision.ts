import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from 'angular2/router';

import {PagesService} from '../services/pages';
import {Page as PageModel} from '../services/pages';

@Component({
  selector: 'page',
  templateUrl: './paidia/revision/revision.html'
})
export class Revision implements OnInit {

  page: PageModel;
  revision: any;
  html_diff: string;
  revision_content: string;

  constructor(
    private router: Router,
    private routeParams: RouteParams,
    private pagesService: PagesService
  ) {
  }

  ngOnInit() {
    let id = this.routeParams.get('id');
    let revisionId = parseInt(this.routeParams.get('revisionId'));
    this.pagesService.getPageRevision(id, revisionId).subscribe(result => {
      const {revision, revision_content, html_diff, page} = result;
      Object.assign(this, {revision, revision_content, html_diff, page});
    }, err => console.error(err));
  }
}
