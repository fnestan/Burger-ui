import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {ForwardService} from '../../services/forward.service';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {MenuService} from '../../services/menu.service';
import {ProductLineService} from '../../services/product-line.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forward-creation',
  templateUrl: './forward-creation.component.html',
  styleUrls: ['./forward-creation.component.scss']
})
export class ForwardCreationComponent implements OnInit {

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

  constructor(private forwardService: ForwardService,
              public ngxSmartModalService: NgxSmartModalService,
              private menuService: MenuService,
              private productLineService: ProductLineService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
    this.form = formBuilder.group({
      description: ['', Validators.required],
      productLineId: [],
      menuId: []
    });
  }

  ngOnInit(): void {
  }

  /**
   * Change le nom de l'élement sur lequel appliquer la réduction
   * @param $event Évènement de sélection d'un bouton radio
   */
  applyForwardOn($event: any): void {
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
          }
        );
        break;
      default:
        this.element = {label: 'Menu', value: 'menu'};
        break;
    }
  }

  createForward() {
    this.isSubmitted = true;
    if (this.form.valid) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      this.isLoading = true;
      this.forwardService.createForward(token, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.form.reset();
        this.close();
        this.toastrService.success('Ca marche CASSE TOI', 'tu es nul');
      });
    }
  }

  close(): void {
    this.ngxSmartModalService.close('forward');
  }
}
