import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApiKeyComponent } from './get-api-key.component';

describe('GetApiKeyComponent', () => {
  let component: GetApiKeyComponent;
  let fixture: ComponentFixture<GetApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetApiKeyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
