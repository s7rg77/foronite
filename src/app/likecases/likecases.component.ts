import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainService } from '../main.service';
import { VisualService } from '../visual.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-likecases',
  templateUrl: './likecases.component.html',
  styleUrl: './likecases.component.scss'
})

export class LikecasesComponent implements OnInit {

  cases: any[] = [];
  currentDate: string = '';

  constructor(
    private router: Router,
    private mainService: MainService,
    public visualService: VisualService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {

    this.getLikeCases();

  }

  getLikeCases(): void {

    this.mainService.getLikeCasesService()
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