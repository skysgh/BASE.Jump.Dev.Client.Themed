// Ag:
import { Injectable } from '@angular/core';
import { createMapper, createMap, Mapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { DiagnosticsTraceService } from './diagnostics.service';

// Create and export the mapper
/*export*/
const mapper = createMapper({
  strategyInitializer: classes(),
});


// Describe the service:
@Injectable({ providedIn: 'root' })

/**
 * Injectable Service
 * to map DTOs to system entities and back again.
 */
export class ObjectMappingInitialiserService {
  //expose the singleton created earlier:
  mapper: Mapper = mapper;

  constructor(private diagnosticsTraceService: DiagnosticsTraceService) {
    this.diagnosticsTraceService.debug(`${this.constructor.name}.constructor(...)`)
  }



}
