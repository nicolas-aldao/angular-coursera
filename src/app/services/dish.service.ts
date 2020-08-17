import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from '../shared/Dishes';

@Injectable({ // THIS MAKE INJECTABLE OUR SERVICE BELOW (DishService)
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Dish[] {
    return DISHES;
  } 
}
