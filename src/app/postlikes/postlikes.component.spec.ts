import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PostlikesComponent } from './postlikes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('LikesComponent', () => {
  let component: PostlikesComponent;
  let fixture: ComponentFixture<PostlikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [PostlikesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostlikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
