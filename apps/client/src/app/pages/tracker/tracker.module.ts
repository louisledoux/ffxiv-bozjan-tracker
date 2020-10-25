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
import { CountdownModule } from 'ngx-countdown';

const routes: Routes = [{
  path: '',
  component: TrackerComponent
}];

@NgModule({
  declarations: [TrackerComponent],
  imports: [
    CommonModule,
    TranslateModule,

    NzGridModule,
    NzDividerModule,
    NzSpaceModule,
    NzButtonModule,
    NzModalModule,
    NzListModule,

    CountdownModule,

    RouterModule.forChild(routes)
  ]
})
export class TrackerModule { }
