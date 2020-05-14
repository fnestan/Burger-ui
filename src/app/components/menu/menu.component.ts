import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../../services/menu.service';
import {Menu} from '../../interfaces/Menu';
import {TypeService} from '../../services/type.service';
import {ProductLine} from '../../interfaces/ProductLine';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuList: Menu[] = [];
  menu: Menu;
  nam: string;
  productLines;

  constructor(private route: ActivatedRoute, private menuService: MenuService, private service: TypeService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.getMenuById(id);
    } else {
      this.getAllMenu();
    }
  }

  getAllMenu(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    let token = null;
    if (user) {
      token = user.token;
    }
    this.menuService.getAllMenu(token).subscribe(data => {
      this.menuList = data;
    });
  }

  getMenuById(id: number): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    let token = null;
    if (user) {
      token = user.token;
    }
    this.menuService.getMenuById(id, token).subscribe(data => {
      this.menu = data;
      this.getProductName(null, this.menu.productLines);
    });
  }

  getProductName(token: string, lines: ProductLine[]): void {
    this.service.getAllTypes(token)
      .subscribe();

  }
}
