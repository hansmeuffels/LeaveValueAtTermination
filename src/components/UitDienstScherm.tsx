import { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Check,
  X,
  Calculator,
  Trash2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";

// Mock data
const mockVerlofaanvragen = [
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

const mockVerlofaanvragenNa = [
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

const mockGoedgekeurdVerlofNa = [
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

const mockGoedgekeurdVerlofTussenVandaagEnUitDienst = [
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

const mockVerlofregelingen = [
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

const mockVerlofsaldi = [
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
export function UitDienstScherm() {
  const [uitDienstDatum, setUitDienstDatum] = useState<Date>(
    new Date(),
  );
  const [uitbetalingen, setUitbetalingen] = useState<
    Record<number, boolean>
  >({
    1: false,
    2: false,
    3: false,
  });

  // State voor verlofaanvragen statussen
  const [verlofaanvraagStatussen, setVerlofaanvraagStatussen] =
    useState<Record<number, string>>(
      [
        ...mockVerlofaanvragen,
        ...mockVerlofaanvragenNa,
        ...mockGoedgekeurdVerlofNa,
        ...mockGoedgekeurdVerlofTussenVandaagEnUitDienst,
      ].reduce((acc, v) => ({ ...acc, [v.id]: v.status }), {}),
    );

  // State voor verlofregelingen statussen
  const [verlofregelingStatussen, setVerlofregelingStatussen] =
    useState<Record<number, string>>(
      mockVerlofregelingen.reduce(
        (acc, r) => ({ ...acc, [r.id]: r.status }),
        {},
      ),
    );

  const verlofVoor = uitDienstDatum
    ? mockVerlofaanvragen
        .filter((v) => v.startdatum < uitDienstDatum)
        .slice(0, 3)
    : [];

  const verlofNa = uitDienstDatum
    ? mockVerlofaanvragenNa
        .filter((v) => v.startdatum >= uitDienstDatum)
        .slice(0, 5)
    : [];

  const goedgekeurdVerlofNa = uitDienstDatum
    ? mockGoedgekeurdVerlofNa
        .filter((v) => v.startdatum >= uitDienstDatum)
        .slice(0, 3)
    : [];

  const goedgekeurdVerlofTussenVandaagEnUitDienst =
    uitDienstDatum
      ? mockGoedgekeurdVerlofTussenVandaagEnUitDienst
          .filter(
            (v) =>
              v.startdatum >= new Date() &&
              v.startdatum < uitDienstDatum,
          )
          .slice(0, 3)
      : [];

  // Filter verlofregelingen: toon alleen als uit dienst datum vóór of op einddatum valt, of als einddatum doorlopend is
  const relevanteVerlofregelingen = uitDienstDatum
    ? mockVerlofregelingen.filter(
        (regeling) =>
          !regeling.einddatum ||
          regeling.einddatum >= uitDienstDatum,
      )
    : [];

  // Bereken uit te betalen verlofuren
  const berekendUitTeBetalenUren = mockVerlofsaldi
    .filter((saldo) => uitbetalingen[saldo.id])
    .reduce((totaal, saldo) => totaal + saldo.resterend, 0);

  const [uitTeBetalenUren, setUitTeBetalenUren] =
    useState<number>(berekendUitTeBetalenUren);

  // State voor waarde per uur
  const [waardePerUur, setWaardePerUur] = useState<number>(0);

  // Bereken totale waarde
  const totaleWaarde = uitTeBetalenUren * waardePerUur;

  // Update uitTeBetalenUren wanneer toggles veranderen
  const handleUitbetalingToggle = (
    id: number,
    checked: boolean,
  ) => {
    const nieuweUitbetalingen = {
      ...uitbetalingen,
      [id]: checked,
    };
    setUitbetalingen(nieuweUitbetalingen);

    // Bereken nieuwe waarde
    const nieuweWaarde = mockVerlofsaldi
      .filter((saldo) => nieuweUitbetalingen[saldo.id])
      .reduce((totaal, saldo) => totaal + saldo.resterend, 0);

    setUitTeBetalenUren(nieuweWaarde);
    console.log(
      `Uitbetaling voor verlofsoort ${id}:`,
      checked ? "Ja" : "Nee",
    );
  };

  const handleGoedkeuren = (id: number) => {
    setVerlofaanvraagStatussen((prev) => ({
      ...prev,
      [id]: "Goedgekeurd",
    }));
    console.log("Goedkeuren verlofaanvraag:", id);
  };

  const handleAfkeuren = (id: number) => {
    setVerlofaanvraagStatussen((prev) => ({
      ...prev,
      [id]: "Afgekeurd",
    }));
    console.log("Afkeuren verlofaanvraag:", id);
  };

  const handleHerreken = (id: number) => {
    setVerlofregelingStatussen((prev) => ({
      ...prev,
      [id]: "Toegepast",
    }));
    console.log("Herrekenen verlofregeling:", id);
  };

  const handleOpslaan = () => {
    console.log("Opslaan verlofafhandeling", {
      uitDienstDatum,
      uitTeBetalenUren,
      uitbetalingen,
    });
    // Hier zou de logica komen om de wijzigingen op te slaan
  };

  const handleOpslaanViaWorkflow = () => {
    console.log("Opslaan via workflow", {
      uitDienstDatum,
      uitTeBetalenUren,
      uitbetalingen,
    });
    // Hier zou de logica komen om de wijzigingen via een workflow op te slaan
  };

  const handleAnnuleren = () => {
    console.log("Annuleren");
    // Hier zou de logica komen om terug te gaan of te resetten
  };

  const handleOpslaanAlsNotitie = () => {
    console.log("Opslaan als notitie", {
      uitDienstDatum,
      uitTeBetalenUren,
      uitbetalingen,
    });
    // Hier zou de logica komen om de gegevens als notitie op te slaan
  };

  const handleVerwijderen = (id: number) => {
    setVerlofaanvraagStatussen((prev) => ({
      ...prev,
      [id]: "Verwijderd",
    }));
    console.log("Verwijderen verlofaanvraag:", id);
  };

  const handleSluiten = () => {
    console.log("Sluiten");
    // Hier zou de logica komen om het scherm te sluiten
  };

  const getStatusBadge = (status: string) => {
    if (!status || status === "") {
      return null;
    }
    switch (status) {
      case "Goedgekeurd":
        return (
          <Badge className="bg-green-600">Goedgekeurd</Badge>
        );
      case "Afgekeurd":
        return <Badge className="bg-red-600">Afgekeurd</Badge>;
      case "In behandeling":
        return (
          <Badge className="bg-yellow-600">
            In behandeling
          </Badge>
        );
      case "Verwijderd":
        return (
          <Badge className="bg-gray-600">Verwijderd</Badge>
        );
      case "Toegepast":
        return <Badge className="bg-blue-600">Toegepast</Badge>;
      case "Niet toegepast":
        return (
          <Badge className="bg-gray-500">Niet toegepast</Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="mb-2">Indicatie verlofsaldo</h1>
        <p className="text-gray-600">
          Doorloop de stappen om het verlof eind saldo te
          berekenen. De uitgevoerde acties worden gebruikt om
          het eind saldo te berekenen. Ze worden niet
          opgeslagen.
        </p>
      </div>

      <div className="space-y-8">
        {/* Uit dienst datum */}
        <Card>
          <CardHeader>
            <CardTitle>Uit dienst datum</CardTitle>
            <CardDescription>
              Selecteer de datum waarop de medewerker uit dienst
              treedt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-[280px] justify-start"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {uitDienstDatum ? (
                    format(uitDienstDatum, "PPP", {
                      locale: nl,
                    })
                  ) : (
                    <span>Selecteer een datum</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={uitDienstDatum}
                  onSelect={setUitDienstDatum}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {uitDienstDatum && (
          <>
            {/* Tabel 5: Verlof uit verlofregelingen */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs">
                    5
                  </span>
                  Verlof uit verlofregelingen
                </CardTitle>
                <CardDescription>
                  Herbereken het verlofrecht obv de uit dienst
                  datum.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {relevanteVerlofregelingen.length > 0 ? (
                  <TooltipProvider>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Naam</TableHead>
                            <TableHead>Verlofsoort</TableHead>
                            <TableHead>Startdatum</TableHead>
                            <TableHead>
                              Huidige einddatum
                            </TableHead>
                            <TableHead>Uren</TableHead>
                            <TableHead>
                              Herberekende uren
                            </TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {relevanteVerlofregelingen.map(
                            (regeling) => (
                              <TableRow key={regeling.id}>
                                <TableCell>
                                  {regeling.naam}
                                </TableCell>
                                <TableCell>
                                  {regeling.type}
                                </TableCell>
                                <TableCell>
                                  {format(
                                    regeling.startdatum,
                                    "dd-MM-yyyy",
                                    { locale: nl },
                                  )}
                                </TableCell>
                                <TableCell>
                                  {regeling.einddatum ? (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className="cursor-help underline decoration-dotted">
                                          {format(
                                            regeling.einddatum,
                                            "dd-MM-yyyy",
                                            { locale: nl },
                                          )}
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>
                                          De einddatum van dit
                                          verlof valt na de
                                          einddatum van het
                                          dienstverband. Pas de
                                          herberekende waarde
                                          toe.
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  ) : (
                                    "Doorlopend"
                                  )}
                                </TableCell>
                                <TableCell>
                                  {regeling.aanspraak}
                                </TableCell>
                                <TableCell>220</TableCell>
                                <TableCell>
                                  {getStatusBadge(
                                    verlofregelingStatussen[
                                      regeling.id
                                    ],
                                  )}
                                </TableCell>
                              </TableRow>
                            ),
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TooltipProvider>
                ) : (
                  <p className="text-gray-500">
                    Geen verlof uit verlofregelingen ná de uit
                    dienst datum
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tabel 1: Verlofaanvragen vóór de uit dienst datum */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs">
                    1
                  </span>
                  Verlofaanvragen vóór de uit dienst datum
                </CardTitle>
                <CardDescription>
                  Behandel openstaande verlofaanvragen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {verlofVoor.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Startdatum</TableHead>
                          <TableHead>Einddatum</TableHead>
                          <TableHead>Verlofsoort</TableHead>
                          <TableHead>Uren</TableHead>
                          <TableHead>Waarde</TableHead>
                          <TableHead>Acties</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {verlofVoor.map((verlof) => (
                          <TableRow key={verlof.id}>
                            <TableCell>
                              {format(
                                verlof.startdatum,
                                "dd-MM-yyyy",
                                { locale: nl },
                              )}
                            </TableCell>
                            <TableCell>
                              {format(
                                verlof.einddatum,
                                "dd-MM-yyyy",
                                { locale: nl },
                              )}
                            </TableCell>
                            <TableCell>{verlof.type}</TableCell>
                            <TableCell>{verlof.uren}</TableCell>
                            <TableCell>
                              {(
                                verlof.uren * waardePerUur
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="default"
                                  onClick={() =>
                                    handleGoedkeuren(verlof.id)
                                  }
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Goedkeuren
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleAfkeuren(verlof.id)
                                  }
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Afkeuren
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(
                                verlofaanvraagStatussen[
                                  verlof.id
                                ],
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Geen verlofaanvragen vóór de uit dienst
                    datum
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tabel 2: Verlofaanvragen ná de uit dienst datum */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs">
                    2
                  </span>
                  Verlofaanvragen ná de uit dienst datum
                </CardTitle>
                <CardDescription>
                  Behandel openstaande verlofaanvragen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {verlofNa.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Startdatum</TableHead>
                          <TableHead>Einddatum</TableHead>
                          <TableHead>Verlofsoort</TableHead>
                          <TableHead>Uren</TableHead>
                          <TableHead>Waarde</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {verlofNa.map((verlof) => (
                          <TableRow key={verlof.id}>
                            <TableCell>
                              {format(
                                verlof.startdatum,
                                "dd-MM-yyyy",
                                { locale: nl },
                              )}
                            </TableCell>
                            <TableCell>
                              {format(
                                verlof.einddatum,
                                "dd-MM-yyyy",
                                { locale: nl },
                              )}
                            </TableCell>
                            <TableCell>{verlof.type}</TableCell>
                            <TableCell>{verlof.uren}</TableCell>
                            <TableCell>
                              {(
                                verlof.uren * waardePerUur
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(
                                verlofaanvraagStatussen[
                                  verlof.id
                                ],
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Geen verlofaanvragen ná de uit dienst datum
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tabel 3: Goedgekeurde verlofaanvragen tussen vandaag en de uit dienstdatum */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs">
                    3
                  </span>
                  Goedgekeurde verlofaanvragen tussen vandaag en
                  de uit dienstdatum
                </CardTitle>
                <CardDescription>
                  Verwijder de verlofaanvragen die tussen
                  vandaag en de uit dienst datum vallen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {goedgekeurdVerlofTussenVandaagEnUitDienst.length >
                0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Startdatum</TableHead>
                          <TableHead>Einddatum</TableHead>
                          <TableHead>Verlofsoort</TableHead>
                          <TableHead>Uren</TableHead>
                          <TableHead>Waarde</TableHead>
                          <TableHead>Acties</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {goedgekeurdVerlofTussenVandaagEnUitDienst.map(
                          (verlof) => (
                            <TableRow key={verlof.id}>
                              <TableCell>
                                {format(
                                  verlof.startdatum,
                                  "dd-MM-yyyy",
                                  { locale: nl },
                                )}
                              </TableCell>
                              <TableCell>
                                {format(
                                  verlof.einddatum,
                                  "dd-MM-yyyy",
                                  { locale: nl },
                                )}
                              </TableCell>
                              <TableCell>
                                {verlof.type}
                              </TableCell>
                              <TableCell>
                                {verlof.uren}
                              </TableCell>
                              <TableCell>
                                {(
                                  verlof.uren * waardePerUur
                                ).toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() =>
                                    handleVerwijderen(verlof.id)
                                  }
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Verwijderen
                                </Button>
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(
                                  verlofaanvraagStatussen[
                                    verlof.id
                                  ],
                                )}
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Geen goedgekeurde verlofaanvragen tussen
                    vandaag en de uit dienst datum
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tabel 4: Goedgekeurde verlofaanvragen ná de uit dienst datum */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs">
                    4
                  </span>
                  Goedgekeurde verlofaanvragen ná de uit dienst
                  datum
                </CardTitle>
                <CardDescription>
                  Verwijder de verlofaanvragen die na de uit
                  dienst datum vallen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {goedgekeurdVerlofNa.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Startdatum</TableHead>
                          <TableHead>Einddatum</TableHead>
                          <TableHead>Verlofsoort</TableHead>
                          <TableHead>Uren</TableHead>
                          <TableHead>Waarde</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {goedgekeurdVerlofNa.map((verlof) => (
                          <TableRow key={verlof.id}>
                            <TableCell>
                              {format(
                                verlof.startdatum,
                                "dd-MM-yyyy",
                                { locale: nl },
                              )}
                            </TableCell>
                            <TableCell>
                              {format(
                                verlof.einddatum,
                                "dd-MM-yyyy",
                                { locale: nl },
                              )}
                            </TableCell>
                            <TableCell>{verlof.type}</TableCell>
                            <TableCell>{verlof.uren}</TableCell>
                            <TableCell>
                              {(
                                verlof.uren * waardePerUur
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(
                                verlofaanvraagStatussen[
                                  verlof.id
                                ],
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Geen goedgekeurde verlofaanvragen ná de uit
                    dienst datum
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Tabel 7: Alle verlofaanvragen */}
            <Card key={`tabel7-${uitDienstDatum.getTime()}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs">
                    7
                  </span>
                  Verlofaanvragen
                </CardTitle>
                <CardDescription>
                  Overzicht van alle verlofaanvragen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {(() => {
                  // Combineer alle verlofaanvragen
                  const alleVerlofaanvragen = [
                    ...mockVerlofaanvragen,
                    ...mockVerlofaanvragenNa,
                    ...mockGoedgekeurdVerlofNa,
                    ...mockGoedgekeurdVerlofTussenVandaagEnUitDienst,
                  ]
                    // Sorteer op startdatum
                    .sort(
                      (a, b) =>
                        a.startdatum.getTime() -
                        b.startdatum.getTime(),
                    );

                  return alleVerlofaanvragen.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>Startdatum</TableHead>
                            <TableHead>Einddatum</TableHead>
                            <TableHead>Verlofsoort</TableHead>
                            <TableHead>Uren</TableHead>
                            <TableHead>Waarde</TableHead>
                            <TableHead>
                              Voor/Na uitdienstdatum
                            </TableHead>
                            <TableHead>Verlofaanvraag status</TableHead>
                            <TableHead>Acties</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {alleVerlofaanvragen.map((verlof) => {
                            const valtGedeeltelijkInEnUitDienst = 
                              uitDienstDatum > verlof.startdatum && 
                              uitDienstDatum <= verlof.einddatum;
                            
                            return (
                            <TableRow
                              key={verlof.id}
                              className={
                                verlof.startdatum >= uitDienstDatum
                                  ? "bg-red-50"
                                  : ""
                              }
                            >
                              <TableCell>
                                {valtGedeeltelijkInEnUitDienst && (
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <span className="text-yellow-600 cursor-help text-xl font-bold">
                                          ⚠️
                                        </span>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Let op deze verlofaanvraag valt gedeeltelijk in en uit dienst.</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </TableCell>
                              <TableCell>
                                {format(
                                  verlof.startdatum,
                                  "dd-MM-yyyy",
                                  { locale: nl },
                                )}
                              </TableCell>
                              <TableCell>
                                {format(
                                  verlof.einddatum,
                                  "dd-MM-yyyy",
                                  { locale: nl },
                                )}
                              </TableCell>
                              <TableCell>
                                {verlof.type}
                              </TableCell>
                              <TableCell>
                                {verlof.uren}
                              </TableCell>
                              <TableCell>
                                {(
                                  verlof.uren * waardePerUur
                                ).toFixed(2)}
                              </TableCell>
                              <TableCell>
                                {verlof.startdatum <
                                uitDienstDatum
                                  ? "Voor"
                                  : "Na"}
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(verlof.verlofaanvraagstatus)}
                              </TableCell>
                              <TableCell>
                                {verlof.startdatum < uitDienstDatum && 
                                 verlof.verlofaanvraagstatus === "Open" && (
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      variant="default"
                                      onClick={() =>
                                        handleGoedkeuren(verlof.id)
                                      }
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <Check className="h-4 w-4 mr-1" />
                                      Goedkeuren
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() =>
                                        handleAfkeuren(verlof.id)
                                      }
                                    >
                                      <X className="h-4 w-4 mr-1" />
                                      Afkeuren
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                              <TableCell>
                                {verlof.startdatum >= uitDienstDatum ? (
                                  <Badge className="bg-gray-600">Verwijderd</Badge>
                                ) : (
                                  verlofaanvraagStatussen[verlof.id] && 
                                  verlofaanvraagStatussen[verlof.id] !== "" ? (
                                    getStatusBadge(
                                      verlofaanvraagStatussen[verlof.id]
                                    )
                                  ) : null
                                )}
                              </TableCell>
                            </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Geen verlofaanvragen gevonden
                    </p>
                  );
                })()}
              </CardContent>
            </Card>

            {/* Tabel 6: Verlofsaldi per verlofsoort */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs">
                    6
                  </span>
                  Verlofsaldi per verlofsoort
                </CardTitle>
                <CardDescription>
                  Bepaal per verlofsoort of uitbetaling mogelijk
                  is.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Verlofsoort</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>Opgenomen</TableHead>
                        <TableHead>Gepland</TableHead>
                        <TableHead>Resterend</TableHead>
                        <TableHead>Uitbetaling</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockVerlofsaldi.map((saldo) => (
                        <TableRow key={saldo.id}>
                          <TableCell>{saldo.soort}</TableCell>
                          <TableCell>
                            {saldo.totaalAanspraak}
                          </TableCell>
                          <TableCell>
                            {saldo.opgenomen}
                          </TableCell>
                          <TableCell>{saldo.gepland}</TableCell>
                          <TableCell>
                            <span
                              className={
                                saldo.resterend < 0
                                  ? "text-red-600"
                                  : ""
                              }
                            >
                              {saldo.resterend}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Switch
                              id={`uitbetaling-${saldo.id}`}
                              checked={uitbetalingen[saldo.id]}
                              onCheckedChange={(checked) =>
                                handleUitbetalingToggle(
                                  saldo.id,
                                  checked,
                                )
                              }
                              className={
                                uitbetalingen[saldo.id]
                                  ? "data-[state=checked]:bg-green-600"
                                  : ""
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Resultaat */}
            <Card>
              <CardHeader>
                <CardTitle>Resultaat</CardTitle>
                <CardDescription>
                  Verdeel de uitbetaalbare uren.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-700">
                  Wil de werknemer de uren opnemen of
                  uitbetalen?
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="uitbetaling-totaal">
                      Uit te betalen verlofuren
                    </Label>
                    <Input
                      id="uitbetaling-totaal"
                      type="number"
                      value={uitTeBetalenUren}
                      onChange={(e) =>
                        setUitTeBetalenUren(
                          Number(e.target.value),
                        )
                      }
                      className="max-w-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waarde-per-uur">
                      Waarde per uur
                    </Label>
                    <Input
                      id="waarde-per-uur"
                      type="number"
                      step="0.01"
                      value={waardePerUur}
                      onChange={(e) =>
                        setWaardePerUur(Number(e.target.value))
                      }
                      className="max-w-xs"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="totale-waarde">
                      Waarde
                    </Label>
                    <Input
                      id="totale-waarde"
                      type="text"
                      value={totaleWaarde.toFixed(2)}
                      readOnly
                      className="max-w-xs bg-gray-50"
                    />
                  </div>

                  <div className="flex justify-end items-center pt-4 border-t">
                    <Button
                      variant="default"
                      onClick={handleSluiten}
                    >
                      Sluiten
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}