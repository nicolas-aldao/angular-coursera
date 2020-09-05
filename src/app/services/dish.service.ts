import { Injectable } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DISHES } from '../shared/Dishes';

@Injectable({ // THIS MAKE INJECTABLE OUR SERVICE BELOW (DishService)
  providedIn: 'root'
})
export class DishService {

  constructor() { }

  getDishes(): Promise<Dish[]> {
    return new Promise(resolve => {
      //SIMULATE SERVER LATENCY WITH 2 SECOND DELAY
      setTimeout(() => resolve(DISHES), 2000);
    });

  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000); // CERO TO GET THE FIRST RESULT
    }); 

  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve => {
      setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });  
   
  }
}
