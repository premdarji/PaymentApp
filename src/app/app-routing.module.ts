import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { pathToFileURL } from 'url';
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',loadChildren:()=>import(`../app/home/home.module`).then(m=>m.HomeModule),canActivate:[AuthenticationGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:"forgot",component:ForgotpasswordComponent},
  {path:"admin",loadChildren:()=>import(`../app/admin/admin.module`).then(m=>m.AdminModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
