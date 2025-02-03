import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reunion } from '../../interface/reuniones';
import { QueryService } from '../../services/query.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Button } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { MegamenuComponent } from '../../Components/megamenu/megamenu.component';
import { ArgazkiPipe } from '../../pipes/argazki.pipe';
import { Dgenrc, Dgenre, Dterr, Dtituc, Dtitue, Ikastetxeak } from '../../interface/ikastetzeak';
import * as mapboxgl from 'mapbox-gl';
import { User } from '../../interface/user';

@Component({
  selector: 'app-bileren-details',
  imports: [CommonModule,
      AvatarModule,
      AvatarGroupModule,
      ImageModule,
      ArgazkiPipe,
      Button,
      TranslateModule,
      MegamenuComponent,],
  templateUrl: './bileren-details.component.html',
  styleUrl: './bileren-details.component.css',
})
export class BilerenDetailsComponent implements OnInit {
  token = 'pk.eyJ1IjoiaXR6aS1hciIsImEiOiJjbTR0cnJvbmgwOG1xMmpyOXphYnk2YXA3In0.nvbObADvRjZvchA9t_gJog';
  id: string = '';
  reunion: Reunion = {};
  irakasle: string = '';
  ikasle: string = '';
  Ikastetxea: Ikastetxeak = {
    CCEN: 0,
    NOM: '',
    NOME: '',
    DGENRC: Dgenrc.Caapd,
    DGENRE: Dgenre.Agde,
    GENR: 0,
    MUNI: 0,
    DMUNIC: '',
    DMUNIE: '',
    DTERRC: Dterr.ArabaÁlava,
    DTERRE: Dterr.ArabaÁlava,
    DEPE: '',
    DTITUC: Dtituc.DepartEducación,
    DTITUE: Dtitue.BestePublikoak,
    DOMI: '',
    CPOS: 0,
    TEL1: 0,
    TFAX: 0,
    EMAIL: '',
    PAGINA: '',
    COOR_X: '',
    COOR_Y: '',
    LATITUD: 0,
    LONGITUD: 0
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private queryS: QueryService
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.queryS.getReunion(this.id).subscribe (
      (response) => {
        console.log('Bilera lortu da:', response);
        if (response) {
          this.reunion = response;

          this.queryS.getErabiltzailea(this.reunion.alumno_id!.toString()).subscribe(
            (user) => {
              this.ikasle = user ? user.nombre! : '';
            },
            (error) => {
              console.error('Errorea ikaslea kargatzean:', error);
              this.ikasle = '';
            }
          );

          this.queryS.getErabiltzailea(this.reunion.profesor_id!.toString()).subscribe(
            (user) => {
              this.irakasle = user ? user.nombre! : '';
            },
            (error) => {
              console.error('Errorea irakaslea kargatzean:', error);
              this.irakasle = '';
            }
          );

          this.Ikastetxea = this.queryS.getIkastetxea(this.reunion.id_centro?.toString() || '') || {};



          // HEY, BIHURKETA HEMEN DAGO!!!! MEZEDEZ 0,3 gehiago...
          const { lat, lng } = this.utmToLatLng(Number(this.Ikastetxea.COOR_X), Number(this.Ikastetxea.COOR_Y), 30);
          // Hor zegoen bihurketa...



          this.mapaHasi(lng, lat);
        } else {
          alert('Bilera ez da existitzen');
        }
      },
      (error) => {
        console.error('Errorea bilera kargatzean:', error);
      }
    );
  }

  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';

  mapaHasi(lng: number, lat: number): void {
    this.map = new mapboxgl.Map({
      accessToken: this.token,
      container: 'mapa',
      style: this.style,
      zoom: 13,
      center: [lng, lat],
    });

    this.addMarkerWithText(lat, lng, this.Ikastetxea.NOM, this.Ikastetxea.DOMI);
  }

  // El problema solo es el marker, el mapa se muestra correctamente
  addMarkerWithText(lat: number, lng: number, ikastetzea: string = 'Ikastetzea', kokapena: string = 'Kokapena'): void {
    if (!this.map) return;

    //const markerElement = document.createElement('div');
    //markerElement.className = 'custom-marker';
    //markerElement.innerHTML = ``;

    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 0 })
          .setHTML('<span>${ikastetzea}<br><small>${kokapena}</small></span>'))
      .addTo(this.map);
  }

  atzera() {
    window.history.back();
  }


  // NO TOCAR ESTA FUNCIÓN, ESTO FUNCIONA Y DA MUCHO PUNTICO
  utmToLatLng(x: number, y: number, zone: number, hemisphere: string = 'N'): { lat: number, lng: number } {
    const a = 6378137.0;
    const f = 1 / 298.257223563;
    const k0 = 0.9996;

    const e = Math.sqrt(f * (2 - f));
    const e1sq = e * e / (1 - e * e);
    const n = f / (2 - f);
    const lambda0 = ((zone - 1) * 6 - 180 + 3) * (Math.PI / 180);

    const xAdj = x - 500000.0;
    let yAdj = y;
    if (hemisphere === 'S') {
      yAdj -= 10000000.0;
    }

    const m = yAdj / k0;
    const mu = m / (a * (1 - e * e / 4 - 3 * Math.pow(e, 4) / 64 - 5 * Math.pow(e, 6) / 256));

    const phi1Rad = mu + (3 * n / 2 - 27 * Math.pow(n, 3) / 32) * Math.sin(2 * mu) +
      (21 * Math.pow(n, 2) / 16 - 55 * Math.pow(n, 4) / 32) * Math.sin(4 * mu) +
      (151 * Math.pow(n, 3) / 96) * Math.sin(6 * mu);

    const sinPhi1 = Math.sin(phi1Rad);
    const cosPhi1 = Math.cos(phi1Rad);
    const tanPhi1 = Math.tan(phi1Rad);

    const c1 = e1sq * Math.pow(cosPhi1, 2);
    const t1 = Math.pow(tanPhi1, 2);
    const n1 = a / Math.sqrt(1 - e * e * Math.pow(sinPhi1, 2));
    const r1 = (a * (1 - e * e)) / Math.pow(1 - e * e * Math.pow(sinPhi1, 2), 1.5);
    const d = xAdj / (n1 * k0);

    const latRad = phi1Rad - (n1 * tanPhi1 / r1) *
      (Math.pow(d, 2) / 2 -
      (5 + 3 * t1 + 10 * c1 - 4 * Math.pow(c1, 2) - 9 * e1sq) * Math.pow(d, 4) / 24 +
      (61 + 90 * t1 + 298 * c1 + 45 * Math.pow(t1, 2) - 252 * e1sq - 3 * Math.pow(c1, 2)) * Math.pow(d, 6) / 720);

    const lngRad = lambda0 +
      (d -
      (1 + 2 * t1 + c1) * Math.pow(d, 3) / 6 +
      (5 - 2 * c1 + 28 * t1 - 3 * Math.pow(c1, 2) + 8 * e1sq + 24 * Math.pow(t1, 2)) * Math.pow(d, 5) / 120) / cosPhi1;

    const lat = latRad * (180 / Math.PI);
    const lng = lngRad * (180 / Math.PI);

    return { lat, lng };
  }
}
