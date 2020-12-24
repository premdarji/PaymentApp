import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public productService:ProductService,
    private dialogref:MatDialogRef<ProductComponent>,
    private notification:NotificationService,
    private dashboard:DashboardComponent
) { }

    category:any;
    selected="";
    selectedfile="assets\\Images\\default.png";
  


  ngOnInit(): void {
   //debugger
    this.GetCategory();
    if(this.productService.ProductForm.get("ProductId").value>0){
   
    
      this.selected=String(this.productService.ProductForm.get("CategoryId").value);
     
      this.selectedfile=this.productService.ProductForm.get("ImageUrl").value;
    }

  }

  Submit(){
    if(this.productService.ProductForm.get("ProductId").value>0){
      this.productService.ProductForm.patchValue({
        ImageUrl:this.selectedfile
      })
     
      this.productService.UpdateProduct(this.productService.ProductForm.value).subscribe(res=>{
       
        this.dialogref.close();
        this.dashboard.loadProduct();
        this.notification.update("Product is updated");
   
      
      })
    }
    else{
      
        this.productService.ProductForm.patchValue({
          ImageUrl:this.selectedfile
        })
          this.productService.AddProduct().subscribe(res=>{
       
          this.dialogref.close();
          this.notification.update("Product Is Added");
        })
    }
  
 
  }

  GetCategory(){
    this.productService.GetCategory().subscribe(res=>{
    
      this.category=res;
      
    })
   
  }

  clear(){
    this.productService.ProductForm.reset();
  }

  Onfileselected(event){
    this.selectedfile=event.target.files[0]["name"];
    this.selectedfile="assets\\Images\\"+this.selectedfile;
  }
}
