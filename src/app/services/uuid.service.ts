import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UuidService {

  generateUUID(): string {
    return crypto.randomUUID();
  }
}
