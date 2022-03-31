import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  @Input() thumbnail: string;
  @Input() year: number;
  @Input() description: string;
  @Input() actors: string[];
  @Input() object: { name: string; year: string };
  @Input() streaming_provider: { name: string; year: string };

  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter<string>();

  constructor() {}

  handleEdit() {
    this.onEdit.emit();
  }

  handleDelete() {
    this.onDelete.emit();
  }

  ngOnInit(): void {}
}
