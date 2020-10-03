import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProductService } from 'src/shared/services/product.service';
import { Category } from 'src/shared/models/product';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup;

  categories = [{ name: 'Shirts', id: 1 }, { name: 'shoes', id: 2 }];
  isHandset$: Observable<boolean> = this.breakPointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());
  categories$: Observable<Category[]>;

  constructor(private fb: FormBuilder,
              private breakPointObserver: BreakpointObserver,
              private productService: ProductService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
    this.setupForm();
    this.categoryForm.valueChanges.subscribe(input => console.log({ input }));
  }

  setupForm(): void {
    this.categoryForm = this.fb.group({categoryId: ['']});

    this.route.queryParams.subscribe(params => {
      this.categoryForm.patchValue(params);
    });
  }

  getCategories(): void {
    this.categories$ = this.productService.getCategories();
  }

  search(): void {
    this.router.navigate(['/products'],
      {
        queryParams: {
          ...this.categoryForm?.value,
          page: '1', start: ''
        }
      });
  }

}
