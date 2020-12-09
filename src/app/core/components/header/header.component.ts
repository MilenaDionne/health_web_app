import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

import {MedicalStaff, User} from 'src/app/shared/models/user.model';
import {AuthService} from '../../services/auth.service';

interface SideNavButton {
  label: string;
  path: string;
  guards: string[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() navigatedOut: EventEmitter<void> = new EventEmitter();
  @Output() logout: EventEmitter<void> = new EventEmitter();
  @Input() authState: Observable<User>;
  @Input() user: Observable<MedicalStaff>;

  role = '';


  public sideNavButtons: SideNavButton[] = [
    { label: 'home', path: '', guards: ['chargeNurse'] },
    { label: 'profile', path: 'profile', guards: ['doctor'] },
    { label: 'register Patient', path: 'registerPatient', guards: ['chargeNurse'] },
    { label: 'update Patient', path: 'updatePatient', guards: ['chargeNurse'] },
    { label: 'consult Patient', path: 'consultPatient', guards: ['chargeNurse'] },
    { label: 'divisions', path: 'divisions', guards: ['chargeNurse']}
  ];

  constructor(public authService: AuthService) {
    this.user = authService.getUser;
  }

  ngOnInit(): void {
    console.log('ssss');
    this.user.subscribe(res => {
      this.role = res.role;
      this.getSideNavButtons();
    });
    //console.log(this.getSideNavButtons());
  }



  public onNavigateOut(): void {
    this.navigatedOut.emit();
  }

  public onLogout(): void {
    this.logout.emit();
  }

  public getSideNavButtons(): SideNavButton[]
  {
    console.log(this.role);
    let data: SideNavButton[] =[];
    for ( const button of this.sideNavButtons){
      const guards = button.guards;
      for ( const guard of guards){
        if (guard === this.role){
          console.log(guard);
          data.push(button);
          break;
        }
      }
    }
    return  data;
  }
}
