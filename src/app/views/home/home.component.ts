import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Observable} from 'rxjs';
import {MedicalStaff} from '../../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() user: Observable<MedicalStaff>;

  constructor(public authService: AuthService) {
    this.user = authService.getUser;
    this.user.subscribe(res => {
      console.log(res);
    });
  }

  ngOnInit(): void {
  }

}
