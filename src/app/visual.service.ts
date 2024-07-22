import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VisualService {

  nightmode: boolean = false;
  storageKey = 'nightMode';

  constructor() {
    this.loadNightModeState();
  }

  loadNightModeState() {

    if (typeof localStorage !== 'undefined') {
    const nightmodestate = localStorage.getItem(this.storageKey);
    this.nightmode = nightmodestate ? JSON.parse(nightmodestate) : false;
    }

  }

  saveNightModeState() {

    if (typeof localStorage !== 'undefined') {
    localStorage.setItem(this.storageKey, JSON.stringify(this.nightmode));
    }

  }

  getNightMode(): boolean {

    return this.nightmode;

  }

  nightModeService() {

    this.nightmode = !this.nightmode;
    this.saveNightModeState();

  }

}