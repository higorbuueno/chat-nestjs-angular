import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './auth/TokenInterceptor';
import { AuthGuard } from './auth/guards/auth.guards';

const configSocketIo: SocketIoConfig = { url: 'http://localhost:3000/chat-web-socket', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(configSocketIo),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      preventDuplicates: true,
      resetTimeoutOnDuplicate: true
    }), // ToastrModule added
  ],
  providers: [
    TokenInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
