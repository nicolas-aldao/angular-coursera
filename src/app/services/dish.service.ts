import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from '../shared/Dishes';

// OBSERVABLES AND RXJS FRAMEWORK
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ // THIS MAKE INJECTABLE OUR SERVICE BELOW (DishService)
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    return of(DISHES).pipe(delay(2000)); // OBSERVABLE
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)); // CERO TO GET THE FIRST RESULT
  }

  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id));
  }

}
