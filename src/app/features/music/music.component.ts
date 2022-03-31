import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormModel } from 'src/app/layout/dynamic-form/FormModel';
import { ApiEndpointService } from 'src/app/service/api-endpoint.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent implements OnInit {
  public itemForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    artist: new FormControl('', [Validators.required]),
    album_name: new FormControl('', [Validators.required]),
    album_year: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    file: new FormControl({ name: '', data: '' }),
  });

  public imageSelected = '';

  public itemField: FormModel[] = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'artist', label: 'Artist', type: 'text' },
    { name: 'album_name', label: 'Album', type: 'text' },
    { name: 'album_year', label: 'Year', type: 'number', min: 0, max: 2099 },
    { name: 'image', label: 'Cover', type: 'file' },
  ];

  constructor(private api: ApiEndpointService) {}

  public itemList = [];
  public openForm = false;
  public editMode = false;
  private currentItemId = '';

  closeForm() {
    if (this.editMode && this.openForm) this.editMode = false;
    this.openForm = false;
    this.itemForm.reset();
  }

  postItem(data: any) {
    this.api.postItem('music', data).subscribe({
      complete: () => this.getItemList(),
      error: (err) => console.error(err),
    });
  }

  editItem(data: any) {
    console.log('PATCH', data);
    const { name, year } = data.album;
    this.itemForm.patchValue({
      ...data,
      album_name: name,
      album_year: year,
    });
    this.openForm = true;
    this.editMode = true;
    this.currentItemId = data.music_id;
  }

  deleteItem(id: string) {
    console.log('DELETE', id);
    this.api.deleteItem('music', id).subscribe({
      complete: () => this.getItemList(),
      error: (err) => console.error(err),
    });
  }

  getItemList() {
    this.api.getItems('music').subscribe({
      next: (res: any) => {
        console.log('ITEMS', res.items);
        if (res.items) this.itemList = [...res.items];
        else this.itemList = [];
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    this.getItemList();
  }

  getMusicBody() {
    const data = this.itemForm.value;
    return {
      title: data.title,
      artist: data.artist,
      album: { name: data.album_name, year: data.album_year },
      file: data.file,
    };
  }

  onSubmit() {
    const body = this.getMusicBody();
    this.api.postItem('music', body).subscribe({
      complete: () => {
        this.closeForm();
        this.getItemList();
      },
      error: (err) => console.error(err),
    });
  }

  onUpdateSubmit() {
    const body = this.getMusicBody();
    console.log('UPDATE', this.currentItemId, body);
    this.api.patchItem('music', this.currentItemId, body).subscribe({
      complete: () => {
        this.closeForm();
        this.getItemList();
      },
      error: (err) => console.error(err),
    });
  }

  toggleForm() {
    this.openForm = !this.openForm;
    if (this.editMode && this.openForm) this.editMode = false;
  }
}
