import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesPageComponent } from './entries-page.component';

describe('EntriesPageComponent', () => {
  let component: EntriesPageComponent;
  let fixture: ComponentFixture<EntriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntriesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
