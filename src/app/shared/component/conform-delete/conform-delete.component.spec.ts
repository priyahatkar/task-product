import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformDeleteComponent } from './conform-delete.component';

describe('ConformDeleteComponent', () => {
  let component: ConformDeleteComponent;
  let fixture: ComponentFixture<ConformDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConformDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
