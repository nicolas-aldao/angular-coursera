import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[]; // PROPERTY, TYPE
  errMess: string;
  
  constructor(private dishService: DishService, // IMPORT THE SERVICE
    @Inject('BaseURL') private BaseURL) { } // IMPORT THE VALUE OF THE CONST

  ngOnInit() {
    this.dishService.getDishes()
      .subscribe((dishes) => this.dishes =  dishes, // THE SUBSCRIBE FUNCTION HANDLES THE SUCESS AND THE FAIL CASES
        errmess => this.errMess = <any>errmess);
  }

}
