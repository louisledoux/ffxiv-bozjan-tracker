import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';

const routes: Routes = [{
  path: '',
  component: HomepageComponent
}];

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    TranslateModule,

    NzGridModule,
    NzDividerModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    

    RouterModule.forChild(routes)
  ]
})
export class HomepageModule { }
