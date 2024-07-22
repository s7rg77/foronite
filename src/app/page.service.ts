import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PageService {

  private pageSource = new BehaviorSubject(1);
  
  currentPage = this.pageSource.asObservable();

  constructor() { }

  changePage(page: number) {

    this.pageSource.next(page);

  }

}