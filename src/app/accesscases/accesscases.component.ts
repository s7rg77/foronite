import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainService } from '../main.service';
import { VisualService } from '../visual.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-accesscases',
  templateUrl: './accesscases.component.html',
  styleUrl: './accesscases.component.scss'
})

export class AccesscasesComponent {

  cases: any[] = [];

  constructor(
    private router: Router,
    private mainService: MainService,
    public visualService: VisualService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {

    this.getAccessCases();

  }

  getAccessCases(): void {

    this.mainService.getAccessCasesService()
      .subscribe({

        next: response => {
          console.log(response);
          this.cases = response;
        },
        error: error => {
          console.error('error:', error);
        }

      });

  }

  navigateToCase(case1: any): void {

    const data = { caseId: case1.case_id };

    this.mainService.accessNuService(data)
      .subscribe({

        next: response => {
          this.router.navigateByUrl(`/case/${case1.case_id}/${1}`);
          console.log(response);
        },
        error: error => {
          this.router.navigateByUrl(`/case/${case1.case_id}/${1}`);
          console.error('error:', error);
        }

      });

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}