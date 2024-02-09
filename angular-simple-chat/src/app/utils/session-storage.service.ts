import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    constructor(
        private router: Router
    ) { }

    setItem(key: string, value: string) {
        try {
            var cryptoData: any = CryptoJS.AES.encrypt(value, 'ThisIsSecretForJWTHS512SignatureAlgorithmThatMUSTHave64ByteLength');
            sessionStorage.setItem(key, cryptoData);
        } catch (error) {
            sessionStorage.clear();
            this.router.navigate(["/404"]);
        }
    }

    getItem(key: any): string {
        try {
            var encodeData = sessionStorage.getItem(key);
            if (encodeData) {
                var decodeData = CryptoJS.AES.decrypt(encodeData, 'ThisIsSecretForJWTHS512SignatureAlgorithmThatMUSTHave64ByteLength').toString(CryptoJS.enc.Utf8);
                return decodeData;
            } else {
                return '';
            }
        } catch (error) {
            sessionStorage.clear();
        }
        return '';
    }
}