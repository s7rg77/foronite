import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MainService } from '../main.service';
import { SignService } from '../sign.service';
import { VisualService } from '../visual.service';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.scss'
})

export class ZonesComponent implements OnInit {

  name: any[] = [];
  zones: any[] = [];

  constructor(
    private router: Router,
    private mainService: MainService,
    private signService: SignService,
    public visualService: VisualService
  ) { }

  ngOnInit(): void {

    this.getZones();

  }

  getName(): void {

    const userId = this.signService.getuid();

    this.mainService.getNameService(userId)
      .subscribe({

        next: response => {
          console.log(response);
          this.name = response[0].user_name;
        },
        error: error => {
          console.error('error', error);
        }

      });

  }

  getZones(): void {

    this.mainService.getZonesService()
      .subscribe({

        next: response => {
          console.log(response);
          this.zones = response;
        },
        error: error => {
          console.error('error:', error);
        }

      });

  }

  signed(): boolean {

    return this.signService.signed();

  }

  navigateToZone(zone: any): void {

    this.router.navigateByUrl(`/zone/${zone.zone_id}/${1}`);
    
  }
  

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}