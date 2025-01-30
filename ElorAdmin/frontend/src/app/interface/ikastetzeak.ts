export interface Ikastetxeak {
    CCEN:     number;
    NOM:      string;
    NOME:     string;
    DGENRC:   Dgenrc;
    DGENRE:   Dgenre;
    GENR:     GENREnum | number;
    MUNI:     number;
    DMUNIC:   string;
    DMUNIE:   string;
    DTERRC:   Dterr;
    DTERRE:   Dterr;
    DEPE:     number | string;
    DTITUC:   Dtituc;
    DTITUE:   Dtitue;
    DOMI:     string;
    CPOS:     number;
    TEL1:     number;
    TFAX:     Dgenrc | number;
    EMAIL:    string;
    PAGINA:   string;
    COOR_X:   number | string;
    COOR_Y:   number | string;
    LATITUD:  number;
    LONGITUD: number;
}

export enum Dgenrc {
    Caapd = "CAAPD",
    Caed = "CAED",
    Caem = "CAEM",
    Capm = "CAPM",
    Casdi = "CASDI",
    Casm = "CASM",
    Cee = "CEE",
    Ceip = "CEIP",
    Cepa = "CEPA",
    Cifp = "CIFP",
    Cpd = "CPD",
    Cpe = "CPE",
    Cped = "CPED",
    Cpee = "CPEE",
    Cpei = "CPEI",
    Cpeip = "CPEIP",
    Cpeips = "CPEIPS",
    Cpep = "CPEP",
    Cpepa = "CPEPA",
    Cpeps = "CPEPS",
    Cpes = "CPES",
    Cpfpb = "CPFPB",
    Cpi = "CPI",
    Cpifp = "CPIFP",
    Cpm = "CPM",
    Easd = "EASD",
    Eei = "EEI",
    Eic = "EIC",
    Eimu = "EIMU",
    Eipr = "EIPR",
    Empr = "EMPR",
    Empty = " ",
    Empu = "EMPU",
    Eoi = "EOI",
    Ies = "IES",
    Imfpb = "IMFPB",
}

export enum Dgenre {
    Agde = "AGDE",
    Aip = "AIP",
    Apdib = "APDIB",
    Bhi = "BHI",
    Bhip = "BHIP",
    Dkp = "DKP",
    Empty = " ",
    Gdiib = "GDIIB",
    Gmib = "GMIB",
    Hbi = "HBI",
    Hbip = "HBIP",
    Hehip = "HEHIP",
    Heo = "HEO",
    Hepr = "HEPR",
    Hhe = "HHE",
    Hhi = "HHI",
    Hhip = "HHIP",
    Hlbhip = "HLBHIP",
    Hlhi = "HLHI",
    Hlhip = "HLHIP",
    Ipi = "IPI",
    Kiib = "KIIB",
    Kiip = "KIIP",
    Lbhip = "LBHIP",
    Lhii = "LHII",
    Lhip = "LHIP",
    Lhipi = "LHIPI",
    Mepr = "MEPR",
    Mepu = "MEPU",
    Mibp = "MIBP",
    Mkp = "MKP",
    Olhip = "OLHIP",
    Olhui = "OLHUI",
    Omib = "OMIB",
    Phe = "PHE",
    Uhe = "UHE",
}

export enum Dterr {
    ArabaÁlava = "ARABA/ÁLAVA",
    Bizkaia = "BIZKAIA",
    Gipuzkoa = "GIPUZKOA",
}

export enum Dtituc {
    DepartEducación = "DEPART. EDUCACIÓN",
    OtrosPúblicos = "OTROS PÚBLICOS",
    Privada = "PRIVADA",
}

export enum Dtitue {
    BestePublikoak = "BESTE PUBLIKOAK",
    HezkuntzaSaila = "HEZKUNTZA SAILA",
    Pribatua = "PRIBATUA",
}

export enum GENREnum {
    Empty = " ",
    The11A0 = "11A0",
    The11D0 = "11D0",
    The11I0 = "11I0",
    The11J1 = "11J1",
    The11P0 = "11P0",
    The11R0 = "11R0",
    The11S0 = "11S0",
    The11T0 = "11T0",
    The11U0 = "11U0",
    The11V0 = "11V0",
    The12D0 = "12D0",
    The12I0 = "12I0",
    The12N0 = "12N0",
    The12P0 = "12P0",
    The12S0 = "12S0",
    The12V0 = "12V0",
    The31B0 = "31B0",
    The31C0 = "31C0",
    The31D0 = "31D0",
    The31F0 = "31F0",
    The31H0 = "31H0",
    The31I0 = "31I0",
    The31J0 = "31J0",
    The31N0 = "31N0",
    The31P0 = "31P0",
    The31Q0 = "31Q0",
    The31R0 = "31R0",
    The32D0 = "32D0",
    The32H0 = "32H0",
    The32M0 = "32M0",
    The32N0 = "32N0",
    The32O0 = "32O0",
    The32P0 = "32P0",
    The32U0 = "32U0",
}