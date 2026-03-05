import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { YathzeeDicesComponent } from '../yathzee-dices/yathzee-dices.component';
import { YathzeeGridComponent } from '../yathzee-grid/yathzee-grid.component';
import { Subscription } from 'rxjs';
import {YathzeeService} from '../../service/yathzee/yathzeeServices.service';
import {YathzeeGame} from '../../model/yathzee/YathzeeGame.model';
import {jwtDecode} from 'jwt-decode';
import {RouterLink} from '@angular/router';
import {YATHZEE_BONUS_LABELS} from '../../model/yathzee/YathzeeBonus.labels';

@Component({
  selector: 'app-yathzee-game',
  standalone: true,
  imports: [CommonModule, YathzeeDicesComponent, YathzeeGridComponent, RouterLink],
  templateUrl: './yathzee-game.component.html',
  styleUrls: ['./yathzee-game.component.scss']
})
export class YathzeeGameComponent implements OnInit, OnDestroy {
  @Input() id: string = "";
  game: YathzeeGame | null = null;
  private sseSub!: Subscription;

  constructor(private gameService: YathzeeService) {}

  ngOnInit() {
    this.gameService.getGame(this.id).subscribe(data => {
      this.initGame(data)
    });
    this.sseSub = this.gameService.subscribeToGameUpdates(this.id).subscribe({
      next: () => {
        this.gameService.getGame(this.id).subscribe(data => {
          this.initGame(data)
        });
      },
      error: (err) => console.error('SSE error', err)
    });
  }

  ngOnDestroy() {
    this.sseSub?.unsubscribe();
  }

  isActivePlayer(): boolean {
    let username = jwtDecode(<string>localStorage.getItem("authToken"))
    return this.game?.activePlayer?.user.username === username.sub;
  }

  chooseBonus(bonusIndex: number) {
    if (!this.game) return;
    this.gameService.chooseBonus(this.game.id, bonusIndex).subscribe({
      next: () => {
        this.gameService.getGame(this.id).subscribe(data => {
          this.initGame(data)
        });
      },
      error: (err) => console.error('Erreur chooseBonus', err)
    });
  }

  onDicesRolled(newDices: number[]) {
    if (this.game) {
      this.game.dices = newDices;
      this.gameService.getGame(this.id).subscribe(data => {
        this.initGame(data)
      });
    }
  }

  getWinners() {
    if (!this.game?.players) return [];
    const maxScore = Math.max(...this.game.players.map(p => p.score));
    return this.game.players.filter(p => p.score === maxScore);
  }

  initGame(data: YathzeeGame) {
    this.game = data;
    this.game.bonusPreviews = this.game.bonusPreviews.map(preview => ({
      ...preview,
      label: YATHZEE_BONUS_LABELS[preview.bonusName]
    }));
  }
}
