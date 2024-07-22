import { Component, Input, OnInit } from '@angular/core';

import { MainService } from '../main.service';
import { SignService } from '../sign.service';

@Component({
  selector: 'app-postlikes',
  templateUrl: './postlikes.component.html',
  styleUrl: './postlikes.component.scss'
})

export class PostlikesComponent implements OnInit {

  @Input() postId: any;
  @Input() likeNu: number = 0;
  @Input() dislNu: number = 0;
  @Input() likeType: number = 0;

  liked: boolean = false;
  disliked: boolean = false;

  constructor(
    private mainService: MainService,
    private signService: SignService
  ) { }

  ngOnInit(): void {

    if (this.likeType == 1) {
      this.liked = true;
    } else if (this.likeType == 2) {
      this.disliked = true;
    }
    
  }

  newPostLike(likeType: number): void {

    if ((likeType == 1 && this.liked) || (likeType == 2 && this.disliked)) {
      return;
    }

    if (likeType == 1) {
      this.liked = true;
      this.disliked = false;
      this.likeNu++;

      if (this.dislNu > 0) {
        this.dislNu--;
      }

    } else if (likeType == 2) {
      this.disliked = true;
      this.liked = false;
      this.dislNu++;

      if (this.likeNu > 0) {
        this.likeNu--;
      }
    }

    const likeData = {
      postId: this.postId,
      userId: this.signService.getuid(),
      likeType: likeType
    };

    this.mainService.newPostLikeService(likeData)
      .subscribe({

        next: response => {
          console.log(response);
        },
        error: error => {
          console.error('error:', error);
        }

      });

  }

}