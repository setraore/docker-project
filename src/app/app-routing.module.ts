import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SekouComponent } from './sekou/sekou';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'sekou', component: SekouComponent }
];
 