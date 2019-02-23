import { Ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs/';
import { NgForm } from '@angular/forms';

export class ShoppingListService
{   ingredientsChanged=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      getIngredients()
      {
          return this.ingredients.slice();

      }

      getIngredient(index:number)
      {
          return this.ingredients.slice()[index];
      }

      addIngredients(ingredient:Ingredient)
      {
          this.ingredients.push(ingredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      
      addIngredient(ingredients:Ingredient[])
      {
          this.ingredients.push(...ingredients);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(newIngredient:Ingredient,index:number)
      {
          this.ingredients[index]=newIngredient;
          this.ingredientsChanged.next(this.ingredients.slice())

      }

      deleteIngredients(index:number)
      {
          this.ingredients.splice(index,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
    
}