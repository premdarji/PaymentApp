import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { ProductService } from 'src/app/shared/product.service';
import { HomeComponent } from '../home.component';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

  constructor(private orders:OrderService,
    private home:HomeComponent) { }

  Products:any;

  ngOnInit(): void {
    this.GetOrders();
 

  }

  GetOrders(){
    this.orders.GetAll().subscribe(res=>{
      this.home.GetCount();
      console.log(res);
      this.Products=res;
    })
  }
}
