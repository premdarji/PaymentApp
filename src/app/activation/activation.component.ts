import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/User';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  constructor(public userService:UserService,
    private actRoute: ActivatedRoute,
    private notification:NotificationService,
    private router:Router) { }

  UserId: any; //Getting User id from URL

  ngOnInit(): void {
    this. UserId = this.actRoute.snapshot.params['id'];
    console.log(this.UserId);
  }


  Activation(){
    this.userService.activateUser(this.UserId).subscribe(res=>{
      console.log("Activated")
      this.router.navigate(['/login']);
      this.notification.success("Your account is activated ")

    })
   
  }
}
