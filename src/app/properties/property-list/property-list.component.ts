import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/shared/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  searchParams: any;
  products$: Observable<any>;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchParams = params;
      this.getProducts(this.searchParams);
    });
  }

  getProducts(req?: any): void {
    this.products$ = this.productService.getProducts(req);
  }
}