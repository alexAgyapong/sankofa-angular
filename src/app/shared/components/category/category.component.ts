import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ProductService } from 'src/shared/services/product.service';
import { Category } from 'src/shared/models/product';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories$: Observable<Category[]>;

  isHandset$: Observable<boolean> = this.breakPointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches), shareReplay());

  constructor(private fb: FormBuilder,
              private breakPointObserver: BreakpointObserver,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();
    this.setupForm();
    // this.categoryForm.valueChanges.subscribe(input => console.log({ input }));
  }

  setupForm(): void {
    this.categoryForm = this.fb.group({ categoryId: [''] });

    this.route.queryParams.subscribe(params => {
      this.categoryForm.patchValue(params);
    });
  }

  getCategories(): void {
    this.categories$ = this.productService.getCategories();
  }

  search(id: string, closeDialog = false): void {
    this.router.navigate(['/products'],
      {
        queryParams: {
          categoryId: id,
          page: '1', start: '',
          closeSidenav: true
        }
      });

    if (closeDialog) { this.dialog.closeAll(); }
  }


  showSubCategory(template: TemplateRef<any>, subCategories: Category[]): void {
    this.dialog.open(template, { data: subCategories, panelClass: ['sidenav-modal'] });
  }
}
