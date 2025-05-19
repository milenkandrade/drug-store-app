import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAlertTableComponent } from './dynamic-alert-table.component';

describe('DynamicAlertTableComponent', () => {
  let component: DynamicAlertTableComponent;
  let fixture: ComponentFixture<DynamicAlertTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicAlertTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicAlertTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
