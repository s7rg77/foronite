import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MainService } from '../main.service';
import { VisualService } from '../visual.service';
import { PageService } from '../page.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrl: './zone.component.scss'
})

export class ZoneComponent implements OnInit {

  zoneId: any = '';
  zone1: any[] = [];
  showNewCase: boolean = false;
  caseNu: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService,
    public visualService: VisualService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.zoneId = params['id'];
      this.currentPage = params['page'];
      this.getZone1();

    });

  }

  getZone1(): void {

    this.mainService.getZoneService(this.zoneId)
      .subscribe({

        next: response => {
          console.log(response);
          this.zone1 = response;
          this.caseNu = this.zone1[0].case_nu;
        },
        error: error => {
          console.error('error:', error);
        }
        
      });

  }

  newCase() {

    this.showNewCase = !this.showNewCase;

  }

  caseSubmitted() {

    this.showNewCase = false;

  }

  getPageNumber(): number[] {

    this.totalPages = Math.max(Math.ceil(this.caseNu / 15), 1);
    const pages: number[] = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    return pages;

  }

  goToPage(page: number): void {

    this.pageService.changePage(page);
    this.router.navigateByUrl(`/zone/${this.zoneId}/${page}`);

  }

  goBack(): void {

    this.router.navigate(['/']);

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}