import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TracerInterceptor } from './tracer-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  //providers: [{ provide: HTTP_INTERCEPTORS, useClass: TracerInterceptor, multi: true }, ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
