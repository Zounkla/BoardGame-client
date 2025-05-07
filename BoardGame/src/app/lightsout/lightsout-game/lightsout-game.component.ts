import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LightsoutGame} from '../../model/lightsout/LightsoutGame.model';
import {LightsoutService} from '../../service/lightsout/lightsout.service';

@Component({
  selector: 'app-lightsout-game',
  imports: [],
  templateUrl: './lightsout-game.component.html',
  styleUrl: './lightsout-game.component.scss'
})
export class LightsoutGameComponent implements OnInit {
  @Input() id: string = "";
  lightsoutGame: LightsoutGame | null = null;

  constructor(private service: LightsoutService, private router: Router){}
  ngOnInit(): void {
    this.service.getGame(this.id).subscribe(data => this.lightsoutGame = data);
  }

  onCellClick(x: number, y: number) {
    console.log(x, y);
    this.service.click(this.lightsoutGame!, x, y).subscribe(data => this.lightsoutGame = data);
  }
}
