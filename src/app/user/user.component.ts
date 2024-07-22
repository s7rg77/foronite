import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { MainService } from '../main.service';
import { SignService } from '../sign.service';
import { VisualService } from '../visual.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

  userId: any = '';
  user: any[] = [];
  dataForm: FormGroup;
  imageForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private location: Location,
    private mainService: MainService,
    private signService: SignService,
    public visualService: VisualService,
    public dateService: DateService
  ) {
    this.dataForm = new FormGroup({
      userSign: new FormControl('', Validators.maxLength(50))
    });
    this.imageForm = new FormGroup({
      userIcon: new FormControl()
    });
  }

  ngOnInit(): void {

    this.userId = this.signService.getuid();
    this.getUser();

  }

  getUser(): void {

    this.mainService.getUserService(this.userId)
      .subscribe({

        next: response => {
          console.log(response);
          this.user = response;
        },
        error: error => {
          console.error('getUserError01', error);
        }

      });

  }

  editUser(): void {

    const userId = this.userId;
    const formData = this.dataForm.value;

    if (this.dataForm.valid) {

      formData.userId = userId;

      this.mainService.editUserService(formData)
        .subscribe({

          next: response => {
            console.log(response);
            this.dataForm.reset();
            this.getUser();
          },
          error: error => {
            console.error('editUserError01', error);
          }

        });

    } else {
      console.error('editUserError02');
    }

  }

  editIcon(): void {

    this.submitted = true;

    const fileInput: any = document.getElementById('userIcon');
    const file = fileInput.files[0];
    const validation = this.validateIcon(file);

    if (validation !== null) {
      this.imageForm.get('userIcon')?.setErrors(validation);
      console.error('editIconError01', validation);
      return;
    }

    const formData = new FormData();

    formData.append('userId', this.userId);
    formData.append('file', file, file.name);

    this.mainService.editIconService(formData)
      .subscribe({

        next: response => {
          console.log(response);
          this.imageForm.reset();
          this.getUser();
        },
        error: error => {
          console.error('editIconError02', error);
        }

      });

  }

  validateIcon(file: File): any {

    const maxSize = 1024 * 1024;
    const allowedTypes = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'];

    if (file.size > maxSize) {
      return { 'validateIcon01': true };
    }

    if (!allowedTypes.includes(file.type)) {
      return { 'validateIcon02': true };
    }

    return null;

  }

  goBack(): void {

    this.location.back();

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}