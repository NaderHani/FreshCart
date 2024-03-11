import { Component, OnInit } from '@angular/core';
import { AcomdataService } from 'src/app/services/acomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  constructor(private _AcomdataService:AcomdataService) {
    
  }
  categories:any[]=[]
  ngOnInit(): void {
    this._AcomdataService.getCategories().subscribe({
      next:(response)=>{
        this.categories = response.data;
      }
    })
  }
}
