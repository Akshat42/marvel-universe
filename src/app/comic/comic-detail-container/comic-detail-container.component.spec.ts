import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDetailContainerComponent } from './comic-detail-container.component';

describe('ComicDetailContainerComponent', () => {
  let component: ComicDetailContainerComponent;
  let fixture: ComponentFixture<ComicDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicDetailContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
