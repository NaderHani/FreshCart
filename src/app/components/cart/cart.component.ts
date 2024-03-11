import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor( private _CartService:CartService,private _ToastrService:ToastrService){}
  cartDetails:any={};
ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:(response)=>{
      this.cartDetails=response.data        
      },
      error:(err)=>{
      console.log(err);
      }
    })
}

removeCartItem(id:string):void{
  this._CartService.removeUserCart(id).subscribe({
    next:(response)=>{
    this.cartDetails=response.data;
    this._ToastrService.warning('Product Removed Successfuly from your cart' , 'Removed')
  },
    error:(err)=>{
    console.log(err);
    }
  })
}
  changeCount(id:string,count:number):void{
    if(count>0){
      this._CartService.updateCartProduct(id,count).subscribe({
        next:(response)=>{
          this.cartDetails=response.data
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }


  
}
