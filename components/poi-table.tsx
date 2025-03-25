"use client";

import { useState, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { POI } from "@/lib/types";
import { copyToClipboard } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

interface POITableProps {
  data: POI[];
}

export function POITable({ data }: POITableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredData = data.filter((poi) =>
    poi.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCopy = async (poi: POI) => {
    const textToCopy = `${poi.name},${poi.position.lat},${poi.position.lng}`;
    const success = await copyToClipboard(textToCopy);
    
    if (success) {
      setCopiedId(poi.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Filtrar por nombre..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Latitud</TableHead>
              <TableHead>Longitud</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>ID Planta</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((poi) => (
              <TableRow key={poi.id}>
                <TableCell>{poi.name}</TableCell>
                <TableCell>{poi.position.lat}</TableCell>
                <TableCell>{poi.position.lng}</TableCell>
                <TableCell>{poi.id}</TableCell>
                <TableCell>{poi.position.floor_id}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(poi)}
                    className="h-8 w-8"
                  >
                    {copiedId === poi.id ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 