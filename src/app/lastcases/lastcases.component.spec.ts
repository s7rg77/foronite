import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LastcasesComponent } from './lastcases.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('LastcasesComponent', () => {
  let component: LastcasesComponent;
  let fixture: ComponentFixture<LastcasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [LastcasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastcasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
