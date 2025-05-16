import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  getAlerts(){
    return of();
  }

}
