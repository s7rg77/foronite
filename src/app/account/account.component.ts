import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { SignService } from '../sign.service';
import { VisualService } from '../visual.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})

export class AccountComponent {

  @Output() accountClosed: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private signService: SignService,
    public visualService: VisualService
  ) { }

  toUser() {

    this.accountClosed.emit();
    this.router.navigate(['/user']);

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

  nightMode() {

    this.accountClosed.emit();
    this.visualService.nightModeService();

  }

  signOut(): void {

    this.signService.signout()
      .then(() => {

        this.accountClosed.emit();
        this.router.navigate(['']);

      })

  }

}