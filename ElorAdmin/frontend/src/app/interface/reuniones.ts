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

export enum EstadoReunionEn {
  Pending = 'pending',
  Accepted = 'accepted',
  Denied = 'denied',
  Conflict = 'conflict'
}

export interface Reunion {
  id_reunion?: number;
  estado?: string; 
  estado_es? : EstadoReunion;
  estado_eus?: EstadoReunionEus;
  estado_en?: EstadoReunionEn;
  profesor_id?: number;
  alumno_id?: number;
  id_centro?: string;
  titulo?: string;
  asunto?: string;
  aula?: string;
  fecha?: string;
}

