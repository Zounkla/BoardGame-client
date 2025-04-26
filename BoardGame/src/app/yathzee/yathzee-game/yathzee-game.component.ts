import { Component, Input, OnInit } from '@angular/core';
import { YathzeeDicesComponent } from '../yathzee-dices/yathzee-dices.component';
import { YathzeeGame } from '../../model/yathzee/YathzeeGame.model';
import { YathzeeService } from '../../service/yathzee/yathzeeServices.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-yathzee-game',
  imports: [YathzeeDicesComponent],
  templateUrl: './yathzee-game.component.html',
  styleUrl: './yathzee-game.component.scss'
})
export class YathzeeGameComponent implements OnInit {
  @Input() id: string = "";
  yathzeeGame: YathzeeGame | null = null;

  constructor(private service: YathzeeService, private router: Router){}

  ngOnInit(): void {
    this.service.getGame(this.id).subscribe(data => this.yathzeeGame = data);
  }
}
