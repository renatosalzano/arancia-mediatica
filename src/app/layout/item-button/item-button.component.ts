import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'item-button',
  templateUrl: './item-button.component.html',
  styleUrls: ['./item-button.component.scss'],
})
export class ItemButtonComponent implements OnInit {
  @Output() onDelete = new EventEmitter();
  @Output() onEdit = new EventEmitter();

  public showMenu = false;

  constructor() {}

  ngOnInit(): void {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  handleEdit() {
    this.toggleMenu();
    this.onEdit.emit();
  }
  handleDelete() {
    this.toggleMenu();
    this.onDelete.emit();
  }
}
