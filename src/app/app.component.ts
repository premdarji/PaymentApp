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
   
    this.id=this.userservice.GetID();
    console.log("id is:"+this.id);
    const headel=this.document.getElementsByTagName('head')[0];

    const newlink=this.document.createElement('link');
    newlink.rel="stylesheet";
    if(this.id==12){
      newlink.href="clienta.css";
      console.log("in if")
    }
    else{
      newlink.href="clientb.css";
      console.log("in else")
    }
    
    newlink.type="text/css";

    headel.appendChild(newlink);


  }



}
