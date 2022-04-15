import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScatterComponent } from './my-scatter.component';

describe('MyScatterComponent', () => {
  let component: MyScatterComponent;
  let fixture: ComponentFixture<MyScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyScatterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
