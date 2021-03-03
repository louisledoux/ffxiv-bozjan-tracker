import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export function getFilename(lang: string): string {
  switch (lang) {
    case 'fr':
      return 'fr-FR';
    case 'de':
      return 'de-DE';
    case 'jp':
      return 'jp-JP';
    case 'ko':
      return 'ko-KO';
    default:
      return 'en';
  }
}

export class TranslationsLoader implements TranslateLoader {

  constructor(private http: HttpClient) {
  }

  public getTranslation(lang: string): Observable<any> {
      return this.http.get(`./assets/i18n/${getFilename(lang)}.json`).pipe(shareReplay(1));
  }
}

export function TranslationsLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslationsLoader(http);
}