import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { Apollo } from 'apollo-angular';

import { Observable } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';

import { DialogComponent } from '../dialog/dialog.component';
import { AlbumService } from '../services/album.service';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class HomeComponent implements OnInit {
  itemsAsync: Observable<any[]>;
  albumAsync: Observable<any[]>;
  total: any;
  totalalbum;
  totalfs;
  showFirst;
  user = null;
  islogin = false;
  fsongsAsync: Observable<any[]>;
  

  constructor(config: NgbCarouselConfig, private songService: SongService, private apollo: Apollo, private albumService: AlbumService, public dialog: MatDialog) {

  }
  public activeElement = 0;
  public selectedItem(id) {
    this.activeElement = id;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getListSongs();
    this.getAllAlbums();
    // if (this.user._id !== null) {

    this.getFavoriteSongs('5f2905d08f14d320e83bd9f9');
    // }

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getListSongs() {
    this.itemsAsync = this.songService.getAllSongs(6, 0)
      .pipe(
        tap(respone => this.total = respone.data.songs.total),
        map(({ data }) => data.songs.songs)
      );

    // this.itemsAsync.subscribe(data => {
    //   console.log(data); console.log(this.total);

    // });

  }

  getAllAlbums() {
    this.albumAsync = this.albumService.getAllAlbums(4, 0)
      .pipe(
        tap(respone => this.total = respone.data.albums.total),
        map(({ data }) => data.albums.albums)
      );

    // this.albumAsync.subscribe(data => {
    //   console.log(data);
    //   console.log(this.total);
    // });


  }
  getListSongsPagination(number) {
    this.itemsAsync = this.songService.getAllSongs(6, number)
      .pipe(
        tap(respone => this.total = respone.data.songs.total),
        map(({ data }) => data.songs.songs)
      );

    // this.itemsAsync.subscribe(data => {
    //   console.log(data);
    // });
  }
  getFavoriteSongs(userId) {
    this.fsongsAsync = this.songService.getFavoriteSongByUserId(userId, 20, 0)
    .pipe(
      tap(reponse => this.totalfs = reponse.data.favoriteSongsByUser.total),
      map(({ data }) => data.favoriteSongsByUser.songs)
    );
    // this.fsongsAsync.subscribe(data => {
    //   console.log("=============");
    //   console.log(data);
    //   // console.log(this.totalfs);
    // });
    // chỗ ni hơi lạ, tại răng phải subcribe ra mới lấy dc dữ liệu. đkhông biết nữa
    // oke..để t test lại nghe. ok ok
    // hắn bị chạy bất đồng bộ á. nghĩa là đang chạy cái this.fsongsAsync = this.songService với chạy
    //thí.song.subscribe cùng 1 lúc á. nghĩa là nó chưa get dữ liệu add về mà đã chạy subride nên chỉ
    // có dữ liệu cũ.HIểu không á? ừm sơ sơ rồi fix răng :v..okeddeeer t coi..mấy hàm get ni đã chạy async rồi
    // mà subcribe ra chi.
    //vô lý thật sự :))
    //fix được cái bất đồng bộ khi nãy vhuwf để thêm 1 cái vô lý :))
    //lúc này là mi bị cái chỗ observable là nó chạy bất dồng bộ. còn subcribe là lện nó chờ cho đến 
    //khi nó thực hiện lện nớ xong mới chạy cái khác..nếu để subcribe là nó ra dc list vì m có câu lệnh
    //ngIf á..subcribe thì total > 0.. còn không có subcribe total đương nhiên < 0.
    //với lại t không hiểu tại sao fix rồi add vô rồi mà ren k ra dc..hơi vô lý chỗ ni...bởi nên m coi
    //cẩn thận dùng cái bất đồng bộ
    //push code lên t fix cho nhé..về máy t mới debug dể hơn
    //ok ok merge vô dev pk. đừng mer ừ// xem luôn cái

  }
  getarrayPageNumber(count) {
    return new Array(Math.ceil(count / 6));
  }
  addFavoriteSong(userId, songId) {
    this.songService.addFavoriteSongByUserId(userId, songId).subscribe(data => {
      console.log('Add favorite song successfully');
      //this.getFavoriteSongs('5f2905d08f14d320e83bd9f9');
      this.fsongsAsync = this.songService.getFavoriteSongByUserId('5f2905d08f14d320e83bd9f9', 20, 0)
    .pipe(
      tap(reponse => this.totalfs = reponse.data.favoriteSongsByUser.total),
      map(({ data }) => data.favoriteSongsByUser.songs)
    );
    });
   
  }
 

}


