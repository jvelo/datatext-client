import {Component, ViewEncapsulation, OnInit} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../../home/components/home';
import {NameList} from '../../shared/services/name_list';
import {NewPage} from '../../datatext/newpage/newpage';
import {Pages} from '../../datatext/pages/pages';
import {Page} from '../../datatext/page/page';
import {EditPage} from '../../datatext/editpage/editpage';
import {Revisions} from '../../datatext/revisions/revisions';
import {Revision} from '../../datatext/revision/revision';
import {Page as PageModel, PagesService} from '../../datatext/services/pages';
import {Editor} from '../../datatext/editor/editor';

@Component({
  selector: 'app',
  viewProviders: [NameList],
  templateUrl: './app/components/app.html',
  styleUrls: ['./app/components/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, Editor]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home' },
  { path: '/pages', component: Pages, as: 'Pages' },
  { path: '/newpage', component: NewPage, as: 'NewPage'},
  { path:'/page/:id', component:Page, as: 'Page'},
  { path:'/page/:id/edit', component:EditPage, as: 'EditPage'},
  { path:'/page/:id/revisions', component:Revisions, as: 'PageRevisions'},
  { path:'/page/:id/revisions/:revisionId', component:Revision, as: 'PageRevision'}
])
export class AppCmp implements OnInit {
  editedPage: PageModel;
  subscription: any;

  constructor(private pagesService: PagesService) {
  }

  ngOnInit() {
     this.subscription = this.pagesService.editPage.subscribe(page => {
       if (page === undefined || page === null) {
         this.editedPage = undefined;
       } else {
         Object.assign(this.editedPage, page);
       }
     });
  }
}
