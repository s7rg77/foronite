import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { MainService } from '../main.service';
import { SignService } from '../sign.service';
import { PageService } from '../page.service';
import { VisualService } from '../visual.service';
import { DateService } from '../date.service';

import { NewpostComponent } from '../newpost/newpost.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})

export class PostsComponent implements OnInit {

  @ViewChild(NewpostComponent) newpostcomponent!: NewpostComponent;

  @Input() caseId: any = '';
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  posts: any[] = [];

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

      this.currentPage = params['page'];
      this.getPosts();

    });

  }

  getPosts(): void {

    const postData = {
      caseId: this.caseId,
      userId: this.signService.getuid(),
      page: this.currentPage
    };

    this.mainService.getPostsService(postData)
      .subscribe({

        next: response => {
          console.log(response);
          this.posts = Array.isArray(response) ? response : [];
          this.posts.forEach(post => {
            post.post_text = this.bbCode(post.post_text);
          });

        },
        error: error => {
          console.error('error:', error);
        }

      });

  }

  signed(): boolean {

    return this.signService.signed();
    
  }

  goToLastPage(): void {

    this.getPosts();
    this.pageService.changePage(this.totalPages);
    this.router.navigateByUrl(`/case/${this.caseId}/${this.totalPages}`);

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

  get nightmode(): boolean {
    return this.visualService.getNightMode();
  }

}