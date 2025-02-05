import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

interface FallingItem {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDarkMode = false;
  fallingItems: FallingItem[] = [];

  private items = [
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', // Fruits
    '🥕', '🥦', '🥬', '🥒', '🍅', '🌶️', '🥑', // Vegetables
    '🥖', '🥨', '🥯', '🥐', '🍞', // Bread
    '🥩', '🍗', '🍖', '🌭', '🍔', // Food
    '🐉', // Dragon
    '🐱'  // Cat
  ];

  constructor(private themeService: ThemeService) {
    this.createFallingItems();
  }

  ngOnInit() {
    this.themeService.darkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }

  private createFallingItems() {
    // Create multiple instances of each item
    for (let i = 0; i < 30; i++) {
      const randomItem = this.items[Math.floor(Math.random() * (this.items.length - 2))]; // Exclude dragon and cat
      this.addFallingItem(randomItem);
    }
    
    // Add one dragon and one cat
    this.addFallingItem('🐉', true);
    this.addFallingItem('🐱', true);
  }

  private addFallingItem(emoji: string, isSpecial: boolean = false) {
    const item: FallingItem = {
      id: Math.random(),
      emoji: emoji,
      left: Math.random() * 100, // Random position from 0 to 100%
      duration: 3 + Math.random() * 4, // Random duration between 3-7 seconds
      delay: Math.random() * 2 // Random delay between 0-2 seconds
    };
    this.fallingItems.push(item);
  }
}