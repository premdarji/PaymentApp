import { Component, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';
import { UserService } from './shared/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PaymentApp';

  id:number;

  constructor(@Inject(DOCUMENT) private document:Document,
  private userservice:UserService
  ){};

  ngOnInit():void{
   

  }



}
