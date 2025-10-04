import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, // ✅ Must be imported
    RouterModule.forRoot(routes),
  ],

  bootstrap: [],
})
export class AppModule {}
