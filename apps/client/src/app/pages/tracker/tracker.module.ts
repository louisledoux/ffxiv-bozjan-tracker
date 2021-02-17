import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker/tracker.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CountdownModule } from 'ngx-countdown';
import { FormsModule } from '@angular/forms';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

const routes: Routes = [{
  path: '',
  component: TrackerComponent
}];

@NgModule({
  declarations: [TrackerComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,

    NzGridModule,
    NzDividerModule,
    NzSpaceModule,
    NzButtonModule,
    NzModalModule,
    NzListModule,
    NzInputNumberModule,
    NzMessageModule,
    NzCheckboxModule,
    NzTabsModule,
    NzCollapseModule,

    CountdownModule,

    RouterModule.forChild(routes)
  ]
})
export class TrackerModule { }
