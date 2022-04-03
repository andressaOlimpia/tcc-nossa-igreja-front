import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
 
})
export class AccessDeniedComponent implements OnInit {
  previousUrl: string ;
  currentUrl: string = null;
  previous:any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.getPreviuos();
  }

  getPreviuos(): string{
    this.router.events
    .pipe( filter(        (evt:any)=>evt instanceof RoutesRecognized),pairwise())
    .subscribe((events: RoutesRecognized[]) =>{  
      this.previousUrl=events[0].urlAfterRedirects;     
    }    );
    return this.previousUrl;
  }

}