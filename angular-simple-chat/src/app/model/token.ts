import { Usuario } from "./usuario"

export interface Token {
    access_token: string
    loggedUser: Usuario;
}