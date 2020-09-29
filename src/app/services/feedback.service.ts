import { Injectable } from '@angular/core';
import { Feedback } from '../shared/Feedback';

// OBSERVABLES AND RXJS FRAMEWORK
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// CONSTANTS
import { BaseURL } from '../shared/BaseURL';

// SERVICE
import { ProcessHTTPMsgService } from './process-httpmsg-service.service';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    submitFeedback(feedback: Feedback): Observable<Feedback> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<Feedback>(BaseURL + '/feedback', feedback, httpOptions)
        .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}
