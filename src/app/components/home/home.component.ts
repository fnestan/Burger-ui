import {Component, OnInit} from '@angular/core';
import {ForwardService} from '../../services/forward.service';
import {Forward} from '../../interfaces/Forward';
import {Product} from '../../interfaces/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  forwardList: Forward[] = [];
  prod: Product;

  constructor(private forwardService: ForwardService) {
  }

  ngOnInit(): void {
    this.getAllForwards();
  }

  getAllForwards(): void {
    this.forwardService.getAllForwerds().subscribe(data => {
      this.forwardList = data;
    });
  }

}
