import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/User';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';

import * as CryptoJS from 'crypto-js';

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
  key="01234567890123456789012345678901";
  decrypted:any;

  ngOnInit(): void {
    this. UserId = this.actRoute.snapshot.params['id'];
    console.log(this.UserId);
    this.decrypted=this.decryptData(this.key,this.UserId);
    console.log(this.decrypted)
  }


  Activation(){
    this.userService.activateUser(this.UserId).subscribe(res=>{
      console.log("Activated")
      this.router.navigate(['/login']);
      this.notification.success("Your account is activated ")

    })
   
  }

  
  decryptData(key, ciphertextB64) {                              // Base64 encoded ciphertext, 32 bytes string as key
    var key = CryptoJS.enc.Utf8.parse(key);                             // Convert into WordArray (using Utf8)
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);   // Use zero vector as IV
    var decrypted = CryptoJS.AES.decrypt(ciphertextB64, key, {iv: iv}); // By default: CBC, PKCS7 
    return decrypted.toString(CryptoJS.enc.Utf8);                       // Convert into string (using Utf8)
}
}
