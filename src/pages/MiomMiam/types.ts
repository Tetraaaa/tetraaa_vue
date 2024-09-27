export type Month =
    | "Janvier"
    | "Février"
    | "Mars"
    | "Avril"
    | "Mai"
    | "Juin"
    | "Juillet"
    | "Août"
    | "Septembre"
    | "Octobre"
    | "Novembre"
    | "Décembre";

export interface Macros {
    lipides: number;
    acidesGrasSatures: number;
    glucides: number;
    sucres: number;
    proteines: number;
}

export interface Product {
    name: string;
    months: Month[];
    kcal: number;
    macros: Macros;
}
