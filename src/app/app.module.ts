import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LetterBoldPipe } from './shared/letter-bold.pipe';
import { SearchFilterPipe } from './shared/filter-pipe';
import { ClickOutsideDirective } from './shared/dropdown.directive';
import { ApiService } from './shared';

import { MatCardModule } from '@angular/material';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { AddpageComponent } from './addpage/addpage.component';
import { UiSwitchModule } from 'ngx-toggle-switch';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'register',
    component: RegisterpageComponent
  },
  {
    path: 'addpage',
    component: AddpageComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    HomepageComponent,
    RegisterpageComponent,
    AddpageComponent,
    ClickOutsideDirective,
    SearchFilterPipe,
    LetterBoldPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiSwitchModule
  ],
  providers: [{ provide: 'LOCALSTORAGE', useFactory: getLocalStorage }, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}
