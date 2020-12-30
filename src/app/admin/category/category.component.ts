import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/shared/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddcategoryComponent } from '../addcategory/addcategory.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { ConfirmDialogModel, ConfirmComponent } from 'src/app/confirm/confirm.component';

import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['CategoryId','CategoryName','Actions'];
 
  dataSource: MatTableDataSource<any>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sorting: MatSort;





  constructor(private productservice:ProductService,
    private dialog:MatDialog,
    private notification:NotificationService,
    private store:Store<ProductState>

  ) { }

  category:any;

  ngOnInit(): void {
    this.loadCategory();
  }

  loadCategory(){
    this.store.dispatch(new fromActions.GetCategories());
    this.store.pipe(select(selector.Categories)).subscribe((result: any) => {
      if (result) {
      this.category = result;
      this.dataSource = new MatTableDataSource(this.category);
      this.dataSource.paginator=this.paginator
      this.dataSource.sort = this.sorting;
      }
    })
    // this.productservice.GetCategory().subscribe(res=>{
    //   this.category=res;
    // 
 

    // })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  NewCategory(){
    this.productservice.CategoryForm.reset();
    this.productservice.InitializeCategory();
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="20%";
    this.dialog.open(AddcategoryComponent,dialogconfig);
  }

  Edit(data){
    this.productservice.PopulateCategory(data);
    const dialogconfig=new MatDialogConfig();
    dialogconfig.disableClose=false;
    dialogconfig.autoFocus=true;
    dialogconfig.width="20%";
    this.dialog.open(AddcategoryComponent,dialogconfig);

  }

  Delete(data){
    const message = `Are you sure you want remove this Category?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef=this.dialog.open(ConfirmComponent, {
      maxWidth: "400px",
      data: dialogData
    });

     dialogRef.afterClosed().subscribe(dialogResult => {
         if(dialogResult==true){
           this.store.dispatch(new fromActions.DeleteCategory(data));
          // this.productservice.DeleteCategory(data).subscribe(res=>{
          //   this.loadCategory();
          //   this.notification.Delete("Category is deleted")

          // })  

         }
     });
  }

}
