import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewsModalPage } from './news-modal.page';

describe('NewsModalPage', () => {
  let component: NewsModalPage;
  let fixture: ComponentFixture<NewsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
