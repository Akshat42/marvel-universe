import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicContainerComponent } from './comic-container.component';

describe('ComicContainerComponent', () => {
  let component: ComicContainerComponent;
  let fixture: ComponentFixture<ComicContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
