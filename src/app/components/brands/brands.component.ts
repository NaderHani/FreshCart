import { Brands } from './../../shared/guards/interfaces/brands';
import { Component, OnInit } from '@angular/core';
import { AcomdataService } from 'src/app/services/acomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(private _AcomdataService:AcomdataService){ }
brands:Brands[] = [] ; 
ngOnInit(): void {
    this._AcomdataService.getAllBrands().subscribe({
      next:(Response)=>{
        this.brands=Response.data;
      }
    })
}
}
