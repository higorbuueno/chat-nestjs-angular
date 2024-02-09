import { Injectable } from '@angular/core';
import { SessionStorageService } from '../utils/session-storage.service';
import { Usuario } from '../model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  loggedUser!: Usuario | null;
  _token = '' as string | null;
  isLoading$: any;

  constructor(
    private _sessionStorageService: SessionStorageService,
  ) { }

  /**
   * Get token from session;
   */
  getToken() {
    try {
      this._token = JSON.parse(this._sessionStorageService.getItem('token'));
    } catch (error) {
      console.info(error);
      this._token = null;
    }
    if (this._token == null) {
      return '';
    } else {
      return this._token;
    }
  }

  /**
   * Check if user is authenticated;
   */
  public isAuthenticated(): boolean {
    try {
      this.loggedUser = JSON.parse(this._sessionStorageService.getItem('user'));
      this._token = JSON.parse(this._sessionStorageService.getItem('token'));
    } catch (error) {
      this.loggedUser = null;
    }

    // check if user and token is not null;
    if (this.loggedUser != null && this._token != null) {
      // get token informations;
      const tokenInformation = Number(this.getUserByToken(this._token)?.id);

      // check if session storage has been modified;
      if (this.loggedUser.id !== tokenInformation) {
        sessionStorage.clear();
        return false;
      }

      // check if token has experied;
      return this.isTokenExpired(this._token);
    }
    return false;
  }

  /**
   *
   * @param token
   */
  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = helper.getTokenExpirationDate(token);
    if (!date) { return false; }
    return date.valueOf() > new Date().valueOf();
  }

  /**
 * get token informations;
 */
  getUserByToken(token: string): Usuario | null {
    try {
      const decodedToken = helper.decodeToken(token);

      const user: Usuario = {
        id: decodedToken.sub,
        name: decodedToken.name,
        email: decodedToken.email
      }

      return user;
    } catch (error) {
      return null;
    }
  }
}
