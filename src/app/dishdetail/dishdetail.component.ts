import { Component, OnInit, ViewChild } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router'; // Enables us pass params to our urls // enable us
                                                          // get information about the current route
import { Location } from '@angular/common'; // Enable us get information about the browser history
import { Dish } from '../shared/Dish';
import { Comment } from '../shared/Comment';

// TO USE THE OBSERVABLES WE NEED THE SWITCHMAP OPERATOR
import { switchMap } from 'rxjs/operators';

// REACTIVE FORMS
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  //FORM VARIABLES
  commentDishForm: FormGroup;
  comment: Comment;

  formErrors = {
    'author':'',
    'comment':''
  };

  validationMessages = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.',
      'maxlength':     'Author cannot be more than 25 characters long.'
    },
    'comment': {
      'required':      'Comment is required.',
      'minlength':     'Comment must be at least 2 characters long.',
      'maxlength':     'Comment cannot be more than 25 characters long.'
    }
  }

  @ViewChild('cform') commentDishFormDirective;

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishService
      .getDish(params['id'])))
    .subscribe(dish =>  { this.dish = dish; this.setPrevNext(dish.id); });
  }

  createForm() {
    this.commentDishForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: [5],
      comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
    });

    this.commentDishForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now  
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentDishForm.value;
    console.log(this.comment);
    this.commentDishForm.reset({
      author: '',
      rating: 5,
      comment: ''
    });
    var d = new Date();
    var n = d.toISOString();
    this.comment.date = n;
    this.dish.comments.push(this.comment);
    this.commentDishFormDirective.resetForm({
      rating: 5
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentDishForm) { return; }
    const form = this.commentDishForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

}
