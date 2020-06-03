import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  langs = ['en', 'fr'];
  selectedLanguage = 'en';

  constructor(
    private translateService: TranslateService
  ) {
    const browserLang = this.translateService.getBrowserLang();
    if (this.langs.indexOf(browserLang) > -1) {
      this.selectedLanguage = browserLang;
      this.translateService.setDefaultLang(browserLang);
    } else {
      this.translateService.setDefaultLang('en');
    }
  }

  /**
   * Used to change language
   * @param lang
   */
  public useLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.translateService.setDefaultLang(lang);
  }

}
