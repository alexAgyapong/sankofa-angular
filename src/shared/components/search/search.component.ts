import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  categories = [{ name: 'Shirts', id: 1 }, { name: 'shoes', id: 2 }]
  isHandset$: Observable<boolean> = this.breakPointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  constructor(private fb: FormBuilder, private breakPointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.setupForm();
    this.searchForm.valueChanges.subscribe(input => console.log({ input }))
  }

  setupForm(): void {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      categoryId: ['']
    });
  }

}
