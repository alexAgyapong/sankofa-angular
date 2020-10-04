import { Component, TemplateRef, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  showCategories = false;
  subscription: Subscription;
  @ViewChild('drawer') sidenav: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(1)
    );

  constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      const flag = params?.closeSidenav as boolean;
      if (flag) {
        this.sidenav.opened = false;
        this.showCategories = false;
      }
      if (params?.term) {
        this.dialog.closeAll();
      }
    });
  }

  toggleFlag(): void {
    this.showCategories = !this.showCategories;
    console.log('clicked', this.showCategories);
  }

  showSearch(template: TemplateRef<any>): void {
    this.dialog.open(template, { panelClass: ['full-screen-modal'] });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.sidenav.close();
  }
}
