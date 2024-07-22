import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { SignService } from '../sign.service';
import { VisualService } from '../visual.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {

  showAccountButton: boolean = true;
  showAccount: boolean = false;

  constructor(
    private router: Router,
    private signService: SignService,
    public visualService: VisualService
  ) { }

  ngOnInit(): void {

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {
        this.showAccountButton = !this.router.url.includes('account');
      }
      
    });

  }

  getSign(): string {

    return this.signService.getuid();

  }

  goToZones() {

    this.router.navigate(['/']);

  }

  toSignin() {

    this.router.navigate(['/signin']);

  }

  toSignup() {

    this.router.navigate(['/signup']);

  }

  account() {

    this.showAccount = !this.showAccount;

  }

  closeAccount() {

    this.showAccount = false;

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}