import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { YathzeeDicesComponent } from '../yathzee-dices/yathzee-dices.component';
import { YathzeeGame } from '../../model/yathzee/YathzeeGame.model';
import { YathzeeService } from '../../service/yathzee/yathzeeServices.service';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-yathzee-game',
  imports: [YathzeeDicesComponent],
  templateUrl: './yathzee-game.component.html',
  styleUrl: './yathzee-game.component.scss'
})
export class YathzeeGameComponent implements OnInit, OnDestroy {
  @Input() id: string = "";
  yathzeeGame: YathzeeGame | null = null;
  private gameUpdatesSubscription: Subscription | null = null;

  constructor(private service: YathzeeService, private router: Router){}

  ngOnInit(): void {
    this.service.getGame(this.id).subscribe({
      next: (data) => {
        this.yathzeeGame = data;
        this.listenForGameUpdates();
      },
      error: (err) => {
        console.error('Error loading game', err);
      }
    });
  }

  listenForGameUpdates() {
    this.gameUpdatesSubscription = this.service.subscribeToGameUpdates(this.id).subscribe({
      next: (updatedGame) => {
        this.yathzeeGame = updatedGame;
      },
      error: (err) => {
        console.error('Error receiving game updates', err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.gameUpdatesSubscription) {
      this.gameUpdatesSubscription.unsubscribe();
    }
  }
}
