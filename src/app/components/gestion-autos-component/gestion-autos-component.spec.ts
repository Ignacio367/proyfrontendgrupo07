import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAutosComponent } from './gestion-autos-component';

describe('GestionAutosComponent', () => {
  let component: GestionAutosComponent;
  let fixture: ComponentFixture<GestionAutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAutosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionAutosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
