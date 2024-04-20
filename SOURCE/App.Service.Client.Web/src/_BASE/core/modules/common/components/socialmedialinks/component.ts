// rx:
import { Subscription } from "rxjs";
// Ag:
import { Component, Input, OnDestroy, OnInit, Output } from "@angular/core";
// Etc:
//
// Constants:
import { system as importedSystemConst } from '../../../../constants/system';
// Services:
import { SystemDiagnosticsTraceService } from "../../../../services/system.diagnostics-trace.service";
// Models:
//
// Data:

/**
 * See: https://www.npmjs.com/package/ng2-pdf-viewer
 */
@Component({
  selector: 'app-base-core-common-components-socialmedialinks',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class BaseCoreCommonComponentsSocialMediaLinksComponent implements OnInit, OnDestroy {
  // Make system/env variables avaiable to class & view template:
  public system = importedSystemConst;


  constructor(
    private diagnosticsTraceService: SystemDiagnosticsTraceService,
  ) {
    this.diagnosticsTraceService.debug(`${this.constructor.name}.constructor()`);

    // Too early to pick up bound src.
  }

  ngOnInit(): void {
    this.diagnosticsTraceService.debug(`${this.constructor.name}.onInit()`);

  }


  ngOnDestroy(): void {
  }
}