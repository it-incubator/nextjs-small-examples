'use client'


import React, {Suspense} from "react";
import {RickAndMortyFreshList} from "@/features/rick-and-morty/ui/rick-and-morty-fresh-list";

export default function RickAndMortyPage({params}: any) {

  return (
    <div>
        <h2>Public RickAndMortyFreshList without server preloading</h2>
        <Suspense fallback={<div>Loading...</div>}>
      <RickAndMortyFreshList />
        </Suspense>
    </div>
  );
}
