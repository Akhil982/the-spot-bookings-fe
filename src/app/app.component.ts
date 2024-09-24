import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from './service/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'the-spot-bookings-fe';

  isLoading!: Observable<boolean>;

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.isLoading = this.loaderService.loading$;
  }
}
