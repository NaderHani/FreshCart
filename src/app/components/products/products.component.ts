import { CartService } from 'src/app/services/cart.service';
import { Product } from './../../shared/guards/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AcomdataService } from 'src/app/services/acomdata.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private _CartService:CartService ,private _ToastrService:ToastrService , private _AcomdataService:AcomdataService){}
  products:Product[]=[]
  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(Response)=>{
        console.log(Response);
        this._ToastrService.success(Response.message,'Success')
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  ngOnInit(): void {
    this._AcomdataService.getAllProducts().subscribe({
      next:(Response)=>{
        this.products=Response.data;
      }
    })
  }
}
