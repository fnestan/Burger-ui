import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: any;
  error: any;

  constructor(private loginService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  login(): void {
    if (this.form.valid) {
      this.loginService.login(this.form.value).subscribe((data: any) => {
          this.user = data;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.router.navigate(['admin']);
        },
        error => this.error = error.error
      );
    }
  }
}
