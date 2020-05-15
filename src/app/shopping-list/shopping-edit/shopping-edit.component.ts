import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';

import { ShoppingListService } from '../shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput', {static:false}) nameInputRef: ElementRef;
  // @ViewChild('amountInput', {static:false}) amountInputRef: ElementRef;
  // ingredientAdded = new EventEmitter<{name: string, amount: number}>();
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    // this.ingredientAdded.emit(newIngredient);
    this.slService.addIngredient(newIngredient);
    
  }
}
