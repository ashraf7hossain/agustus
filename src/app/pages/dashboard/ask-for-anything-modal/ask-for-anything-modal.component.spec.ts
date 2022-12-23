import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AskForAnythingModalComponent } from './ask-for-anything-modal.component';

describe('AskForAnythingModalComponent', () => {
  let component: AskForAnythingModalComponent;
  let fixture: ComponentFixture<AskForAnythingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskForAnythingModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AskForAnythingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
