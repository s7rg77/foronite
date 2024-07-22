import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VisualService } from './visual.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('VisualService', () => {
  let service: VisualService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(VisualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
