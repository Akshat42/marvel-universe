import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicListContainerComponent } from './comic-list-container.component';

describe('ComicListContainerComponent', () => {
  let component: ComicListContainerComponent;
  let fixture: ComponentFixture<ComicListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicListContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
