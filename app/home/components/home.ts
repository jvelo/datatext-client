import {Component} from 'angular2/core';
import { Alert } from 'ng2-bootstrap/ng2-bootstrap';

import { Page } from '../../paidia/page/page';;

@Component({
  selector: 'home',
  templateUrl: './home/components/home.html',
  styleUrls: ['./home/components/home.css'],
  directives: [ Alert, Page ]
})
export class HomeCmp {}
