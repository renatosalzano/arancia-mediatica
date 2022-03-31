import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs';
import { FormModel } from 'src/app/layout/dynamic-form/FormModel';
import { ApiEndpointService } from 'src/app/service/api-endpoint.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  public test: any;

  constructor(public api: ApiEndpointService) {}

  public itemForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    year: new FormControl(''),
    image: new FormControl(''),
    file: new FormControl({ name: '', data: '' }),
    description: new FormControl(''),
  });

  public imageSelected = '';

  public itemField: FormModel[] = [
    { name: 'title', label: 'Titolo', type: 'text' },
    { name: 'author', label: 'Autore', type: 'text' },
    { name: 'year', label: 'Anno', type: 'number', min: 0, max: 2099 },
    { name: 'image', label: 'Copertina', type: 'file' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ];

  public itemList = [];
  public openForm = false;
  public editMode = false;
  private currentItemId = '';

  closeForm() {
    if (this.editMode && this.openForm) this.editMode = false;
    this.openForm = false;
    this.itemForm.reset();
  }

  getBookBody() {
    const data = this.itemForm.value;
    return {
      title: data.title,
      author: data.author,
      year: data.year,
      description: data.description,
      file: data.file,
    };
  }

  postBook(data: any) {
    const body = this.getBookBody();
    this.api.postItem('books', body).subscribe(() => {
      this.getBookList();
    });
  }

  editBook(data: any) {
    console.log('PATCH', data);

    this.itemForm.patchValue({
      title: data.title,
      author: data.author,
      year: data.year,
      description: data.description,
    });
    this.openForm = true;
    this.editMode = true;
    this.currentItemId = data.book_id;
  }

  deleteBook(id: string) {
    console.log('DELETE', id);
    this.api.deleteItem('books', id).subscribe({
      complete: () => this.getBookList(),
      error: (err) => console.error(err),
    });
  }

  getBookList() {
    this.api.getItems('books').subscribe({
      next: (res: any) => {
        console.log('BOOKS', res.items);
        if (res.items) this.itemList = [...res.items];
        else this.itemList = [];
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    this.getBookList();
  }

  onSubmit() {
    const body = this.getBookBody();
    console.log('SUBMIT', body);
    this.api.postItem('books', body).subscribe({
      complete: () => {
        this.closeForm();
        this.getBookList();
      },
      error: (err) => console.error(err),
    });
  }

  onUpdateSubmit() {
    const body = this.getBookBody();
    this.api.patchItem('books', this.currentItemId, body).subscribe({
      complete: () => {
        this.closeForm();
        this.getBookList();
      },
      error: (err) => console.error(err),
    });
  }

  toggleForm() {
    this.openForm = !this.openForm;
    if (this.editMode && this.openForm) this.editMode = false;
  }
}
