import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SessionStorageService } from 'src/app/utils/session-storage.service';
import { AuthService } from '../auth.service';
import { AuthHttpService } from '../auth-http.service';
import { Token } from 'src/app/model/token';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _serviceStorage: SessionStorageService,
    private _authService: AuthService,
    private _authHttpService: AuthHttpService
  ) { }

  public form!: FormGroup;
  public preventAbuse: boolean = false;
  private _usuarioLogin!: Usuario;
  private _submitted: boolean = false;
  private _token!: Token;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this._fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    })
  }

  /**
   * Função para login no sistema;
   */
  async login() {
    this.preventAbuse = true;

    // verifica se todos os campos foram preenchidos;
    if (this.form.valid) {

      // pega os valores digitados pelo usuário;
      this._usuarioLogin = this.form.value;

      this._authHttpService.login(this._usuarioLogin).subscribe({
        next: (result => {
        // tenta fazer o login;
        this._token = result;

        // se deu sucesso, salva o token na sessão;
        this._serviceStorage.setItem('token', JSON.stringify(this._token.access_token));

        // grava o usuário na sessão;
        this._serviceStorage.setItem('user', JSON.stringify(this._authService.getUserByToken(this._token.access_token)));

        // seta o usuário logado no subject;
        this._router.navigate(['/home']);
        }),
        error: (error => {
          this.form.controls['password'].setValue('');

          // TODO: Colocar mensagem de inválido
          // handleErrorMessage(this.messageService, error);
        })
      })
    }


    this.preventAbuse = false;
  }

  register() {
    this._router.navigate(['register'])
  }
}
