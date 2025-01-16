import { Component } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-hizkuntza',
  imports: [SelectModule, FloatLabelModule, FormsModule, TranslateModule],
  standalone: true,
  templateUrl: './switch-hizkuntza.component.html',
  styleUrls: ['./switch-hizkuntza.component.css'],
})
export class SwitchHizkuntzaComponent {
  selected = 'eu';

  hizkuntzak = [
    { label: 'Euskara', value: 'eu' },
    { label: 'Castellano', value: 'es' },
    { label: 'Inglesa', value: 'en' },
  ];

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(this.selected);
    this.translateService.use(this.selected);
  }

  hizkuntzaAldatu(nuevaHizkuntza: string): void {
    this.selected = nuevaHizkuntza;
    this.translateService.use(this.selected);
  }
}
