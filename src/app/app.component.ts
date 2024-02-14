import {Component} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RouterModule} from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule],
  template: `
    <section class="content">
        <router-outlet></router-outlet>
      </section>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Autocode Generator';
}
