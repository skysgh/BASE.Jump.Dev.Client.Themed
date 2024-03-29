import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SystemService } from "../../../../services/system.service";
import { System } from "../../../../constants/contracts/system";
import { EventService } from "../../../../services/event.service";

@Component({
  selector: 'app-base-common-components-topbar-languagehue',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class BaseCoreCommonComponentTopBarHueComponent implements OnInit {

  system: System;

  mode: string | undefined;

  constructor(
    systemService: SystemService,
    public translate: TranslateService,
    private eventService: EventService
) {

    // Can be either via service, or injecting the constats/settings object:
    this.system = systemService.system;
  }

  ngOnInit(): void {
  }


  /**
  * Topbar Light-Dark Mode Change
  */
  changeMode(mode: string) {
    this.mode = mode;
    this.eventService.broadcast('changeMode', mode);

    switch (mode) {
      case 'light':
        document.documentElement.setAttribute('data-bs-theme', "light");
        break;
      case 'dark':
        document.documentElement.setAttribute('data-bs-theme', "dark");
        break;
      default:
        document.documentElement.setAttribute('data-bs-theme', "light");
        break;
    }
  }
}
