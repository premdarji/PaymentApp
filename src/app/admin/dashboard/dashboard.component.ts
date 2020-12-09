import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductService } from 'src/app/shared/product.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ProductComponent } from '../product/product.component';
import { ConfirmComponent, ConfirmDialogModel } from 'src/app/confirm/confirm.component';




export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products:any;
  displayedColumns: string[] = ['ProductId', 'Name', 'Price', 'Quantity','ImageUrl','CategoryId','Actions'];
 
  dataSource: MatTableDataSource<any>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private productservice:ProductService,
    private dialog:MatDialog) { 

  
  }

  
  ngOnInit(): void {
   this.loadProduct();
  }


  loadProduct(){
    this.productservice.GetAll(1,20).subscribe(res=>{
      this.products=res;
      console.log(this.products)
    
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
 
    })
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
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

    this.productservice.PopulateForm(data);
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="60%";
    this.dialog.open(ProductComponent,dialogconfig);
  }

  newProduct(){
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

          })
           

         }
     });
  }

}
