import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
 @ViewChild('f')slForm:NgForm;
 subscription: Subscription;
 editMode=false;
 editeditemIndex: number;
 editedItem:Ingredient;
 
  constructor(private slService: ShoppingListService) { }
 
  ngOnInit() {
   this.subscription= this.slService.startedEditing.
    subscribe(
      (index:number)=>{
        this.editMode=true;
        this.editeditemIndex=index;
        this.editedItem= this.slService.getIngredient(index);
        this.slForm.setValue(
          {
            name:this.editedItem.name,
            amount:this.editedItem.amount
          }
        )
      }



    )
  }

  onSubmit(form:NgForm) {
    console.log(form);
    const value=form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode)
    {
      this.slService.updateIngredient(newIngredient,this.editeditemIndex);
    }
    else{
    this.slService.addIngredients (newIngredient);
    }
    this.editMode=false;
    form.reset(); 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onClear()
{
  this.slForm.reset();
}

onDelete()
{
  this.onClear();
  this.slService.deleteIngredients(this.editeditemIndex);
  
}

}