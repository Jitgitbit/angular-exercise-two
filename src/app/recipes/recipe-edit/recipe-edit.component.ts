import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {}


  get controls() {                                                             // a getter! Sometimes Angular doesn't understand TS
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
              
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;                            // nice trick to check truthy or falsy here !
        this.initForm();
        console.log(`======>>> is editMode true?`,this.editMode);
      }
    )
  }

  private initForm(){
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)                      // YEEY!! RegEx again !!
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'ingredients': recipeIngredients,
    });
  }

  onSubmitAddOrUpdate(){
    console.log(`recipeForm says what?`,this.recipeForm);
    // const newRecipe = new Recipe(                                          // GOOD EXAMPLE OF OUR REACTIVE APPROACH:
    //   this.recipeForm.value['name'],                                      // Since our value of the form has exactly the same format and names
    //   this.recipeForm.value['description'],                              // as our Recipe Model, you can skip the step of saving it into a new constant
    //   this.recipeForm.value['imagePath'],                               //  Line 82 and 85 are the way !!!
    //   this.recipeForm.value['ingredients']
    // );

    if(this.editMode){
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      // this.recipeService.addRecipe(newRecipe);
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancelAndOrRedirectBack();
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(          // Explicitely casted into a FormArray here for demanding TS !!!
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)                      // YEEY!! RegEx again !!
        ]),
      })
    )
  }
  onCancelAndOrRedirectBack(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
