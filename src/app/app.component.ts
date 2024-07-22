import { Component } from '@angular/core';

import { VisualService } from './visual.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'foronite';

  constructor(
    public visualService: VisualService
  ) { }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}