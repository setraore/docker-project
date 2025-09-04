import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sekou } from './sekou';

describe('Sekou', () => {
  let component: Sekou;
  let fixture: ComponentFixture<Sekou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sekou]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sekou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
