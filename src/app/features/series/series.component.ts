import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormModel } from 'src/app/layout/dynamic-form/FormModel';
import { ApiEndpointService } from 'src/app/service/api-endpoint.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent implements OnInit {
  public itemForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    provider_name: new FormControl('', [Validators.required]),
    provider_year: new FormControl(''),
    image: new FormControl(''),
    file: new FormControl({ name: '', data: '' }),
  });

  public imageSelected = '';

  public itemField: FormModel[] = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'author', label: 'Author', type: 'text' },
    { name: 'provider_name', label: 'Provider', type: 'text' },
    { name: 'provider_year', label: 'Year', type: 'number', min: 0, max: 2099 },
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
    this.api.postItem('tv-series', data).subscribe({
      complete: () => this.getItemList(),
      error: (err) => console.error(err),
    });
  }

  editItem(data: any) {
    console.log('PATCH', data);
    const { name, year } = data.streaming_provider;
    this.itemForm.patchValue({
      title: data.title,
      author: data.author,
      provider_name: name,
      provider_year: year,
    });
    this.openForm = true;
    this.editMode = true;
    this.currentItemId = data.tv_series_id;
  }

  deleteItem(id: string) {
    console.log('DELETE', id);
    this.api.deleteItem('tv-series', id).subscribe({
      complete: () => this.getItemList(),
      error: (err) => console.error(err),
    });
  }

  getItemList() {
    this.api.getItems('tv-series').subscribe({
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

  getMoviesBody() {
    const data = this.itemForm.value;
    return {
      title: data.title,
      author: data.author,
      streaming_provider: {
        name: data.provider_name,
        year: data.provider_year,
      },
      actors: [],
      file: data.file,
    };
  }

  onSubmit() {
    const body = this.getMoviesBody();
    this.api.postItem('tv-series', body).subscribe({
      complete: () => {
        this.closeForm();
        this.getItemList();
      },
      error: (err) => console.error(err),
    });
  }

  onUpdateSubmit() {
    const body = this.getMoviesBody();
    this.api.patchItem('tv-series', this.currentItemId, body).subscribe({
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
