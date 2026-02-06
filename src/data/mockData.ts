// Mock data voor verlofaanvragen, verlofregelingen en verlofsaldi

export const mockVerlofaanvragen = [
  {
    id: 1,
    startdatum: new Date(2024, 9, 23),
    einddatum: new Date(2024, 9, 23),
    type: "Verlof wettelijk",
    uren: 8,
    status: "",
    verlofaanvraagstatus: "Open",
  },
  {
    id: 2,
    startdatum: new Date(2024, 10, 5),
    einddatum: new Date(2024, 10, 8),
    type: "Verlof bovenwettelijk",
    uren: 32,
    status: "",
    verlofaanvraagstatus: "Open",
  },
  {
    id: 3,
    startdatum: new Date(2024, 11, 20),
    einddatum: new Date(2024, 11, 27),
    type: "Verlof wettelijk",
    uren: 64,
    status: "",
    verlofaanvraagstatus: "Open",
  },
];

export const mockVerlofaanvragenNa = [
  {
    id: 4,
    startdatum: new Date(2025, 0, 15),
    einddatum: new Date(2025, 0, 17),
    type: "Verlof bovenwettelijk",
    uren: 24,
    status: "Verwijderd",
    verlofaanvraagstatus: "Open",
  },
  {
    id: 5,
    startdatum: new Date(2025, 1, 10),
    einddatum: new Date(2025, 1, 14),
    type: "Studieverlof",
    uren: 40,
    status: "Verwijderd",
    verlofaanvraagstatus: "Open",
  },
  {
    id: 6,
    startdatum: new Date(2025, 2, 5),
    einddatum: new Date(2025, 2, 7),
    type: "Verlof wettelijk",
    uren: 24,
    status: "Verwijderd",
    verlofaanvraagstatus: "Open",
  },
  {
    id: 7,
    startdatum: new Date(2025, 3, 20),
    einddatum: new Date(2025, 3, 25),
    type: "Verlof bovenwettelijk",
    uren: 48,
    status: "Verwijderd",
    verlofaanvraagstatus: "Open",
  },
  {
    id: 8,
    startdatum: new Date(2026, 6, 10),
    einddatum: new Date(2026, 6, 20),
    type: "Studieverlof",
    uren: 88,
    status: "Verwijderd",
    verlofaanvraagstatus: "Open",
  },
];

export const mockGoedgekeurdVerlofNa = [
  {
    id: 9,
    startdatum: new Date(2026, 0, 5),
    einddatum: new Date(2026, 0, 9),
    type: "Verlof wettelijk",
    uren: 40,
    status: "Verwijderd",
    verlofaanvraagstatus: "Goedgekeurd",
  },
  {
    id: 10,
    startdatum: new Date(2026, 1, 15),
    einddatum: new Date(2026, 1, 20),
    type: "Verlof bovenwettelijk",
    uren: 48,
    status: "Verwijderd",
    verlofaanvraagstatus: "Goedgekeurd",
  },
  {
    id: 11,
    startdatum: new Date(2026, 3, 10),
    einddatum: new Date(2026, 3, 12),
    type: "Verlof wettelijk",
    uren: 24,
    status: "Verwijderd",
    verlofaanvraagstatus: "Goedgekeurd",
  },
];

export const mockGoedgekeurdVerlofTussenVandaagEnUitDienst = [
  {
    id: 12,
    startdatum: new Date(2024, 11, 5),
    einddatum: new Date(2024, 11, 6),
    type: "Verlof wettelijk",
    uren: 16,
    status: "",
    verlofaanvraagstatus: "Goedgekeurd",
  },
  {
    id: 13,
    startdatum: new Date(2024, 11, 15),
    einddatum: new Date(2024, 11, 19),
    type: "Verlof bovenwettelijk",
    uren: 40,
    status: "",
    verlofaanvraagstatus: "Goedgekeurd",
  },
  {
    id: 14,
    startdatum: new Date(2024, 11, 28),
    einddatum: new Date(2024, 11, 30),
    type: "Verlof wettelijk",
    uren: 24,
    status: "",
    verlofaanvraagstatus: "Goedgekeurd",
  },
  {
    id: 15,
    startdatum: new Date(2025, 11, 31),
    einddatum: new Date(2025, 11, 31),
    type: "Verlof wettelijk",
    uren: 8,
    status: "",
    verlofaanvraagstatus: "Goedgekeurd",
  },
];

export const mockVerlofregelingen = [
  {
    id: 1,
    naam: "Standaard vakantieregeling",
    type: "Verlof wettelijk",
    startdatum: new Date(2025, 0, 1),
    einddatum: new Date(2025, 11, 31),
    aanspraak: 240,
    status: "Toegepast",
  },
  {
    id: 2,
    naam: "Bovenwettelijke vakantieregeling",
    type: "Verlof bovenwettelijk",
    startdatum: new Date(2025, 0, 1),
    einddatum: new Date(2025, 11, 31),
    aanspraak: 80,
    status: "Toegepast",
  },
];

export const mockVerlofsaldi = [
  {
    id: 1,
    soort: "Wettelijk verlof",
    totaalAanspraak: 200,
    opgenomen: 96,
    gepland: 64,
    resterend: 40,
  },
  {
    id: 2,
    soort: "Bovenwettelijk verlof",
    totaalAanspraak: 64,
    opgenomen: 24,
    gepland: 40,
    resterend: 0,
  },
  {
    id: 3,
    soort: "Studieverlof",
    totaalAanspraak: 80,
    opgenomen: 8,
    gepland: 0,
    resterend: 72,
  },
];
