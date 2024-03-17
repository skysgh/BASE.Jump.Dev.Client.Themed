import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLayoutSidebarComponent } from './sidebar.component';

describe('BaseLayoutSidebarComponent', () => {
  let component: BaseLayoutSidebarComponent;
  let fixture: ComponentFixture<BaseLayoutSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseLayoutSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayoutSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
