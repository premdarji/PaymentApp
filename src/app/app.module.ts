import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from '../app/material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import {FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

  
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuthguardService } from './shared/authguard.service';

import { JwtModule, JwtModuleOptions,JwtHelperService,JWT_OPTIONS} from '@auth0/angular-jwt';
import { AuthenticationGuard } from './authentication.guard';
import { ConfirmComponent } from './confirm/confirm.component';

import { ScrollingModule } from '@angular/cdk/scrolling'




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavigationComponent,
    FooterComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    ConfirmComponent,
  
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,    
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule,
    ScrollingModule
  
  ],

  providers: [AuthguardService,AuthenticationGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents:[ChangepasswordComponent,ForgotpasswordComponent,RegisterComponent,ConfirmComponent]
})
export class AppModule { }
