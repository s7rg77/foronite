import { Component } from '@angular/core';

import { VisualService } from '../visual.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {

  constructor(
    public visualService: VisualService
  ) { }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}