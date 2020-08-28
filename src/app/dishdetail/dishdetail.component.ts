import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router'; // Enables us pass params to our urls // enable us
                                                          // get information about the current route
import { Location } from '@angular/common'; // Enable us get information about the browser history
import { Dish } from '../shared/Dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id']; // get the id from the current url
    this.dish = this.dishService.getDish(id);
  }

  goBack(): void {
    this.location.back();
  }
}
