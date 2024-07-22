import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SignService } from './sign.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('SignService', () => {
  let service: SignService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(SignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
