import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiodataFormComponent } from './biodata-form.component';

describe('BiodataFormComponent', () => {
  let component: BiodataFormComponent;
  let fixture: ComponentFixture<BiodataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiodataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiodataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
