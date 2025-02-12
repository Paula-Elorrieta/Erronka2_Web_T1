import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interface/user';

@Pipe({
  name: 'argazki',
  pure: true,
})
export class ArgazkiPipe implements PipeTransform {
  transform(erabiltzailea: User): string {

    if (
      erabiltzailea?.argazkia?.type === 'Buffer' &&
      Array.isArray(erabiltzailea.argazkia.data)
    ) {
      const uint8Array = new Uint8Array(erabiltzailea.argazkia.data);
      const binaryString = uint8Array.reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      );
      const base64String = btoa(binaryString)
      return `data:image/jpeg;base64,${base64String}`;
    }

    return 'img/no-image.png';
  }
}
