import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  getSuppliers(){
      return of();
    }
}
