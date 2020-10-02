import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Category, Product, Seller } from 'src/shared/models/product';
import { Brand, PriceRange } from './../../../../shared/models/product';
import { Router } from '@angular/router';

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
  filters: FilterParam;
  filterForm: FormGroup;

  @ViewChild('accordion') accordion: MatAccordion;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      categoryId: [''],
      brandId: ['']
    });

    this.filterForm.valueChanges.subscribe(input => console.log({ input })
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.accordion.openAll();
    });
  }

  getId(id: string, idType: string): void {
    // localStorage.removeItem('products'); // remove products from storage
    // const res = localStorage.getItem('products');
    // const products = JSON.parse(res) as Product[];
    // console.log({products}, 'in filter should be empty');

    switch (idType) {
      case 'category':
        if (this.categories.length === 1) { return; }
        this.filters = { ...this.filters, categoryId: id };
        break;
      case 'brand':
        this.filters = { ...this.filters, brandId: id };
        break;
      case 'seller':
        if (this.sellers.length === 1) { return; }
        this.filters = { ...this.filters, sellerId: id };
        break;
    }

    this.router.navigate(['/products'], { queryParams: this.filters, queryParamsHandling: 'merge' });
    console.log('filters', this.filters);
  }

  resetFilters(): void {
    this.filters = { ...this.filters, categoryId: '', brandId: '', sellerId: '' };
    this.router.navigate(['/products'], { queryParams: { ...this.filters, start: '', page: 1 }, queryParamsHandling: 'merge' });
    console.log('filters cleared', this.filters);
  }
}

interface FilterParam {
  categoryId?: string;
  brandId?: string;
  sellerId?: string;
}