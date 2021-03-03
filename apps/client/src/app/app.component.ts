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

  public language= navigator.language;

  constructor(private translate: TranslateService) {
    if (navigator.language === 'en-US' || navigator.language === 'en-US' || navigator.language === 'en') {
      this.language = 'en';
    } else if (navigator.language === 'fr-FR' || navigator.language === 'fr')  {
      this.language = 'fr';
    } else if (navigator.language === 'de-DE' || navigator.language === 'de') {
      this.language = 'de';
    } else if (navigator.language === 'jp-JP' || navigator.language === 'jp') {
      this.language = 'jp';
    } else if (navigator.language === 'kor' || navigator.language === 'ko') {
      this.language = 'ko';
    } else {
      this.language = 'en';
    }
    translate.setDefaultLang(this.language);
  }

  updateLanguage() {
    this.translate.use(this.language)
  }

  ngOnInit() {
    setInterval(() => {
      this.etTimer = `0${new EorzeaTime().getHours()}`.slice(-2) + ":" + `0${new EorzeaTime().getMinutes()}`.slice(-2);
    }, 1000);
  }
}
