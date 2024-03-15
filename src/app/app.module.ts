import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFormComponent } from './shared/component/product-form/product-form.component';
import { ProductCardComponent } from './shared/component/product-card/product-card.component';
import { ProductDashBoardComponent } from './shared/component/product-dash-board/product-dash-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { materialModule } from './material/material.module';
import { ConformDeleteComponent } from './shared/component/conform-delete/conform-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductDashBoardComponent,
    ConformDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    materialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
