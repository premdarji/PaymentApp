import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private router: Router,
    private actRoute: ActivatedRoute,
    private sevice:ProductService) { }

  ProductId: any; //Getting Product id from URL
  ProductData: any; //Getting Product details

  ngOnInit(): void {
    this. ProductId = this.actRoute.snapshot.params['id'];
    console.log(this.ProductId);
    this.GetProductById(this.ProductId);
  }

  GetProductById(id){
    this.sevice.GetProductById(id).subscribe(res=>{
      console.log(res);
      this.ProductData=res;
    })

  }


}
