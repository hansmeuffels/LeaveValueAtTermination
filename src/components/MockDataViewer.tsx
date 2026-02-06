import { format } from "date-fns";
import { nl } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  mockVerlofaanvragen,
  mockVerlofaanvragenNa,
  mockGoedgekeurdVerlofNa,
  mockGoedgekeurdVerlofTussenVandaagEnUitDienst,
  mockVerlofregelingen,
  mockVerlofsaldi,
} from "../data/mockData";

interface MockDataViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MockDataViewer({ open, onOpenChange }: MockDataViewerProps) {
  const formatDate = (date: Date) => {
    return format(date, "dd MMM yyyy", { locale: nl });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mockdata Overzicht</DialogTitle>
          <DialogDescription>
            Hier kun je alle mockdata inzien die wordt gebruikt in de applicatie.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Verlofaanvragen voor uitdienstdatum */}
          <Card>
            <CardHeader>
              <CardTitle>Verlofaanvragen (voor uitdienstdatum)</CardTitle>
              <CardDescription>
                {mockVerlofaanvragen.length} items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Startdatum</TableHead>
                    <TableHead>Einddatum</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uren</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVerlofaanvragen.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{formatDate(item.startdatum)}</TableCell>
                      <TableCell>{formatDate(item.einddatum)}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.uren}</TableCell>
                      <TableCell>{item.verlofaanvraagstatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Verlofaanvragen na uitdienstdatum */}
          <Card>
            <CardHeader>
              <CardTitle>Verlofaanvragen (na uitdienstdatum)</CardTitle>
              <CardDescription>
                {mockVerlofaanvragenNa.length} items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Startdatum</TableHead>
                    <TableHead>Einddatum</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uren</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVerlofaanvragenNa.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{formatDate(item.startdatum)}</TableCell>
                      <TableCell>{formatDate(item.einddatum)}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.uren}</TableCell>
                      <TableCell>{item.verlofaanvraagstatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Goedgekeurd verlof na uitdienstdatum */}
          <Card>
            <CardHeader>
              <CardTitle>Goedgekeurd Verlof (na uitdienstdatum)</CardTitle>
              <CardDescription>
                {mockGoedgekeurdVerlofNa.length} items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Startdatum</TableHead>
                    <TableHead>Einddatum</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uren</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockGoedgekeurdVerlofNa.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{formatDate(item.startdatum)}</TableCell>
                      <TableCell>{formatDate(item.einddatum)}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.uren}</TableCell>
                      <TableCell>{item.verlofaanvraagstatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Goedgekeurd verlof tussen vandaag en uitdienstdatum */}
          <Card>
            <CardHeader>
              <CardTitle>
                Goedgekeurd Verlof (tussen vandaag en uitdienstdatum)
              </CardTitle>
              <CardDescription>
                {mockGoedgekeurdVerlofTussenVandaagEnUitDienst.length} items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Startdatum</TableHead>
                    <TableHead>Einddatum</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uren</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockGoedgekeurdVerlofTussenVandaagEnUitDienst.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{formatDate(item.startdatum)}</TableCell>
                      <TableCell>{formatDate(item.einddatum)}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.uren}</TableCell>
                      <TableCell>{item.verlofaanvraagstatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Verlofregelingen */}
          <Card>
            <CardHeader>
              <CardTitle>Verlofregelingen</CardTitle>
              <CardDescription>
                {mockVerlofregelingen.length} items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Naam</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Startdatum</TableHead>
                    <TableHead>Einddatum</TableHead>
                    <TableHead>Aanspraak</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVerlofregelingen.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.naam}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{formatDate(item.startdatum)}</TableCell>
                      <TableCell>{formatDate(item.einddatum)}</TableCell>
                      <TableCell>{item.aanspraak}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Verlofsaldi */}
          <Card>
            <CardHeader>
              <CardTitle>Verlofsaldi</CardTitle>
              <CardDescription>
                {mockVerlofsaldi.length} items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Soort</TableHead>
                    <TableHead>Totaal Aanspraak</TableHead>
                    <TableHead>Opgenomen</TableHead>
                    <TableHead>Gepland</TableHead>
                    <TableHead>Resterend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVerlofsaldi.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.soort}</TableCell>
                      <TableCell>{item.totaalAanspraak}</TableCell>
                      <TableCell>{item.opgenomen}</TableCell>
                      <TableCell>{item.gepland}</TableCell>
                      <TableCell>{item.resterend}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
