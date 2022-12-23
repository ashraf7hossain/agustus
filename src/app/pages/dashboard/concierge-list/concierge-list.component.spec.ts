import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConciergeListComponent } from './concierge-list.component';

describe('ConciergeListComponent', () => {
  let component: ConciergeListComponent;
  let fixture: ComponentFixture<ConciergeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciergeListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConciergeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
