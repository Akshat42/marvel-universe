import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDataComponent } from './comic-data.component';

describe('ComicDataComponent', () => {
  let component: ComicDataComponent;
  let fixture: ComponentFixture<ComicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
