import { Component, OnInit } from '@angular/core';

import { MonthlyPlanModel, AnnualPlanModel } from './plan.model';
import { MonthlyPlan, AnnualPlan } from './data';
import { SystemService } from '../../../../../services/system.service';
import { DiagnosticsTraceService } from '../../../../../services/diagnostics.service';
import { TranslateService } from '@ngx-translate/core';
import { System } from '../../../../../constants/contracts/system';

@Component({
  selector: 'app-base-core-pages-landing-index-plan',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})

/**
 * Plan Component
 */
export class BaseAppsPagesLandingIndexPlanComponent implements OnInit {


  MonthlyPlan!: MonthlyPlanModel[];
  AnnualPlan!: AnnualPlanModel[];

  system: System;

  constructor(
    systemService: SystemService,
    private diagnosticsTraceService: DiagnosticsTraceService,
    public translateService: TranslateService) {
    this.system = systemService.system;

    this.diagnosticsTraceService.debug(`${this.constructor.name}.constructor()`)

  }

  ngOnInit(): void {
    // Chat Data Get Function
    this._fetchData();
    document.querySelectorAll(".annual").forEach((item)=>{
      item.setAttribute('style','display:none')
    })
  }

   // Chat Data Fetch
   private _fetchData() {
    this.MonthlyPlan = MonthlyPlan;
    this.AnnualPlan = AnnualPlan;
  }

  /**
   * Open modal
   * @param content modal content
   */
   
   check() {
    var checkBox = document.getElementById("plan-switch");
    var month = document.querySelectorAll(".month");
    var annual = document.querySelectorAll(".annual");

    
    annual.forEach((item)=>{
      if(item.getAttribute('style')=='display:none')
      {
        item.setAttribute('style','display:block')
      }else{
        item.setAttribute('style','display:none')
      }
    })
    month.forEach((item)=>{
      if(item.getAttribute('style')=='display:none')
      {
        item.setAttribute('style','display:block')
      }else{
        item.setAttribute('style','display:none')
      }
    });
    
  }

}
