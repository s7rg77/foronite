import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SignService } from '../sign.service';
import { MainService } from '../main.service';
import { VisualService } from '../visual.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrl: './cases.component.scss'
})

export class CasesComponent implements OnInit {

  @Input() zoneId: any = '';
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  cases: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService,
    private signService: SignService,
    public visualService: VisualService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.currentPage = params['page'];
      this.getCases();

    });

  }

  getCases(): void {

    const caseData = {
      zoneId: this.zoneId,
      page: this.currentPage
    };

    this.mainService.getCasesService(caseData)
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

  signed(): boolean {

    return this.signService.signed();

  }

  navigateToCase(case1: any): void {

    this.router.navigateByUrl(`/case/${case1.case_id}/${1}`);

    this.mainService.accessNuService({ caseId: case1.case_id })
      .subscribe({

        next: response => {
          console.log(response);
        },
        error: error => {
          console.error('error:', error);
        }

      });

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}