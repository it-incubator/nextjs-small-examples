'use client'


import React from "react";
import {RickAndMortyFreshListLazy} from "@/features/rick-and-morty/ui/rick-and-morty-fresh-list-lazy";

export default function RickAndMortyPage({params}: any) {

  return (
    <div>
        <h2>Public RickAndMortyFreshList without server preloading</h2>
      <RickAndMortyFreshListLazy />
    </div>
  );
}
