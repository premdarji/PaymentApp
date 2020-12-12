import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'src/app/shared/product.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';
import { ConfirmComponent, ConfirmDialogModel } from 'src/app/confirm/confirm.component';
import { NotificationService } from 'src/app/shared/notification.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products:any;
  displayedColumns: string[] = ['ProductId', 'Name', 'Price', 'Quantity','ImageUrl','CategoryId','Actions'];
 
  dataSource: MatTableDataSource<any>;
  productData:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sorting: MatSort;


  constructor(private productservice:ProductService,
    private dialog:MatDialog,
    private notification:NotificationService) { 

  
  }

  
  ngOnInit(): void {
   this.loadProduct();
  }


  loadProduct(){
    this.productservice.GetAllProducts().subscribe(res=>{
      this.products=res;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort = this.sorting;
 
    })
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sorting;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  EditProduct(data){
    console.log("productId:"+data)
    //debugger
    this.productservice.PopulateForm(data).subscribe(res=>{
        this.productData=res;
    
        this.productservice.ProductForm.setValue({
          ProductId:this.productData.productId,
          Name:this.productData.name,
          Price:this.productData.price,
          CategoryId:this.productData.categoryId,
          Quantity:this.productData.quantity,
          Description:this.productData.description,
          ImageUrl:String(this.productData.imageUrl)
        })

        const dialogconfig=new MatDialogConfig();
        dialogconfig.disableClose=false;
        dialogconfig.autoFocus=true;
        dialogconfig.width="60%";
        this.dialog.open(ProductComponent,dialogconfig);
    });
    
  }

  newProduct(){
    this.productservice.ProductForm.reset();
    this.productservice.initializeForm();
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="60%";
    this.dialog.open(ProductComponent,dialogconfig);
  }

  Delete(data){

    console.log("deleted product:"+data)
    const message = `Are you sure you want remove this product?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef=this.dialog.open(ConfirmComponent, {
      maxWidth: "400px",
      data: dialogData
    });

     dialogRef.afterClosed().subscribe(dialogResult => {
    
         console.log(dialogResult)
         if(dialogResult==true){
          this.productservice.DeleteProduct(data).subscribe(res=>{
            console.log(res)
            this.loadProduct();
            this.notification.Delete("Product is deleted")

          })
           

         }
     });
  }

}
