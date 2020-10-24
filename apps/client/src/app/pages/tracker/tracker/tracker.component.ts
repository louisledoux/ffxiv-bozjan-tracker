import { Component } from '@angular/core';

@Component({
  selector: 'ffxiv-bozjan-tracker-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent {

  public isVisible = false;
  public isConfirmLoading = false;

  constructor() {
  }

  showResetModal(): void {
    this.isVisible = true;
  }

  handleReset() {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 2000);
  }

  handleCancel() {
    this.isVisible = false;
  }

}
