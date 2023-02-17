import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFlashcardsComponent } from './study-flashcards.component';

describe('StudyFlashcardsComponent', () => {
  let component: StudyFlashcardsComponent;
  let fixture: ComponentFixture<StudyFlashcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyFlashcardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
