// src/components/SearchBar.js
'use client';
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";


export const Search = ({...props}) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;
    router.push(query ? `/dashboard?q=${query}` : `/dashboard`);
    console.log('searching for:', query);
  };

  return (
    <form className={`${props.className} form-control`} onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search"
        className="input input-bordered"
      />
    </form>
  );
}