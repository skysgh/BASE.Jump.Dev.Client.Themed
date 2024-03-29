// Ag:
import { Component, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from "@angular/common";
//Etc:
import { TranslateService } from "@ngx-translate/core";
// Constants:
import { system as importedSystemConst } from '../../../../constants/system';
// Services:
import { SystemService } from "../../../../services/system.service";
import { EventService } from "../../../../services/event.service";

@Component({
  selector: 'app-base-common-components-topbar-languagefullscreen',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class BaseCoreCommonComponentTopBarFullScreenComponent implements OnInit {

  system = importedSystemConst;

  mode: string | undefined;
  element: any = null; //HTMLElement

  constructor(@Inject(DOCUMENT)
  private document: any,
    systemService: SystemService,
    public translate: TranslateService,
    private eventService: EventService
) {

    // Can be either via service, or injecting the constats/settings object:
    this.system = systemService.system;
  }

  ngOnInit(): void {
    this.element = document.documentElement;
}

  /**
  * Fullscreen method
  */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

}
