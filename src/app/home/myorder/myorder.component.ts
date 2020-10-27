import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  constructor(private orders:OrderService) { }

  Products:any;

  ngOnInit(): void {
    this.GetOrders();
  }

  GetOrders(){
    this.orders.GetAll().subscribe(res=>{
      console.log(res);
      this.Products=res;
    })
  }
}
