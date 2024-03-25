import { Observable, of } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from "@angular/core";

// Language
import { LanguageService } from '../../../../services/language.service';
import { SystemService } from "../../../../services/system.service";
import { DiagnosticsTraceService } from "../../../../services/diagnostics.service";
import { SystemLanguage } from '../../../../models/data/system-language.model';
import { System } from '../../../../constants/contracts/system';
import { TranslationService } from '../../../../services/translation.service';



@Component({
  selector: 'app-frame-context-language',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class BaseLayoutTopBarContextLanguageComponent implements OnInit {


  system: System;

  public systemLanguages$: Observable<SystemLanguage[]> = of([]);

  // Language: stuff:
  activeLanguageCode:string = '';
  flagvalue: string = '';
  valueset: string = '';
  languageTitle: string = '';
  constructor(
    systemService: SystemService,
    protected diagnosticsTraceService: DiagnosticsTraceService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public translationService: TranslationService,
    public _cookiesService: CookieService) {

    // Can be either via service, or injecting the constats/settings object:
    this.system = systemService.system;

    this.initLanguages();
  }

  ngOnInit(): void {

    }


  private initLanguages() {
    // This will take a sec to retrieve:
    this.languageService
      .items$
      .subscribe(list => {

        if (list.length == 0) {
          this.diagnosticsTraceService.info("...early exit...");
          return;
        }
        this.diagnosticsTraceService.info("Number of languages is:" + list.length);

        this.activeLanguageCode = this.translationService.getDefaultLanguageCode();
        // Cookies wise Language set

        //Get an array of one, matching current language description:
        var tmp = list.filter(i => i.languageCode === this.activeLanguageCode);

        if (tmp.length === 0) {
          // NO match, so can't set to a specific flag. Fallback:
          this.languageTitle = '...';
          this.valueset = this.system.sources.assets.images.flags + '/00.svg';
          this.flagvalue = this.system.sources.assets.images.flags + '/00.svg';
        } else {
          //tmp = tmp[0];
          // Match. So image will be ok.
          // And we can also set the language title.
          this.languageTitle = tmp[0].title;

          this.diagnosticsTraceService.info("languageTitle:" + this.languageTitle);
          // go through array of 1:
          // and get it's flag url:
          this.flagvalue = `${this.system.sources.assets.images.flags}${tmp[0].languageCode}.svg`;
        }
        this.diagnosticsTraceService.info("valueset:" + this.valueset);
        this.diagnosticsTraceService.info("FlagValue:" + this.flagvalue);

        this.systemLanguages$ = of(list);

      });

  }


  /***
 * Language Value Set
 */
  setLanguage(systemLanguage: SystemLanguage) {
    if (systemLanguage) {
      this.languageTitle = systemLanguage.title;
      this.flagvalue = `${this.system.sources.assets.images.flags}${systemLanguage.languageCode}.svg`;

      this.translationService.setLanguage(systemLanguage.languageCode!);
    }
  }

  trackByCountryCode(index: number, item: SystemLanguage) {
    //this.diagnosticsTraceService.info(item.description);
    return item.languageCode;
  }

}
