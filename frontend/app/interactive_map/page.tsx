"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Trees, Landmark, GraduationCap, ShoppingBag, Utensils, MapPin, Coffee } from "lucide-react";

type Place = {
  id: string;
  name: string;
  category: string;
  lat: number;
  lon: number;
  description: string;
  eta: string;
  drivingDistance: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const places: Place[] = [
  {
    id: "property",
    name: "Your Airbnb",
    category: "Stay",
    lat: 30.289875409186184,
    lon: -97.7626035447762,
    description: "1802 Winsted Ln, Austin, TX 78703.",
    eta: "You are here",
    drivingDistance: "0 mi",
    icon: Home,
    color: "bg-slate-900 text-white border-slate-900",
  },
  {
    id: "capitol",
    name: "Texas State Capitol",
    category: "Landmark",
    lat: 30.2746911,
    lon: -97.7405171,
    description: "Historic Capitol building in downtown Austin.",
    eta: "9 min drive",
    drivingDistance: "2.1 mi away",
    icon: Landmark,
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    id: "ut",
    name: "UT Austin",
    category: "Landmark",
    lat: 30.2851494,
    lon: -97.7339352,
    description: "University of Texas campus, museums, events, and the Tower area.",
    eta: "11 min drive",
    drivingDistance: "3.0 mi away",
    icon: GraduationCap,
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    id: "zilker",
    name: "Zilker Park",
    category: "Outdoors",
    lat: 30.2693631,
    lon: -97.7735349,
    description: "Big green space for walks, picnics, and easy access to Barton Springs.",
    eta: "8 min drive",
    drivingDistance: "2.8 mi away",
    icon: Trees,
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: "barton-springs-pool",
    name: "Barton Springs Pool",
    category: "Outdoors",
    lat: 30.2640401,
    lon: -97.7721516,
    description: "2201 Barton Springs Rd, Austin, TX 78704.",
    eta: "9 min drive",
    drivingDistance: "2.6 mi away",
    icon: Trees,
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: "groceries",
    name: "H-E-B (Lake Austin Blvd)",
    category: "Essentials",
    lat: 30.2836285,
    lon: -97.7759176,
    description: "Closest H-E-B to 1802 Winsted Ln: 2652 Lake Austin Blvd, Austin, TX 78703.",
    eta: "6 min drive",
    drivingDistance: "1.7 mi away",
    icon: ShoppingBag,
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    id: "airport",
    name: "Austin Airport",
    category: "Travel",
    lat: 30.1934893,
    lon: -97.6650096,
    description: "Austin-Bergstrom International Airport for guest arrivals and departures.",
    eta: "23 min drive",
    drivingDistance: "14.1 mi away",
    icon: MapPin,
    color: "bg-violet-100 text-violet-700 border-violet-200",
  },
  {
    id: "matts",
    name: "Matt's El Rancho",
    category: "Dining",
    lat: 30.245148,
    lon: -97.7791972,
    description: "2613 S Lamar Blvd, Austin, TX 78704.",
    eta: "12 min drive",
    drivingDistance: "4.4 mi away",
    icon: Utensils,
    color: "bg-red-100 text-red-700 border-red-200",
  },
  {
    id: "fonda",
    name: "Fonda San Miguel",
    category: "Dining",
    lat: 30.3253752,
    lon: -97.742907,
    description: "2330 W North Loop Blvd, Austin, TX 78756.",
    eta: "13 min drive",
    drivingDistance: "4.0 mi away",
    icon: Utensils,
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    id: "desnudo",
    name: "Desnudo Coffee (West 6th)",
    category: "Coffee",
    lat: 30.2735402,
    lon: -97.758708,
    description: "1214 W 6th St, Austin, TX 78703.",
    eta: "7 min drive",
    drivingDistance: "1.8 mi away",
    icon: Coffee,
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    id: "veracruz",
    name: "Veracruz All Natural (Tarrytown)",
    category: "Dining",
    lat: 30.2927815,
    lon: -97.7601954,
    description: "2401 Winsted Ln, Austin, TX 78703.",
    eta: "2 min drive",
    drivingDistance: "0.3 mi away",
    icon: Utensils,
    color: "bg-lime-100 text-lime-700 border-lime-200",
  },
  {
    id: "terry-blacks",
    name: "Terry Black's BBQ",
    category: "Dining",
    lat: 30.259861,
    lon: -97.754965,
    description: "1003 Barton Springs Rd, Austin, TX 78704.",
    eta: "10 min drive",
    drivingDistance: "2.8 mi away",
    icon: Utensils,
    color: "bg-red-100 text-red-700 border-red-200",
  },
  {
    id: "leroy-lewis",
    name: "LeRoy and Lewis Barbecue",
    category: "Dining",
    lat: 30.2103173,
    lon: -97.7872144,
    description: "5621 Emerald Forest Dr, Austin, TX 78745.",
    eta: "18 min drive",
    drivingDistance: "7.7 mi away",
    icon: Utensils,
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    id: "la-barbecue",
    name: "L.A. Barbecue",
    category: "Dining",
    lat: 30.254498,
    lon: -97.7176151,
    description: "2401 E Cesar Chavez St, Austin, TX 78702.",
    eta: "14 min drive",
    drivingDistance: "4.6 mi away",
    icon: Utensils,
    color: "bg-rose-100 text-rose-700 border-rose-200",
  },
  {
    id: "mozarts",
    name: "Mozart's Coffee Roasters",
    category: "Coffee",
    lat: 30.2952334,
    lon: -97.7843815,
    description: "3825 Lake Austin Blvd, Austin, TX 78703.",
    eta: "6 min drive",
    drivingDistance: "1.7 mi away",
    icon: Coffee,
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
  {
    id: "moody-theater",
    name: "Moody Amphitheater",
    category: "Landmark",
    lat: 30.274464,
    lon: -97.736192,
    description: "1401 Trinity St, Austin, TX 78701.",
    eta: "10 min drive",
    drivingDistance: "3.1 mi away",
    icon: Landmark,
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    id: "dkr-stadium",
    name: "Longhorn Stadium",
    category: "Landmark",
    lat: 30.2838412,
    lon: -97.7326229,
    description: "Darrell K Royal-Texas Memorial Stadium, Austin, TX 78712.",
    eta: "10 min drive",
    drivingDistance: "2.8 mi away",
    icon: Landmark,
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    id: "cota",
    name: "Circuit of the Americas",
    category: "Travel",
    lat: 30.135635,
    lon: -97.644044,
    description: "9201 Circuit of the Americas Blvd, Austin, TX 78617.",
    eta: "28 min drive",
    drivingDistance: "17.8 mi away",
    icon: MapPin,
    color: "bg-violet-100 text-violet-700 border-violet-200",
  },
];

const categories = ["All", ...Array.from(new Set(places.map((p) => p.category)))];
function buildMapEmbed(place: Place) {
  return `https://maps.google.com/maps?hl=en&q=${place.lat},${place.lon}&z=14&output=embed`;
}

export default function AustinAirbnbGuestMap() {
  const [selectedId, setSelectedId] = useState<string>("property");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return category === "All" ? places : places.filter((p) => p.category === category);
  }, [category]);

  const selected = filtered.find((p) => p.id === selectedId) ?? filtered[0] ?? places[0];
  const mapUrl = buildMapEmbed(selected);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8efe5_0%,#ead8c3_100%)] p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[360px_1fr]">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Austin Guest Map</CardTitle>
            <p className="text-sm text-slate-600">
              Here are a few of our favorite locations/ popular attractions with a ETA from the studio!
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Filter</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Button
                    key={c}
                    variant={category === c ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => {
                      setCategory(c);
                      const next = (c === "All" ? places : places.filter((p) => p.category === c))[0];
                      if (next) setSelectedId(next.id);
                    }}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filtered.map((place) => {
                const Icon = place.icon;
                const active = selected?.id === place.id;
                return (
                  <button
                    key={place.id}
                    onClick={() => setSelectedId(place.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      active ? "border-slate-900 bg-white shadow-sm" : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <div className={`rounded-xl border p-2 ${place.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{place.name}</div>
                          <div className="mt-1 text-sm text-slate-600">{place.description}</div>
                          <div className="mt-2 text-xs font-medium text-slate-500">
                            {place.eta} | {place.drivingDistance}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        {place.category}
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="overflow-hidden rounded-3xl border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="relative h-[72vh] min-h-[560px] w-full bg-slate-100">
                <iframe
                  key={selected.id}
                  src={mapUrl}
                  title={`Austin map focused on ${selected.name}`}
                  className="h-full w-full border-0"
                  loading="lazy"
                />

                <div className="absolute left-4 top-4 rounded-2xl bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
                  <div className="text-sm font-semibold text-slate-900">{selected.name}</div>
                  <div className="text-xs text-slate-600">
                    {selected.eta} | {selected.drivingDistance}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`rounded-xl border p-2 ${selected.color}`}>
                  <selected.icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-xl">{selected.name}</CardTitle>
                  <p className="text-sm text-slate-600">{selected.category}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-slate-700">{selected.description}</p>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500">ETA</div>
                  <div className="mt-1 font-semibold text-slate-900">{selected.eta}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Driving Distance</div>
                  <div className="mt-1 font-semibold text-slate-900">{selected.drivingDistance}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Coordinates</div>
                  <div className="mt-1 font-semibold text-slate-900">
                    {selected.lat.toFixed(4)}, {selected.lon.toFixed(4)}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
                Next step: replace the placeholder coordinates with your exact Airbnb, parking, grocery, dining, and check-in spots.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
