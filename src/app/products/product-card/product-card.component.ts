import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from './../../../shared/models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Output() favouriteAdded = new EventEmitter<Product>();
  @Input() product: Product;
  isFavourite = false;

  constructor() { }

  ngOnInit(): void {
  }

  addToFavourite(product: Product): void {
    this.isFavourite = true;
    this.favouriteAdded.emit(product);
  }

  removeFromFavourite(product: Product): void {
    this.isFavourite = false;
    this.favouriteAdded.emit(product);
  }
}
