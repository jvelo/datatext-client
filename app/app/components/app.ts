import {Component, ViewEncapsulation} from 'angular2/core';
import {
  RouteConfig,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../../home/components/home';
import {NameList} from '../../shared/services/name_list';
import {NewPage} from '../../paidia/newpage/newpage';
import {Pages} from '../../paidia/pages/pages';
import {Page} from '../../paidia/page/page';
import {EditPage} from '../../paidia/editpage/editpage';
import {Revisions} from '../../paidia/revisions/revisions';
import {Revision} from '../../paidia/revision/revision';

@Component({
  selector: 'app',
  viewProviders: [NameList],
  templateUrl: './app/components/app.html',
  styleUrls: ['./app/components/app.css'],
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES]
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
export class AppCmp {}
