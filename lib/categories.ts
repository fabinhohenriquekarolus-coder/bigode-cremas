export const CATEGORIES = [
  "Cuias",
  "Tesouras",
  "Mocó",
  "Sedas",
  "Piteiras de papel",
  "Piteiras de vidro",
  "Pratos",
  "Slick",
  "Dichavador",
  "Case",
  "Kit completo",
  "Pote hermético",
  "Cinzeiro",
  "Tabaco",
] as const;

export type Category = (typeof CATEGORIES)[number];
