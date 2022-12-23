import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessageBoardPage } from './message-board.page';

describe('MessageBoardPage', () => {
  let component: MessageBoardPage;
  let fixture: ComponentFixture<MessageBoardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageBoardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBoardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
