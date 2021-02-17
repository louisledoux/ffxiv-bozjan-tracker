import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LostActionsComponent } from './lost-actions/lost-actions.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: LostActionsComponent
}];

@NgModule({
  declarations: [LostActionsComponent],
  imports: [
    CommonModule,

    RouterModule.forChild(routes)
  ]
})
export class LostActionsModule { }
