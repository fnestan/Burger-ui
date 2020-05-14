import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../interfaces/user';
import {IngredientService} from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-creation',
  templateUrl: './ingredient-creation.component.html',
  styleUrls: ['./ingredient-creation.component.scss']
})
export class IngredientCreationComponent implements OnInit {

  list: any[];

  /**
   * Si le formulaire est soumis
   */
  isSubmitted: boolean = false;

  /**
   * Si les données du formulaire sont en cours d'enregistrement
   */
  isLoading: boolean = false;

  form: FormGroup;

  constructor(private ingredientService: IngredientService,
              public ngxSmartModalService: NgxSmartModalService,
              private formBuilder: FormBuilder,
              private toastrService: ToastrService) {
    this.form = formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  createForward() {
    this.isSubmitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      const token = user.token;
      this.isLoading = true;
      this.ingredientService.createIngredient(token, this.form.value).subscribe(() => {
        this.isLoading = false;
        this.form.reset();
        this.close();
        this.toastrService.success('Ca marche CASSE TOI', 'tu es nul');
      });
    }
  }

  close(): void {
    this.ngxSmartModalService.close('ingredient');
  }
}
