import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {YathzeeBonusPreview} from '../../model/yathzee/YathzeeBonusPreview.model';
import {YathzeePlayer} from '../../model/yathzee/YathzeePlayer.model';

@Component({
  selector: 'app-yathzee-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yathzee-grid.component.html',
  styleUrls: ['./yathzee-grid.component.scss']
})
export class YathzeeGridComponent {
  @Input() bonusPreviews: YathzeeBonusPreview[] = [];
  @Input() players: YathzeePlayer[] = [];
  @Input() isActivePlayer: boolean = false;
  @Input() gameId!: number;

  @Output() chooseBonus = new EventEmitter<number>();

  onChooseBonus(index: number) {
    if (!this.isActivePlayer) return;
    this.chooseBonus.emit(index);
  }

  getPlayerScore(player: any, bonusIndex: number): number | null {

    const bonusName = this.bonusPreviews[bonusIndex].bonusName;

    const found = player.bonuses.find(
      (b: any) => b.bonusName === bonusName
    );

    return found ? found.score : null;
  }

  getTotal(player: any): number {
    return player.score ?? 0;
  }
}
