"use client";
import { useState, useEffect } from "react";

interface Song {
  id: number;
  title: string;
  artist: { name: string };
}

export default function Search(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Song[]>([]);
  const [lyrics, setLyrics] = useState<string>("");
  const [selectedLyrics, setSelectedLyrics] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [copyButtonText, setCopyButtonText] = useState<string>("Salin Lirik");

  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(`https://api.lyrics.ovh/suggest/${query}`);
        const data = await response.json();
        setResults(data.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const fetchLyrics = async (artist: string, title: string) => {
    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${artist}/${title}`
      );
      const data = await response.json();
      console.table(data);
      let lyrics = data.lyrics;
      setCopyButtonText("Salin Lirik");

      const lines = lyrics.split("\n");

      if (lines.length > 1 && lines[0].startsWith("Paroles de la chanson")) {
        lines.splice(0, 1);
      }

      lyrics = lines.join("\n");

      setTitle(`${title} - ${artist}`);

      setSelectedLyrics(lyrics);
      setResults([]); // Clear suggestions
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      setSelectedLyrics("");
    }
  };

  const handleResultClick = (artist: string, title: string) => {
    fetchLyrics(artist, title);
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(selectedLyrics || lyrics)
      .then(() => {
        setCopyButtonText("Lirik Disalin");
      })
      .catch(() => alert("Gagal menyalin lirik"));
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Cari lagu..."
        className="search-bar text-white px-4"
      />
      {query.trim() !== "" && (
        <div className="mt-4">
          {results.map((result) => (
            <div
              key={result.id}
              onClick={() =>
                handleResultClick(result.artist.name, result.title)
              }
              className="cursor-pointer p-2 rounded-lg hover:bg-red-600"
            >
              <p>{`${result.title} - ${result.artist.name}`}</p>
            </div>
          ))}
        </div>
      )}
      {(selectedLyrics || lyrics) && (
        <div className="mt-8 mb-10">
          <h2 className="text-center pb-4">{title}</h2>
          <pre>{selectedLyrics || lyrics}</pre>
          <div className="flex justify-center">
            <button
              onClick={handleCopyClick}
              className="border-b-2 border-t-2 border-t-red-600 border-b-red-600 text-white font-bold py-2 px-4 rounded mt-8 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {copyButtonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
