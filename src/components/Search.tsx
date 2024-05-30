// src/components/SearchBar.js
'use client';
import React, { ChangeEvent, useState } from "react";
import { useResorts } from "@/context/ResortsContext";


export const Search = () => {
  const [query, setQuery] = useState('');
  const { handleSearch } = useResorts();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query);
    console.log('searching for:', query)
  };

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search"
        className="input input-bordered w-24 md:w-auto"
      />
    </form>
  );
}