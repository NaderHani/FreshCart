import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfount',
  templateUrl: './notfount.component.html',
  styleUrls: ['./notfount.component.scss']
})
export class NotfountComponent {
constructor(private _Router:Router){}
navagateBack():void{
  this._Router.navigate(['/home']);
}
}
