import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<h1>CIAO CIAO</h1>
    <br />
    {{ prova_footer + prova_footer2 }}`,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  prova_footer: string = 'GigiWeb';
  prova_footer2: number = 81;
  constructor() {}

  ngOnInit(): void {}
}
