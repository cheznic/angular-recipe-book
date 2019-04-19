// import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
   ingredientsChangedEvent = new Subject<Ingredient[]>();
   startedEditing = new Subject<number>();

   private ingredients: Ingredient[] = [
      new Ingredient('Apples', 5),
      new Ingredient('Pears', 10)
   ];

   getIngredients(): Ingredient[] {
      return this.ingredients.slice();
   }

   getIngredient(index: number): Ingredient {
      return this.ingredients[index];
   }

   addIngredients(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      this.ingredientsChangedEvent.next(this.ingredients.slice());
   }

   addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientsChangedEvent.next(this.ingredients.slice());
   }

   updateIngredient(index: number, updatedIngredient: Ingredient) {
      this.ingredients[index] = updatedIngredient;
      this.ingredientsChangedEvent.next(this.ingredients.slice());
   }

   deleteIngredient(index: number) {
      this.ingredients.splice(index, 1);
      this.ingredientsChangedEvent.next(this.ingredients.slice());
   }
}