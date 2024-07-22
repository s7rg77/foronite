import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CaselikesComponent } from './caselikes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('CaselikesComponent', () => {
  let component: CaselikesComponent;
  let fixture: ComponentFixture<CaselikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CaselikesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaselikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
