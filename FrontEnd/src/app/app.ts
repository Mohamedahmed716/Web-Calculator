import { Component, signal } from '@angular/core';
import { Calculator } from "./components/calculator/calculator";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Calculator],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Web-Calculator');
}
