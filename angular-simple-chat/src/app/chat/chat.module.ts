import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "./chat.component";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  { path: '', redirectTo: 'chat', pathMatch: 'full' },
  {
    path: 'chat', component: ChatComponent,
    // children: [
    //   {
    //     path: '',
    //     component: RecursoListComponent,
    //     pathMatch: 'full',
    //     // resolve: { recursos: RecursoResolver },
    //   }
    // ]
  }
];

@NgModule({
  declarations: [
    ChatComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbModalModule
  ]
})
export class ChatModule { }
