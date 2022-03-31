import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { FormModel } from './FormModel';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  @Input() openForm = false;
  @Input() formGroup: FormGroup;
  @Input() fields: FormModel[];
  @Input() valuesChange$: any;
  @Input() editMode: boolean = false;

  @Output() onToggler = new EventEmitter();
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onUpdateSubmit = new EventEmitter<any>();

  @ViewChild('formRef', { static: false }) formRef: ElementRef;

  private submitted = false;
  public imageSelected = '';
  public buttonClass = 'control-button';

  constructor(private ref: ElementRef) {}

  ngOnInit(): void {}

  toggleForm() {
    this.openForm = !this.openForm;
  }

  clearImage() {
    if (this.imageSelected) this.imageSelected = '';
    this.formGroup.controls['file'].reset();
  }

  handleToggler() {
    if (this.submitted) this.submitted = false;
    this.clearImage();
    this.onToggler.emit();
  }

  setHeadClass() {
    if (this.openForm) return 'form-head close';
    else return 'form-head';
  }

  setButtonClass() {
    if (this.openForm) return 'control-button close';
    else return 'control-button';
  }

  setFormClass() {
    if (this.openForm) return 'dynamic-form open';
    else return 'dynamic-form';
  }

  setClassName(name: string) {
    let className = 'form-control';
    if (this.submitted && this.formGroup.get(name).errors?.['required'])
      className += ' alert-danger';
    return className;
  }

  isRequired(name: string) {
    return this.submitted && this.formGroup.get(name).errors?.['required'];
  }

  handleControlButton() {
    this.formGroup.reset();
    this.imageSelected = '';
    this.handleToggler();
  }

  deleteImage() {
    this.formGroup.controls['image'].reset();
    this.formGroup.controls['file'].reset();
    this.imageSelected = '';
  }

  submitHandler() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.onSubmit.emit();
      this.submitted = false;
      this.clearImage();
    }
  }

  updateItem() {
    this.submitted = true;
    if (this.formGroup.valid) {
      this.onUpdateSubmit.emit();
      this.submitted = false;
      this.clearImage();
    }
  }

  private imageFileControls = {
    max_size: 20971520,
    allowed_types: ['image/png', 'image/jpeg', 'image/jpg'],
    max_height: 15200,
    max_width: 25600,
  };

  onFileSelected(event) {
    console.log(event.type);
    const file: File = event.target.files[0];
    if (this.checkFile(file, 'image')) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        this.imageSelected = image.src;
        image.onload = (rs) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          const imgBase64Path = e.target.result;

          this.formGroup.patchValue({
            file: { name: file.name, data: imgBase64Path },
          });

          /* this.formControl.setValue({
              name: file.name,
              data: imgBase64Path
            });
          this.onFileSelectedEmitter.emit({
            name: file.name,
            data: imgBase64Path
          }); */
        };
      };
      reader.readAsDataURL(file);
    }
    // if (file) {
    //   const filename = file.name;
    //   const formData = new FormData();
    //   formData.append('file', file, filename);
    //   console.log('ON FILE SELECTED', file);
    //   file.arrayBuffer().then(
    //     arrayBuffer => {
    //       this.formControl.setValue({
    //         name: filename,
    //         data: new Blob([arrayBuffer], {type: file.type})
    //       });
    //       this.onFileSelectedEmitter.emit(formData);
    //     }
    //   )
    // }
  }

  private checkFile(file: File, fileType: string): boolean {
    switch (fileType) {
      case 'image':
        if (file.size > this.imageFileControls.max_size) {
          const imageError =
            'Maximum size allowed is ' +
            this.imageFileControls.max_size / 1000 +
            'Mb';

          return false;
        }

        if (!_.includes(this.imageFileControls.allowed_types, file.type)) {
          const imageError = 'Only Images are allowed ( JPG | PNG )';
          return false;
        }
        return true;

      default:
        return false;
    }
  }
}
