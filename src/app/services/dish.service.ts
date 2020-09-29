import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';

// OBSERVABLES AND RXJS FRAMEWORK
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HttpClient, HttpHeaders } from '@angular/common/http';

// CONSTANTS
import { BaseURL } from '../shared/BaseURL';

// SERVICE
import { ProcessHTTPMsgService } from './process-httpmsg-service.service';

@Injectable({ // THIS MAKE INJECTABLE OUR SERVICE BELOW (DishService)
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> { // RETURNS AN OBSERVABLE
    return this.http.get<Dish[]>(BaseURL + '/dishes')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(BaseURL + '/dishes/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish>(BaseURL + '/dishes?featured=true')
      .pipe(map(dishes => dishes[0])) // THIS RETURN AN ARRAY, TAKE THE FIRST ONE.
        .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDishIds(): Observable<string[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Dish>(BaseURL + '/dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

}
