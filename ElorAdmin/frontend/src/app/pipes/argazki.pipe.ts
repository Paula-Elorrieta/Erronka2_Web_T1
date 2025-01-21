import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interface/user';

@Pipe({
  name: 'argazki',
  pure: true,
})
export class ArgazkiPipe implements PipeTransform {
  transform(erabiltzailea: User): string {
    if (erabiltzailea.argazkia) {

      console.log('Argazkia:', erabiltzailea.argazkia);

      if (erabiltzailea.argazkia.type === 'Buffer') {
        const buffer = (erabiltzailea.argazkia as any).data;
        const base64String = this.bufferToBase64(buffer);
        
        return `data:image/png;base64,${base64String}`;
      }
     
      return 'img/no-image.png';
    } else {
      return 'img/no-image.png';  
    }
  }

  private bufferToBase64(buffer: number[]): string {
    const binary = String.fromCharCode.apply(null, buffer);
    return window.btoa(binary);  
  }
}
