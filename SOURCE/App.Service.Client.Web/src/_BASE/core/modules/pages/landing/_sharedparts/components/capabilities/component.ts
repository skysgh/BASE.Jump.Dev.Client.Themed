// Ag:
import { Component, OnInit } from '@angular/core';
// Etc:
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

import { SystemService } from '../../../../../../services/system.service';
// Constants:
import { system as importedSystemConst } from '../../../../../../constants/system';//
// Services:
import { SystemDiagnosticsTraceService } from '../../../../../../services/system.diagnostics-trace.service';
import { SystemCapabilitiesVTO } from '../../../../../../models/view/system-capabilities.vto.model';
// Models:
import { servicesModel } from './services.model';
import { Services } from './data';
// Data/Models:
import { sectionsInfo as importedSectionsInfo } from '../../sectionsInfo.data';
import { SystemCapabilitiesRepositoryService } from '../../../../../../services/services/repositories/service-capabilities.service';


@Component({
  selector: 'app-base-core-pages-landing-index-capabilities',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})

/**
 * Services Component
 */
export class BaseAppsPagesLandingIndexCapabilitiesComponent implements OnInit {


  capabilities$: Observable<SystemCapabilitiesVTO[]> = of([]);

  // Make system/env variables avaiable to class & view template:
  public system = importedSystemConst;
  sectionsInfo = importedSectionsInfo;

  constructor(systemService: SystemService,
    private diagnosticsTraceService: SystemDiagnosticsTraceService,
    public translateService: TranslateService,
    protected capabilitiesRepositoryService: SystemCapabilitiesRepositoryService
    ) {
    // Make system/env variables avaiable to class & view template:
    this.system = systemService.system;

    this.diagnosticsTraceService.debug(`${this.constructor.name}.constructor()`)
  }

  ngOnInit(): void {
    /**
     * fetches data
     */
     this._fetchData();
  }

   /**
 * User grid data fetches
 */
  private _fetchData() {
    this.capabilitiesRepositoryService
      .getPage()
      .subscribe(x => {
        this.capabilities$ = of(x)
      });
    }

}
