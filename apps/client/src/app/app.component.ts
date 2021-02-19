import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import EorzeaTime from 'eorzea-time';

@Component({
  selector: 'ffxiv-bozjan-tracker-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public etTimer: String;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    setInterval(() => {
      this.etTimer = `0${new EorzeaTime().getHours()}`.slice(-2) + ":" + `0${new EorzeaTime().getMinutes()}`.slice(-2);
    }, 1000);
  }
}
