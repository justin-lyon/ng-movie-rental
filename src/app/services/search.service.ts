import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private router: Router) {}

  search(term: string): Promise<boolean> {
    return this.router.navigate(['search'], {
      queryParams: { term }
    });
  }
}
