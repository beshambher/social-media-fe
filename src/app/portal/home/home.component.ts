import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Constant } from 'src/app/core/services/constants/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public quote: string;
  public author: string;
  public loginOptions: any[];

  constructor(public authService: AuthService) {
    const quotes = [
      ['A true friend accepts who you are, but also helps you become who you should be.', 'Unknown'],
      ['A good friend knows all your stories. A best friend helped you create them.', 'Unknown'],
      ['A friend is someone who makes it easy to believe in yourself.', 'Heidi Wills'],
      ['Some people arrive and make such a beautiful impact on your life, you can barely remember what life was like without them.', 'Anna Taylor'],
      ['Many people will walk in and out of your life, but only true friends will leave footprints in your heart.', 'Eleanor Roosevelt'],
      ['Good friends are like stars, you don’t always see them, but you know they’re always there.', 'Unknown'],
      ['I knew when I met you an adventure was going to happen', 'Winnie The Pooh'],
      ['Friendship is born at that moment when one person says to another: ‘What! You too? I thought I was the only one.’', 'C.S. Lewis'],
      ['Truly great friends are hard to find, difficult to leave and impossible to forget.', 'Unknown'],
      ['Find a group of people who challenge and inspire you; spend a lot of time with them, and it will change your life.', 'Amy Poehler'],
      ['Nothing makes the earth seem so spacious as to have friends at a distance; they make the latitudes and longitudes.', 'Henry David Thoreau']
    ];

    const index = Math.floor(Math.random() * quotes.length);
    this.quote = quotes[index][0];
    this.author = quotes[index][1];

    this.loginOptions = Constant.loginOptions;
  }

  ngOnInit(): void {
  }

}
