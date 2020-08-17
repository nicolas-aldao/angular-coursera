import { Component, OnInit, Input } from '@angular/core';
import { Dish } from '../shared/Dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  @Input() // This enables the field dish be passed as a parameter to the DishdetailComponent,
           // Angular will update all changes in the dom regarding this variable.
  dish: Dish;

  constructor() { }

  ngOnInit() {
  }

}
