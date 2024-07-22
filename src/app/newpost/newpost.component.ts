import { Component, OnInit, Input, Output, EventEmitter, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { CookieService } from 'ngx-cookie-service';

import { MainService } from '../main.service';
import { SignService } from '../sign.service';
import { VisualService } from '../visual.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.scss'
})

export class NewpostComponent implements OnInit {

  @Input() caseId: any;
  @Output() postSubmitted: EventEmitter<void> = new EventEmitter<void>();

  postForm: FormGroup;
  submitted: boolean = false;
  postTime: boolean = false;
  seconds: number = 0;
  interval: any;
  imageUrl: string = '';
  videoId: string = '';

  constructor(
    private mainService: MainService,
    private signService: SignService,
    private cookieService: CookieService,
    private sanitizer: DomSanitizer,
    public visualService: VisualService
  ) {
    this.postForm = new FormGroup({
      postText: new FormControl('', { validators: [Validators.required, Validators.maxLength(5000)], updateOn: 'change' })
    });
  }

  ngOnInit(): void {

    this.checkCookie();

  }

  checkCookie() {

    if (this.cookieService.check('postTime')) {
      const expirationDate = new Date(this.cookieService.get('postTime'));
      const currentDate = new Date();

      this.seconds = Math.floor((expirationDate.getTime() - currentDate.getTime()) / 1000);

      if (this.seconds > 0) {
        if (this.interval) {
          clearInterval(this.interval);
        }

        this.interval = setInterval(() => {
          this.seconds--;

          if (this.seconds <= 0) {
            clearInterval(this.interval);

            this.cookieService.delete('postTime');
          }
        }, 1000);
      }
    }

  }

  onSubmit() {

    if (this.cookieService.check('postTime')) {
      this.checkCookie();
      return;
    }

    this.submitted = true;

    if (this.postForm.valid) {
      const userId = this.signService.getuid();
      const formData = this.postForm.value;

      formData.userId = userId;
      formData.caseId = this.caseId;

      this.mainService.newPostService(formData)
        .subscribe({

          next: response => {
            console.log(response);
            this.postSubmitted.emit();
            this.postTime = true;

            const currentDate = new Date();
            const expirationDate = new Date(currentDate.getTime() + 30 * 1000);

            this.cookieService.set('postTime', expirationDate.toISOString(), expirationDate);
            this.seconds = 30;

            if (this.interval) {
              clearInterval(this.interval);
            }

            this.interval = setInterval(() => {
              this.seconds--;

              if (this.seconds <= 0) {
                clearInterval(this.interval);

                this.cookieService.delete('postTime');
                this.postTime = false;

              }

            }, 1000);

          },
          error: error => {
            console.error('error:', error);
          }

        });

      this.postForm.reset();
      this.submitted = false;

    } else {
      console.error('onSubmitKO');
    }

  }

  addImage() {

    const text = this.postForm.get('postText')!.value || '';

    if (this.imageUrl && /\.(jpg|jpeg|png|gif|webp)$/i.test(this.imageUrl)) {
      const tag = `[img]${this.imageUrl}[/img]`;

      this.postForm.get('postText')!.setValue(text + tag);
      this.imageUrl = '';
    } else {
      alert('la URL debe terminar en .jpg .jpeg .png. gif. webp');
    }

  }

  addVideo() {

    const text = this.postForm.get('postText')!.value || '';

    if (this.videoId && /^[a-zA-Z0-9_-]{11}$/.test(this.videoId)) {

      const tag = `[youtube]${this.videoId}[/youtube]`;

      this.postForm.get('postText')!.setValue(text + tag);
      this.videoId = '';

    } else {
      alert('El ID son los 11 caracteres posteriores a v=');
    }

  }

  addQuote(userName: string, quotedText: string): void {

    const currentText = this.postForm.get('postText')!.value || '';
    const tag = `[quote=${userName}]${this.sanitizeContent(quotedText)}[/quote]\n`;

    this.postForm.get('postText')!.setValue(currentText + tag);

  }

  sanitizeContent(content: any): any {

    return this.sanitizer.sanitize(SecurityContext.HTML, content);

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}