import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NewcaseComponent } from './newcase.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('NewcaseComponent', () => {
  let component: NewcaseComponent;
  let fixture: ComponentFixture<NewcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [NewcaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
