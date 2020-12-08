import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() navigatedOut: EventEmitter<void> = new EventEmitter();
  @Output() logout: EventEmitter<void> = new EventEmitter();
  @Input() authState: Observable<User>;
  @Input() user: Observable<User>;


  public sideNavButtons = [
    { label: 'home', path: '' },
    { label: 'profile', path: 'profile' },
    { label: 'register Patient', path: 'registerPatient' },
    { label: 'admit Patient', path: 'admitPatient' },
  ];

  constructor() { }

  ngOnInit(): void { }



  public onNavigateOut(): void {
    this.navigatedOut.emit();
  }

  public onLogout(): void {
    this.logout.emit();
  }
}
