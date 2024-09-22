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

export interface Product {
    name: string;
    month: Month;
}
