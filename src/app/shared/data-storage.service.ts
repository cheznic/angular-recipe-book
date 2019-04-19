import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
   private recipesUri = '/recipes.json';

   constructor(
      private http: HttpClient,
      private recipeService: RecipeService
   ) { }

   storeRecipes() {
      this.http.put(
         this.recipesUri,
         this.recipeService.getRecipes()
      ).subscribe(
         (response: Response) => {
            // TODO: if error...
         }
      );

   }

   getRecipes() {
      this.http.get<Recipe[]>(
         this.recipesUri
      ).pipe(
         map(
            (recipes) => {
               for (const recipe of recipes) {
                  if (!recipe['ingredients']) {
                     recipe['ingredients'] = [];
                  }
               }
               return recipes;
            }
         )
      ).subscribe(
         (recipes: Recipe[]) => {
            this.recipeService.saveRecipes(recipes);
         }
      );
   }
}
