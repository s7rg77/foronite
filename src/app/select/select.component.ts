import { Component } from '@angular/core';

import { VisualService } from '../visual.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})

export class SelectComponent {

  currentComponent: string = '';

  constructor(
    public visualService: VisualService
  ) { }

  showComponent(component: string) {

    this.currentComponent = component;

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}