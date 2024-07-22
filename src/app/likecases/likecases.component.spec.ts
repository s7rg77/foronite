import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LikecasesComponent } from './likecases.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('LikecasesComponent', () => {
  let component: LikecasesComponent;
  let fixture: ComponentFixture<LikecasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LikecasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikecasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
