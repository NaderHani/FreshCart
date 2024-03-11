import { Component } from '@angular/core';
import { FormGroup , Validators ,FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService , private _Router:Router , private _FormBuilder:FormBuilder){}


  errMsg:string='';
  isLoading:boolean = false ;

  loginForm:FormGroup=this._FormBuilder.group(
    {
      email:[null, [Validators.required,Validators.email]],
      password:[null ,[Validators.required , Validators.pattern(/^\w{6,}$/)] ]
    }
  )



  handleForm():void{
    this.isLoading=true;
    if(this.loginForm.valid==true)
    {
      this._AuthService.login(this.loginForm.value).subscribe({
        next:(Response)=>{
          if(Response.message==="success"){            localStorage.setItem('eToken',Response.token);
            this._AuthService.saveUserData();
            this._Router.navigate(['/home']);
            this.isLoading=false;
          }
        },
        error:(err)=>{
          this.errMsg= err.error.message;
          this.isLoading=false;
        }
      }) 
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
}
