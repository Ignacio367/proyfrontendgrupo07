import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogosAutosComponent } from './catalogos-autos-component';

describe('CatalogosAutosComponent', () => {
  let component: CatalogosAutosComponent;
  let fixture: ComponentFixture<CatalogosAutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogosAutosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogosAutosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
