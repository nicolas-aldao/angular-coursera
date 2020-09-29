import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';

// OBSERVABLES AND RXJS
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseURL } from '../shared/BaseURL';
import { ProcessHTTPMsgService } from './process-httpmsg-service.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(BaseURL + '/leaders')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader> {
    return this.http.get<Leader>(BaseURL + '/leaders/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeatureLeader(): Observable<Leader> {
    return this.http.get<Leader>(BaseURL + '/leaders?featured=true')
      .pipe(map(dishes => dishes[0]))
        .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
