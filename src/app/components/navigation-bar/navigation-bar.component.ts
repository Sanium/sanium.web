import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setDarkTheme } from '../../store/advert.actions';
import { StoreState } from 'src/app/models/StoreState';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  isDarkTheme: boolean;
  
  constructor(private store: Store<{store: StoreState}>) { }

  ngOnInit(): void {
    if(localStorage.getItem('isDarkTheme')) {
      this.isDarkTheme = (localStorage.getItem('isDarkTheme') === 'true');
    }
    else this.isDarkTheme = true;
    this.setTheme();
  }

  setTheme(){
    localStorage.setItem('isDarkTheme', (this.isDarkTheme).toString());
    this.store.dispatch(setDarkTheme({isDarkTheme: this.isDarkTheme}));
  }

  switchTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.setTheme();
  }

}
