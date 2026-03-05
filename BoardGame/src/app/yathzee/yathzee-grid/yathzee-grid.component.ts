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

  readonly SIMPLE_LIMIT = 63;
  readonly SIMPLE_BONUS = 35;
  readonly SIMPLE_BONUS_INDEX_MAX = 5;

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

  getSimpleSum(player: any): number {
    return player.bonuses
      .filter((b: any) => {
        const idx = this.bonusPreviews.findIndex(p => p.bonusName === b.bonusName);
        return idx >= 0 && idx <= this.SIMPLE_BONUS_INDEX_MAX;
      })
      .reduce((sum: number, b: any) => sum + b.score, 0);
  }

  hasSimpleBonus(player: any): boolean {
    return player.bonuses.some((b: any) => b.bonusName === 'SIMPLE_SUM_BONUS');
  }

  getSimpleBonusLabel(player: any): string {
    if (this.hasSimpleBonus(player)) return `${this.SIMPLE_BONUS}`;
    const remaining = this.SIMPLE_LIMIT - this.getSimpleSum(player);
    return `-  ${remaining}`;
  }
}
