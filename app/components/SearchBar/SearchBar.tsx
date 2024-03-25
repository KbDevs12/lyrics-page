"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Song {
  id: number;
  title: string;
  artist: { name: string };
  album: { cover_medium: string };
}

export default function Search(): JSX.Element {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Song[]>([]);
  const [lyrics, setLyrics] = useState<string>("");
  const [selectedLyrics, setSelectedLyrics] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string>("");

  const [copyButtonText, setCopyButtonText] = useState<string>("Salin Lirik");

  const [cachedResults, setCachedResults] = useState<Record<string, Song[]>>(
    {}
  );

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchData = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      if (cachedResults[query]) {
        setResults(cachedResults[query]);
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

    if (query.trim().length >= 2) {
      timeoutId = setTimeout(() => {
        fetchData();
      }, 1000);
    } else {
      setResults([]);
    }

    return () => clearTimeout(timeoutId);
  }, [query, cachedResults]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  const fetchLyrics = async (artist: string, title: string) => {
    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${artist}/${title}`
      );
      const data = await response.json();

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

  const handleResultClick = (artist: string, title: string, cover: string) => {
    fetchLyrics(artist, title);
    setSelectedImage(cover);
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
        className="search-bar text-white px-8 mx-8"
      />
      {query.trim() !== "" && (
        <div className="mt-4">
          {results.map((result) => (
            <div
              key={result.id}
              onClick={() =>
                handleResultClick(
                  result.artist.name,
                  result.title,
                  result.album.cover_medium
                )
              }
              className="border-b-2 border-b-red-600 cursor-pointer p-2 rounded-lg hover:bg-red-600 pb-2 mb-4 mx-4"
            >
              <div className="flex flex-row pb-4 px-4">
                <Image
                  width={100}
                  height={100}
                  src={result.album.cover_medium}
                  alt=""
                />
                <div className="w-80 text-left pt-3 px-4">
                  <p className="text-xl">{`${result.title}`}</p>
                  <p className=" text-gray-500">{`${result.artist.name}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {(selectedLyrics || lyrics) && (
        <div className="mt-8 mb-10">
          {selectedImage && (
            <Image
              width={100}
              height={100}
              src={selectedImage}
              alt=""
              className="mx-auto pb-2 rounded-lg"
            />
          )}
          <h2 className="text-center pb-6 text-xl">{title}</h2>
          <pre className="whitespace-pre-wrap px-4">
            {selectedLyrics || lyrics}
          </pre>
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
