import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MainService } from '../main.service';
import { SignService } from '../sign.service';
import { PageService } from '../page.service';
import { VisualService } from '../visual.service';
import { DateService } from '../date.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})

export class CaseComponent implements OnInit {

  caseId: any = '';
  case1: any[] = [];
  answNu: number = 0;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private mainService: MainService,
    private signService: SignService,
    private pageService: PageService,
    public visualService: VisualService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {

      this.caseId = params['id'];
      this.currentPage = params['page'];
      this.getCase1();

    });

  }

  getCase1(): void {

    const caseData = {
      caseId: this.caseId,
      userId: this.signService.getuid()
    };

    this.mainService.getCaseService(caseData)
      .subscribe({

        next: response => {
          console.log(response);
          this.case1 = response;
          this.case1.forEach(caseItem => {
            caseItem.case_text = this.bbCode(caseItem.case_text);
          });
          this.answNu = this.case1[0].answ_n;
        },
        error: error => {
          console.error('error:', error);
        }

      });

  }

  signed(): boolean {

    return this.signService.signed();
    
  }

  bbCode(bbcode: any): SafeHtml {

    const postImage = {
      regex: /\[img\](.*?)\[\/img\]/g,
      template: '<img src="$1" style="max-width: 100%;" alt="image">'
    };

    const postVideo = {
      regex: /\[youtube\](.*?)\[\/youtube\]/g,
      template: '<iframe width="100%" height="250" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    };

    const postQuote = {
      regex: /\[quote=([^\]]+)\]([^\[]+)\[\/quote\]/g,
      template: '<div class="quote"><div class="quoteHeader">Cita de <span class="quoteName">$1</span>:</div><div class="quoteText">$2</div></div>'
    };

    let post = bbcode;

    post = post.replace(postImage.regex, postImage.template);

    post = post.replace(postVideo.regex, postVideo.template);

    post = post.replace(postQuote.regex, postQuote.template);

    post = post.replace(/\n/g, '<br>');

    return this.sanitizer.bypassSecurityTrustHtml(post);

  }

  getIcon(userId: any): any {

    return "../../img/" + userId + ".gif" || "../../assets/user.svg";

  }

  getPageNumber(): number[] {

    this.totalPages = Math.max(Math.ceil(this.answNu / 15), 1);
    const pages: number[] = [];

    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }

    return pages;

  }

  goToPage(page: number): void {

    this.pageService.changePage(page);
    this.router.navigateByUrl(`/case/${this.caseId}/${page}`);

  }

  goBack(): void {

    this.router.navigateByUrl(`/zone/${this.case1[0].zone_id}/${1}`);

  }

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}