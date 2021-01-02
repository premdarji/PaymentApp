import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/shared/product.service';
import { NotificationService } from 'src/app/shared/notification.service';


import * as fromActions from "../../Common/Actions/Product.actions";
import * as selector from "../../Common/index";
import { Store,select } from '@ngrx/store';
import { ProductState } from 'src/app/Common/Reducer/Product.reducer';


@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  constructor(private dialogref:MatDialogRef<AddcategoryComponent>,
    public productservice:ProductService,
    private notification:NotificationService,
    private store:Store<ProductState>) { }

  ngOnInit(): void {
  }

  Save(){


    if(this.productservice.CategoryForm.get("CategoryId").value>0){
      this.store.dispatch(new fromActions.UpdateCategory());
      this.dialogref.close();
    
    }
    
    else{
      this.store.dispatch(new fromActions.AddCategory());
      this.dialogref.close();
     
    }
   
  }

}
