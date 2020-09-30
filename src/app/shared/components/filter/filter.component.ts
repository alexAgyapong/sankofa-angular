import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category, Seller } from 'src/shared/models/product';
import { Brand, PriceRange } from './../../../../shared/models/product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() categories: Category[] = [];
  @Input() brands: Brand[] = [];
  @Input() sellers: Seller[] = [];
  @Input() priceRanges: PriceRange[] = [];
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({

    })
  }

}
