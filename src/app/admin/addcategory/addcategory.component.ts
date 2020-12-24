import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/shared/product.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  constructor(private dialogref:MatDialogRef<AddcategoryComponent>,
    public productservice:ProductService,
    private notification:NotificationService) { }

  ngOnInit(): void {
  }

  Save(){

    if(this.productservice.CategoryForm.get("CategoryId").value>0){
      this.productservice.UpdateCategory().subscribe(res=>{
        this.notification.update("Category updated");
        this.dialogref.close();
      })
    }
    
    else{
      this.productservice.AddCategory().subscribe(res=>{
        this.notification.update("Category added");
        this.dialogref.close();
      })

    }
   
  }

}
