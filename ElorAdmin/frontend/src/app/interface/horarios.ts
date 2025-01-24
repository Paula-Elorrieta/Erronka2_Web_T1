export enum Dia {
  LA = 'L/A',
  MA = 'M/A',
  X = 'X',
  JO = 'J/O',
  VO = 'V/O'
}

export enum Hora {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',

}

export interface Horario {
  dia: Dia;
  hora: Hora;
  profe_id: number;
  modulo_izena_es: string;
  modulo_izena_eu: string;
  modulo_izena_en: string;
}
