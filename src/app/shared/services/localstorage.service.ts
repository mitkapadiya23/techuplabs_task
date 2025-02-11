import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setValue(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  }
}
