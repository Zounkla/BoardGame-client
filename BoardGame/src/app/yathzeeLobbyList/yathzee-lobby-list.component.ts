import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { YathzeeLobby } from '../model/yathzee/YathzeeLobby.model';
import { YathzeeService } from '../service/yathzee/yathzeeServices.service';

@Component({
  selector: 'app-yathzee-lobby-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './yathzee-lobby-list.component.html',
  styleUrls: ['./yathzee-lobby-list.component.scss']
})
export class YathzeeLobbyListComponent implements OnInit {

  lobbies: YathzeeLobby[] = [];
  lobbyName: string = '';
  maxPlayers: number = 4;

  constructor(private service: YathzeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadLobbies();
  }

  loadLobbies(): void {
    this.service.getAvailableLobbies().subscribe(lobbies => this.lobbies = lobbies);
  }

  createLobby(): void {
    if (!this.lobbyName.trim()) return;
    this.service.createLobby(this.lobbyName, this.maxPlayers)
      .subscribe(lobby => this.router.navigate(['/yathzee/lobby', lobby.id]));
  }

  joinLobby(id: number): void {
    this.router.navigate(['/yathzee/lobby', id]);
  }
}
