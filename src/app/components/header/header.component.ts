import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showMenu: boolean = false;
  @Input() total: number = 0;
  @Input() cantidad: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
