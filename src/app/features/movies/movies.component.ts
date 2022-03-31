import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormModel } from 'src/app/layout/dynamic-form/FormModel';
import { ApiEndpointService } from 'src/app/service/api-endpoint.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  public itemForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    year: new FormControl(''),
    image: new FormControl(''),
    file: new FormControl({ name: '', data: '' }),
  });

  public imageSelected = '';

  public itemField: FormModel[] = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'year', label: 'Year', type: 'number', min: 0, max: 2099 },
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
    const body = this.getMoviesBody();
    console.log('POST', body);
    this.api.postItem('movies', body).subscribe({
      complete: () => this.getItemList(),
      error: (err) => console.error(err),
    });
  }

  editItem(data: any) {
    console.log('PATCH', data);
    this.itemForm.patchValue({
      title: data.title,
      year: data.year,
    });
    this.openForm = true;
    this.editMode = true;
    this.currentItemId = data.movie_id;
  }

  deleteItem(id: string) {
    console.log('DELETE', id);
    this.api.deleteItem('movies', id).subscribe({
      complete: () => this.getItemList(),
      error: (err) => console.error(err),
    });
  }

  getItemList() {
    this.api.getItems('movies').subscribe({
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
      year: data.year,
      file: data.file,
    };
  }

  onSubmit() {
    const body = this.getMoviesBody();
    this.api.postItem('movies', body).subscribe({
      complete: () => {
        this.closeForm();
        this.getItemList();
      },
      error: (err) => console.error(err),
    });
  }

  onUpdateSubmit() {
    this.api
      .patchItem('movies', this.currentItemId, this.itemForm.value)
      .subscribe({
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
