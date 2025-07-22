import { Component, signal, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('IIISUPAO');
  isDarkMode = false;

  constructor(private renderer: Renderer2) {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    const html = document.documentElement;

    if (this.isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }
}
