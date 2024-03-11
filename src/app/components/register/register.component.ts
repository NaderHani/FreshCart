import { Component } from '@angular/core';
import { FormGroup , Validators ,FormControl, FormBuilder, FormControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router , private _FormBuilder:FormBuilder){}

  errMsg:string='';
  isLoading:boolean = false ; 

  registerForm:FormGroup = this._FormBuilder.group({
    name:['' ,[Validators.required , Validators.minLength(3),Validators.maxLength(20)] ],
    email:['' ,[Validators.required,Validators.email] ],
    password:['' ,[Validators.required , Validators.pattern(/^\w{6,}$/)] ],
    rePassword:[''],
    phone:['' ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
  } ,{validators:[this.confirmPassword]} as FormControlOptions );

  confirmPassword(groub:FormGroup):void{
    let password = groub.get('password')
    let repassword =groub.get('rePassword');

    if (repassword?.value=='') {
      repassword?.setErrors({required:true})
    } 
    else if(password?.value != repassword?.value)
    {
      repassword?.setErrors({mismatch:true})
    } 
  }

  handleForm():void{
    this.isLoading=true;
    if(this.registerForm.valid==true)
    {
      this._AuthService.register(this.registerForm.value).subscribe({
        next:(Response)=>{
          if(Response.message==="success"){
            this._Router.navigate(['/login']);
            this.isLoading=false;
          }
        },
        error:(err)=>{
          this.errMsg= err.error.message;
          this.isLoading=false;
        }
      }) 
    }
  }
}
