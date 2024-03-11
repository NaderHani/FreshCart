import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotfountComponent } from './components/notfount/notfount.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [

  {
  path:'',
  canActivate:[authGuard],
  component:BlankLayoutComponent,
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home' ,component:HomeComponent, title:'Home'},
    {path:'cart' ,component:CartComponent ,title:'Cart'},
    {path:'setting' ,loadChildren:()=>import('./components/setting/setting.module').then((m)=>m.SettingModule),title:'settings'},
    {path:'details/:id' ,component:DetailsComponent},
    {path:'brands' ,component:BrandsComponent,title:'Brands'},
    {path:'checkout/:id' ,component:CheckoutComponent,title:'Payment'},
    {path:'categories' ,component:CategoriesComponent,title:'Categoires'},
    {path:'products' ,component:ProductsComponent,title:'Products'},
  ]},

  {
  path:'',
  component:AuthLayoutComponent,
  children:[
    {path:'login' ,component:LoginComponent,title:'LogIn'},
    {path:'register' ,component:RegisterComponent,title:'Register'},
  ]},

  {path:'**' ,component:NotfountComponent,title:'Error 404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
