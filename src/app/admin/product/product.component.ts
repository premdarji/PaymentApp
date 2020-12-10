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
    selectedfile:any;


  ngOnInit(): void {
   
    this.GetCategory();
    if(this.productService.ProductForm.get("ProductId").value>0){
      console.log("in if")
      this.selected=String(this.productService.ProductForm.get("CategoryId").value);
      console.log(this.selected)
      console.log(this.productService.ProductForm.value)
    }

  }

  Submit(){
    if(this.productService.ProductForm.get("ProductId").value>0){
      this.productService.UpdateProduct(this.productService.ProductForm.get("ProductId").value,this.productService.ProductForm.value).subscribe(res=>{
        console.log(res);
        this.dialogref.close();
        this.dashboard.loadProduct();
        this.notification.update("Product is updated");
   
      
      })
    }
    else{
        // this.productService.ProductForm.setValue({
        //   Name:this.productService.ProductForm.get("Name").value,
        //   Price:this.productService.ProductForm.get("Price").value,
        //   Quantity:this.productService.ProductForm.get("Quantity").value,
        //   Description:this.productService.ProductForm.get("Description").value,
        //   CategoryId:this.productService.ProductForm.get("CategoryId").value,
        //   ImageUrl:String(this.selectedfile),
        //   ProductId:0
        // })
        console.log("else")
          this.productService.AddProduct().subscribe(res=>{
          console.log("product is added");
          this.dialogref.close();
          this.notification.update("Product Is Added");
        })
    }
    console.log(this.productService.ProductForm.get("ProductId").value)
    console.log(this.productService.ProductForm.value);
 
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

    console.log(this.selectedfile)
    console.log(event.target.files[0]["name"])
  }
}
