import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccesscasesComponent } from './accesscases.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('AccesscasesComponent', () => {
  let component: AccesscasesComponent;
  let fixture: ComponentFixture<AccesscasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AccesscasesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccesscasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
