import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MainService } from '../main.service';
import { VisualService } from '../visual.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {

  searchTextControl = new FormControl('');
  searchResults: any[] = [];
  showResults: boolean = false;

  constructor(
    private router: Router,
    private mainService: MainService,
    public visualService: VisualService,
    public dateService: DateService
  ) {
    this.searchTextControl.valueChanges.subscribe(value => {

      this.searchCases(value);

    });
  }

  searchCases(searchText: any): void {

    if (!searchText || searchText.trim() == '') {
      this.searchResults = [];
      return;
    }

    this.mainService.searchService(searchText.trim())
      .subscribe({

        next: response => {
          this.searchResults = response;
          this.showResults = true;
        },
        error: error => {
          console.error('error', error);
        }

      });

  }

  navigateToCase(case1: any): void {

    this.router.navigateByUrl(`/case/${case1.case_id}/${1}`);

  }

  results() {

    this.showResults = !this.showResults;

  }

  closeResults() {

    this.searchTextControl.reset();
    this.showResults = false;

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}