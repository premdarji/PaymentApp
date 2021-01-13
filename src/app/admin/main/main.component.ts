import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router:Router ) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/home/dashboard']);
  }
  products(){
    this.router.navigate(['/admin/dashboard'])
  }

  category(){
    this.router.navigate(['/admin/category'])
  }

  coupon(){
    this.router.navigate(['/admin/coupon'])
  }


}
