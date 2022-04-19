import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherScatterComponent } from './other-scatter.component';

describe('OtherScatterComponent', () => {
  let component: OtherScatterComponent;
  let fixture: ComponentFixture<OtherScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherScatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
