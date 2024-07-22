import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignService } from '../sign.service';
import { VisualService } from '../visual.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})

export class SigninComponent implements OnInit {

  formSignin: FormGroup;
  submitted: boolean = false;
  signinError: string = '';

  constructor(
    private signService: SignService,
    private router: Router,
    public visualService: VisualService
  ) {
    this.formSignin = new FormGroup({
      user_mail: new FormControl('', [Validators.required, Validators.email]),
      user_pass: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void { }

  onSubmit() {

    this.submitted = true;

    this.signService.signin(this.formSignin.value)

      .then(response => {
        console.log("signinOK", response);
        this.router.navigate(['/zones']);
      })
      .catch(error => {
        console.log("signinKO", error);
        this.signinError = 'User/Password erróneo';
      });
      
  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}