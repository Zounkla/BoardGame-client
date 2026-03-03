import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { YathzeeService } from '../service/yathzee/yathzeeServices.service';
import { YathzeeLobby } from '../model/yathzee/YathzeeLobby.model';
import { Subscription } from 'rxjs';
import {GameService} from '../service/yathzee/gameService';
import {YathzeeGame} from '../model/yathzee/YathzeeGame.model';

@Component({
  selector: 'app-yathzee-lobby-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './yathzee-lobby-detail.component.html',
  styleUrls: ['./yathzee-lobby-detail.component.scss']
})
export class YathzeeLobbyDetailComponent implements OnInit, OnDestroy {
  lobby!: YathzeeLobby;
  lobbyId!: number;
  private lobbySub!: Subscription;
  private gameSub!: Subscription;
  private gameId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: YathzeeService,
    private ngZone: NgZone,
    private gameService: GameService,
  ) {
  }

  ngOnInit() {
    this.lobbyId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameSub = this.gameService.currentGame$.subscribe(game => {
      if (game && game.id && !this.gameId) {
        this.gameId = game.id;
        this.router.navigate(['/yathzee/game', this.gameId]).then();
      }
    });

    this.loadLobby();
    this.subscribeToLobbyUpdates();
  }

  ngOnDestroy() {
    this.lobbySub?.unsubscribe();
    this.gameSub?.unsubscribe();
  }

  subscribeToLobbyUpdates() {
    this.lobbySub = this.service.subscribeToLobbyUpdates(this.lobbyId)
      .subscribe(updatedLobby => {
        this.ngZone.run(() => {
          this.lobby = updatedLobby;
          if (updatedLobby.game.id ) {
            this.gameService.setCurrentGame({ id: updatedLobby.game.id } as YathzeeGame);
          }
        });
      });
  }

  loadLobby() {
    this.service.getLobby(this.lobbyId).subscribe(lobby => this.lobby = lobby);
  }

  join() {
    if (this.lobby.players.length >= this.lobby.maxPlayers) {
      alert('Lobby is full!');
      return;
    }
    this.service.joinLobby(this.lobbyId).subscribe({
      next: () => {
      },
      error: err => alert(err.error?.message || err.message)
    });
  }

  start() {
    if (this.lobby.players.length < 2) {
      alert('Minimum 2 players required!');
      return;
    }
    this.service.startGame(this.lobbyId).subscribe({
      next: game => {
        this.gameService.setCurrentGame(game);
      },
      error: err => alert(err.error?.message || err.message)
    });
  }
}
