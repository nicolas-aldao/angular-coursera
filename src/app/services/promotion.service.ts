import { Injectable } from '@angular/core';
import { Promotion } from '../shared/Promotion';

import { BaseURL } from '../shared/BaseURL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg-service.service';

// OBSERVABLES AND RXJS
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(BaseURL + '/promotions')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(BaseURL + '/promotions/ + id')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(BaseURL + '/promotions?featured=true')
      .pipe(map(dishes => dishes[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
