// Rx:
//
// Ag:
import { Injectable } from '@angular/core';
// Etc:
// 
// Constants:
import { system as importedSystemConst } from '../constants/system';
// Services//
import { DiagnosticsTraceService } from './diagnostics.service';
// Models:
//
// Data:
//

// Describe the service:
@Injectable({ providedIn: 'root' })

// Injectable service to describe current environment
export class EnvironmentService {
  // Make system/env variables avaiable to view template:
  system = importedSystemConst;;

  //// Expose public property of
  //// system environment.
  //// From there, can get access to base service url. 
  //public environment: any;

  constructor(/*NEVER: private diagnosticsTraceService:DiagnosticsTraceService*/) {
    // Make system/env variables avaiable to view template (via const or service):
    // this.system = systemService.system;
    //this.environment = importedSystemConst.environment;
    //this.diagnosticsTraceService.debug(`${this.constructor.name}.constructor(...)`)
  }

  public isJsonServerContext: boolean = true;

  public getDebugLevel() {
    return this.system.environment.custom.diagnostics.level;
  }
  public getApiBaseUrl() : string {
    return this.system.apis.baseUrl;
  }
  public getRestApiBaseUrl() : string {
    return this.system.apis.baseRestUrl;
  }
}
