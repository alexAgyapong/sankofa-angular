import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Category, Seller } from 'src/shared/models/product';
import { Brand, PriceRange } from './../../../../shared/models/product';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @Input() categories: Category[] = [];
  @Input() brands: Brand[] = [];
  @Input() sellers: Seller[] = [];
  @Input() priceRanges: PriceRange[] = [];
  filterForm: FormGroup;

  @ViewChild('accordion') accordion: MatAccordion;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({

    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.accordion.openAll();
    });
  }

}
