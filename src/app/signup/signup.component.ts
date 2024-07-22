import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { SignService } from '../sign.service';
import { VisualService } from '../visual.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent implements OnInit {

  formSignup: FormGroup;
  submitted: boolean = false;

  constructor(
    private signService: SignService,
    private router: Router,
    private http: HttpClient,
    public visualService: VisualService
  ) {
    this.formSignup = new FormGroup({
      user_name: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z0-9]*$/)]),
      user_mail: new FormControl('', [Validators.required, Validators.email]),
      user_pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
      conf_pass: new FormControl
    })
  }

  ngOnInit(): void { }

  onSubmit() {

    this.submitted = true;

    const formData = this.formSignup.value;

    if (this.formSignup.valid && this.formSignup.value.user_pass === this.formSignup.value.conf_pass) {

      this.signService.signup(formData)

        .then(() => {

          const userId = this.signService.getuid();
          formData.user_id = userId;

          this.http.post('https://foronite.com/signup.php', formData)
            .subscribe({

              next: response => {
                console.log("signupOK", response);
              },
              error: (error) => {
                console.error("signupKO", error);
              }

            });

          this.router.navigate(['/']);

        })

    } else {
      console.error('onSubmitKO');
    }

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}