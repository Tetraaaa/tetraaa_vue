import type { Product } from "./types";

export const products: Product[] = [
    {
        name: "ananas",
        months: ["Janvier", "Février", "Mars", "Novembre", "Décembre"],
        kcal: 50,
        macros: {
            lipides: 0.1,
            acidesGrasSatures: 0,
            glucides: 13,
            sucres: 10,
            proteines: 0.5,
        },
    },
];
