import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DiscountService} from '../../services/discount.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {MenuService} from '../../services/menu.service';
import {ProductLineService} from '../../services/product-line.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-discount-creation',
  templateUrl: './discount-creation.component.html',
  styleUrls: ['./discount-creation.component.scss']
})
export class DiscountCreationComponent implements OnInit {

  list: any[];
  /**
   * Nom de l'élément sur lequel appliquer la réduction
   */
  element: { label: string, value: string };

  /**
   * Si le formulaire est soumis
   */
  isSubmitted: boolean = false;

  /**
   * Si les données du formulaire sont en cours d'enregistrement
   */
  isLoading: boolean = false;

  form: FormGroup;

  constructor(private discountService: DiscountService,
              public ngxSmartModalService: NgxSmartModalService,
              private menuService: MenuService,
              private productLineService: ProductLineService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
    this.form = formBuilder.group({
      discountPrice: ['', Validators.required],
      productLineId: [],
      menuId: [],
    });
  }

  ngOnInit(): void {
    this.element = {label: 'Menu', value: 'menu'};
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    this.menuService.getAllMenu(token).subscribe(data => {
      this.list = data;
    });
  }

  /**
   * Change le nom de l'élement sur lequel appliquer la réduction
   * @param $event Évènement de sélection d'un bouton radio
   */
  applyDiscountOn($event: any): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    switch ($event.target.value) {
      case 'menu':
        this.element = {label: 'Menu', value: 'menu'};
        this.menuService.getAllMenu(token).subscribe(data => {
          this.list = data;
        });
        break;
      case 'productLine':
        this.element = {label: 'Ligne de produit', value: 'productLine'};
        this.productLineService.getAllProductLine(token).subscribe(data => {
          this.list = data;
        });
        break;
      default:
        this.element = {label: 'Menu', value: 'menu'};
        break;
    }
  }

  createDiscount() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      this.isLoading = true;
      this.discountService.createDiscount(token, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.form.reset();
        this.close();
        this.toastrService.success('Ca marche CASSE TOI',  'tu es nul');
      });
    }
  }

  close(): void {
    this.ngxSmartModalService.close('discount');
  }
}
