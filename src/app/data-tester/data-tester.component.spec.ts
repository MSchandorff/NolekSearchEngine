import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTesterComponent } from './data-tester.component';

describe('DataTesterComponent', () => {
  let component: DataTesterComponent;
  let fixture: ComponentFixture<DataTesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTesterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
