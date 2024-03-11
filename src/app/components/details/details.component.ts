import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AcomdataService } from 'src/app/services/acomdata.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/shared/guards/interfaces/product';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute ,
     private _AcomdataService:AcomdataService ,
     private _CartService:CartService,
      private _ToastrService:ToastrService,
      ){}

  productDetails:Product={} as Product;

  productSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    items:1,
    nav: false
  }
  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(Response)=>{
        console.log(Response.data);
        this._ToastrService.success(Response.message,'Success')
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe(
        {
          next:(params) =>{
           let idProduct:any= params.get('id');

            this._AcomdataService.getProductDetails(idProduct).subscribe({
              next:(response)=>{
                this.productDetails = response.data;
              }

            })
          }
        }
      )
  }
}
