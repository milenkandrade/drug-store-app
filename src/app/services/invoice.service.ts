import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  getInvoices(){
      return of();
    }
}
