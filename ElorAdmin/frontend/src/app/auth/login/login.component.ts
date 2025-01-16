import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SwitchHizkuntzaComponent } from '../../Components/switch-hizkuntza/switch-hizkuntza.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [TranslateModule, SwitchHizkuntzaComponent, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(
    private translateService: TranslateService,
    private authService: AuthService
  ) {
    this.translateService.setDefaultLang('eu');
    this.translateService.use('eu');
  }

  onLogin() {
    if (!this.username || !this.password) {
      alert('Username eta pasahitza behar dira');
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login ondo:', response);
        alert('Ongi etorri!');
        // Aquí puedes almacenar el objeto de usuario en el almacenamiento local o global
        localStorage.setItem('user', JSON.stringify(response.user));
      },
      (error) => {
        console.error('Errorea loginean:', error);
        alert('Erabiltzailea edo pasahitz okerra');
      }
    );
  }
}
