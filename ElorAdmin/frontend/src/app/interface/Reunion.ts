export enum EstadoReunion {
  Pendiente = 'pendiente',
  Aceptada = 'aceptada',
  Denegada = 'denegada',
  Conflicto = 'conflicto'
}

export enum EstadoReunionEus {
  Onartzeke = 'onartzeke',
  Onartuta = 'onartuta',
  Ezeztatuta = 'ezeztatuta',
  Gatazka = 'gatazka'
}

export interface Reunion {
  id_reunion: number;
  estado: EstadoReunion;
  estado_eus: EstadoReunionEus;
  profesor_id: number;
  alumno_id: number;
  id_centro: string;
  titulo: string;
  asunto: string;
  aula: string;
  fecha: string;
}
