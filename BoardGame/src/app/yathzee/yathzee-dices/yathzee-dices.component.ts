import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {YathzeeService} from '../../service/yathzee/yathzeeServices.service';

@Component({
  selector: 'app-yathzee-dices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yathzee-dices.component.html',
  styleUrls: ['./yathzee-dices.component.scss']
})
export class YathzeeDicesComponent {
  @Input() dices: number[] = [];
  @Input() remainingRolls: number = 0;
  @Input() isActivePlayer: boolean = false;
  @Input() gameId!: number;

  @Output() dicesRolled = new EventEmitter<number[]>();

  selectedDices: number[] = [];
  isRolling = false;

  constructor(private gameService: YathzeeService) {}

  toggleDice(index: number) {
    if (!this.isActivePlayer) return;
    const i = this.selectedDices.indexOf(index);
    if (i >= 0) this.selectedDices.splice(i, 1);
    else this.selectedDices.push(index);
  }

  isSelected(index: number) {
    return this.selectedDices.includes(index);
  }

  hasSelectedDice() {
    return this.selectedDices.length > 0;
  }

  rollDices() {
    if (!this.isActivePlayer || this.remainingRolls === 0) return;

    this.isRolling = true;

    this.gameService.rollDices(this.gameId, this.selectedDices).subscribe({
      next: (newGame) => {
        setTimeout(() => {
          this.isRolling = false;
          this.dices = newGame.dices;
          this.selectedDices = [];
          this.dicesRolled.emit(this.dices);
        }, 600);
      },
      error: (err) => {
        this.isRolling = false;
        console.error('Erreur rollDices', err);
      }
    });
  }
}
