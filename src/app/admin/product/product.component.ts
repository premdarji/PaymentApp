import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotificationService } from 'src/app/shared/notification.service';


import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public productService:ProductService,
    private dialogref:MatDialogRef<ProductComponent>,
    private notification:NotificationService,
    private dashboard:DashboardComponent,
    private store:Store<ProductState>
) { }

    category:any;
    selected="";
    selectedfile="assets\\Images\\default.png";
  


  ngOnInit(): void {
   //debugger
    this.getCategory();
    if(this.productService.ProductForm.get("ProductId").value>0){
   
    
      this.selected=String(this.productService.ProductForm.get("CategoryId").value);
     
      this.selectedfile=this.productService.ProductForm.get("ImageUrl").value;
    }

  }

  submit(){
    if(this.productService.ProductForm.get("ProductId").value>0){
      this.productService.ProductForm.patchValue({
        ImageUrl:this.selectedfile
      })
     
      this.store.dispatch(new fromActions.UpdateProduct());
      this.dialogref.close();
      this.notification.update("Product is updated");
    }
    else{
      
        this.productService.ProductForm.patchValue({
          ImageUrl:this.selectedfile
        })

        this.store.dispatch(new fromActions.AddProduct());
        this.dialogref.close();
        this.notification.update("Product is added");
    }
  
 
  }

  getCategory(){

    this.store.dispatch(new fromActions.GetCategories());
    this.store.select(selector.Categories).subscribe(res=>{
      this.category=res;
    })
   
  }

  clear(){
    this.productService.ProductForm.reset();
  }

  onfileselected(event){
    this.selectedfile=event.target.files[0]["name"];
    this.selectedfile="assets\\Images\\"+this.selectedfile;
  }
}
