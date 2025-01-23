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
        const buffer = erabiltzailea.argazkia.data;

        // Verifica que el buffer exista y sea válido
        if (Array.isArray(buffer) && buffer.length > 0) {
          const uint8Array = new Uint8Array(buffer);
          const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
          return `data:image/jpeg;base64,${binaryString}`;
        }
      }
    }
    return 'img/no-image.png';
  }

}
