import { Component, OnInit, Input } from '@angular/core';
import { Menu } from '../models/menu';

@Component({
  selector: 'menu-filter',
  templateUrl: './menu-filter.component.html',
  styleUrls: ['./menu-filter.component.css']
})
export class MenuFilterComponent {
  @Input('menu') menu;
  @Input('menuCategory') menuCategory: Menu;

  constructor() { }
}
