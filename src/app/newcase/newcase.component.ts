import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { MainService } from '../main.service';
import { SignService } from '../sign.service';
import { VisualService } from '../visual.service';

@Component({
  selector: 'app-newcase',
  templateUrl: './newcase.component.html',
  styleUrls: ['./newcase.component.scss']
})

export class NewcaseComponent implements OnInit {

  @Input() zoneId: any;
  @Output() caseSubmitted: EventEmitter<void> = new EventEmitter<void>();

  caseForm: FormGroup;
  submitted: boolean = false;
  caseTime: boolean = false;
  seconds: number = 0;
  interval: any;
  imageUrl: string = '';
  videoId: string = '';

  constructor(
    private mainService: MainService,
    private signService: SignService,
    private cookieService: CookieService,
    public visualService: VisualService
  ) {
    this.caseForm = new FormGroup({
      caseName: new FormControl('', { validators: [Validators.required, Validators.maxLength(100)], updateOn: 'change' }),
      caseText: new FormControl('', { validators: [Validators.required, Validators.maxLength(5000)], updateOn: 'change' })
    });
  }

  ngOnInit(): void {

    this.checkCookie();

  }

  checkCookie() {

    if (this.cookieService.check('caseTime')) {
      const currentDate = new Date();
      const expirationDate = new Date(this.cookieService.get('caseTime'));

      this.seconds = Math.floor((expirationDate.getTime() - currentDate.getTime()) / 1000);

      if (this.seconds > 0) {
        if (this.interval) {
          clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
          this.seconds--;

          if (this.seconds <= 0) {
            clearInterval(this.interval);

            this.cookieService.delete('caseTime');
          }
        }, 1000);
      }
    }

  }

  onSubmit() {

    if (this.cookieService.check('caseTime')) {
      this.checkCookie();
      return;
    }

    this.submitted = true;

    if (this.caseForm.valid) {
      const userId = this.signService.getuid();
      const formData = this.caseForm.value;

      formData.userId = userId;
      formData.zoneId = this.zoneId;

      this.mainService.newCaseService(formData)
        .subscribe({

          next: response => {
            console.log(response);
            this.caseSubmitted.emit();
            this.caseTime = true;

            const currentDate = new Date();
            const expirationDate = new Date(currentDate.getTime() + 30 * 1000);

            this.cookieService.set('caseTime', expirationDate.toISOString(), expirationDate);
            this.seconds = 30;

            if (this.interval) {
              clearInterval(this.interval);
            }

            this.interval = setInterval(() => {
              this.seconds--;

              if (this.seconds <= 0) {
                clearInterval(this.interval);

                this.cookieService.delete('caseTime');
                this.caseTime = false;
              }

            }, 1000);

          },
          error: error => {
            console.error('error:', error);
          }

        });

      this.caseForm.reset();
      this.submitted = false;

    } else {
      console.error('onSubmitKO');
    }

  }

  addImage() {

    const text = this.caseForm.get('caseText')!.value || '';

    if (this.imageUrl && /\.(jpg|jpeg|png|gif|webp)$/i.test(this.imageUrl)) {

      const tag = `[img]${this.imageUrl}[/img]`;

      this.caseForm.get('caseText')!.setValue(text + tag);
      this.imageUrl = '';

    } else {
      alert('La URL debe terminar en .jpg .jpeg .png. gif. webp');
    }

  }

  addVideo() {

    const text = this.caseForm.get('caseText')!.value || '';

    if (this.videoId && /^[a-zA-Z0-9_-]{11}$/.test(this.videoId)) {
      const tag = `[youtube]${this.videoId}[/youtube]`;

      this.caseForm.get('caseText')!.setValue(text + tag);
      this.videoId = '';

    } else {
      alert('El ID son los 11 caracteres posteriores a v=');
    }

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}