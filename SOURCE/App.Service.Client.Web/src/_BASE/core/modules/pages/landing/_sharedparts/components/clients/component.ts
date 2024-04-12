// Ag:
import { Component, OnInit } from '@angular/core';
// Etc:
import { TranslateService } from '@ngx-translate/core';
// Constants:
import { system as importedSystemConst } from '../../../../../../constants/system';
// Services:
import { SystemService } from '../../../../../../services/system.service';
import { SystemDiagnosticsTraceService } from '../../../../../../services/system.diagnostics-trace.service';
// Models:
//import { ClientLogo } from './data';
// Data/Models:
import { sectionsInfo as importedSectionsInfo } from '../../sectionsInfo.data';
import { ServiceTrustedByService } from '../../../../../../services/service.trusted-by.service';
import { ServiceTrustedByVTO } from '../../../../../../models/view/service.trustedByVTO';
import { Observable, of } from 'rxjs';

import {  Responsive as importedResponsive} from './settings';

@Component({
  selector: 'app-base-core-pages-landing-index-client-logo',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})

/**
 * ClientLogoComponent
 */
export class BaseAppsPagesLandingIndexClientsComponent implements OnInit {
  // Make system/env variables avaiable to view template:
  public system = importedSystemConst;
  sectionsInfo = importedSectionsInfo;
  // Configuration for ngx-slick-carousel:
  carouselConfiguration = importedResponsive;

  // Define an observable:
  public list$: Observable<ServiceTrustedByVTO[]> = of([]);

  constructor(
    systemService: SystemService,
    private diagnosticsTraceService: SystemDiagnosticsTraceService,
    public translateService: TranslateService,
    private serviceTrustedByService: ServiceTrustedByService
  ) {
    // Make system/env variables avaiable to view template:
    this.system = systemService.system;

    this.diagnosticsTraceService.debug(`${this.constructor.name}.constructor()`)

    this.initList();
  }

  ngOnInit(): void {
    this.diagnosticsTraceService.debug(`${this.constructor.name}.ngOnInit()`)
  }



  
  private initList() {
    
    this.serviceTrustedByService 
      .items$
      .subscribe(list => {
        if (list.length == 0) {
          this.diagnosticsTraceService.warn("...early exit...");
          return;
        }
        this.list$ = of(list)
      });
  }



}
