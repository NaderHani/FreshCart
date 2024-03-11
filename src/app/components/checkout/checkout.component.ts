import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
constructor(private _FormBuilder:FormBuilder,private _CartService:CartService , private _ActivatedRoute:ActivatedRoute){}


cartID:any='';
checkout:FormGroup=this._FormBuilder.group({
  details:['' , [Validators.required]],
  phone:[''],
  city:['']
})

ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
       this.cartID= params.get('id');
      }
    })
}
handelForm():void{
  console.log(this.checkout.value);
  this._CartService.checkOut(this.cartID , this.checkout.value).subscribe({
    next:(Response)=>{
      if(Response.status=="success"){
        window.open(Response.session.url , '_self')
      }
    }
  })
}
}