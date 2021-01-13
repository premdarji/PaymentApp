import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  constructor() { }

  Coupons:FormGroup=new FormGroup({
    CouponId:new FormControl(0),
    Code:new FormControl(''),
    Name:new FormControl(''),
    Description:new FormControl(''),
    discount:new FormControl(0),
    minAmt:new FormControl(0),
    MaxDiscount:new FormControl(0),
    ValidFrom:new FormControl(''),
    ValidTill:new FormControl(''),
    Usage:new FormControl(0),
    ImageUrl:new FormControl('')

  })

  ngOnInit(): void {
  }

}
