import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { AcomdataService } from 'src/app/services/acomdata.service';
import { CartService } from 'src/app/services/cart.service';
import { Category, Product } from 'src/app/shared/guards/interfaces/product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(
    private _AcomdataService:AcomdataService,
    private _CartService:CartService,
    private _ToastrService:ToastrService
  ){}

  products:Product[]=[]
  categories:any[]=[]
  searchTearm:string='';

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
  mainSliderOption: OwlOptions = {
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
  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  ngOnInit(): void {
      this._AcomdataService.getAllProducts().subscribe({
        next:(Response)=>{
          this.products=Response.data;
        }
      })

      this._AcomdataService.getCategories().subscribe({
        next:(response)=>{
          this.categories = response.data;
        }
      })

  }

}
