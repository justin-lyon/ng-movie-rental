import { SearchService } from './../../services/search.service';
import { FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchInput = new FormControl('');

  constructor(private searchService: SearchService) {}

  onClickSearch() {
    this.searchService
      .search('avengers')
      .then(movies => {
        console.log('movies', movies);
      })
      .catch(error => {
        console.error('error', error);
      });
  }
}
