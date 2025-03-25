"use client";

import { useState } from "react";
import { POIForm } from "@/components/poi-form";
import { POITable } from "@/components/poi-table";
import { FormData, POI } from "@/lib/types";

export default function Home() {
  const [pois, setPois] = useState<POI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://dashboard.situm.com/api/v1/buildings/${formData.buildingId}/pois`,
        {
          headers: {
            "X-API-EMAIL": formData.email,
            "X-API-KEY": formData.apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los POIs");
      }

      const responseData: POI[] = await response.json();
      setPois(responseData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="container mx-auto py-10 space-y-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-8">Situm POI Finder</h1>
        <POIForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {pois.length > 0 && <POITable data={pois} />}
    </main>
  );
}
