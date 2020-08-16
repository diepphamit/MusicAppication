import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsAlbumComponent } from './songs-album.component';

describe('SongsAlbumComponent', () => {
  let component: SongsAlbumComponent;
  let fixture: ComponentFixture<SongsAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
