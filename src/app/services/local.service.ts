import { Injectable } from '@angular/core';
import { GlobalConstants } from '../models/global-constant';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  // Set the json data to local storage
  setValue(key: string, value: any) {
    const data = CryptoJS.AES.encrypt(JSON.stringify(value), GlobalConstants.SECRET_KEY).toString();
    localStorage.setItem(key, data);
  }

  // Get the json value from local storage
  getValue(key: string) {
    const dec = localStorage.getItem(key);
    if (dec) {
      const value  = CryptoJS.AES.decrypt(dec, GlobalConstants.SECRET_KEY);
      return value.toString(CryptoJS.enc.Utf8);
    }
    return null;
  }

}
