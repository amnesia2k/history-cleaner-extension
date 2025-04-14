import { useState } from "react";

export default function App() {
  const [keyword, setKeyword] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<string>("");
  const [deleteStatus, setDeleteStatus] = useState<string>("");
  const [matchCount, setMatchCount] = useState<number | null>(null);
  const [matches, setMatches] = useState<chrome.history.HistoryItem[]>([]);

  const handleSearch = () => {
    if (!keyword.trim()) {
      alert("Enter a keyword first.");
      return;
    }

    const fourYearsAgo = Date.now() - 4 * 365 * 24 * 60 * 60 * 1000;
    console.log("🕵️ Searching for keyword:", keyword);

    chrome.history.search(
      { text: keyword, maxResults: 10000, startTime: fourYearsAgo },
      (items: chrome.history.HistoryItem[]) => {
        console.log("📦 Total items returned from search():", items.length);
        console.log("=== Raw items returned ===");
        console.log(items);

        const filtered = items.filter(
          (item) =>
            item.title?.toLowerCase().includes(keyword.toLowerCase()) ||
            item.url?.toLowerCase().includes(keyword.toLowerCase())
        );

        console.log("🔍 Matching items to be deleted:", filtered.length);
        console.log(filtered);

        setMatches(filtered);
        setMatchCount(filtered.length);
        setSearchStatus(`Found ${filtered.length} matching history item(s).`);
        setDeleteStatus(""); // Clear old delete message
      }
    );
  };

  const handleDelete = () => {
    console.log("🧨 Starting deletion...");

    const count = matches.length;

    matches.forEach((item) => {
      if (item.url) {
        console.log("⏳ Deleting:", item.url);
        chrome.history.deleteUrl({ url: item.url }, () => {
          console.log(`✅ Deleted: ${item.url}`);
        });
      } else {
        console.warn("⚠️ Skipped item with no URL:", item);
      }
    });

    setDeleteStatus(`✅ Deleted ${count} item(s) from history.`);
    setSearchStatus(""); // Clear old search message
    setMatchCount(null);
    setMatches([]);
    setKeyword("");
  };

  return (
    <div className="w-80 p-4 bg-white text-center font-sans">
      <h1 className="text-xl font-bold mb-2">🧹 History Cleaner</h1>

      <input
        className="w-full px-3 py-2 border border-gray-300 rounded mb-3 text-sm"
        placeholder="Enter keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        onClick={handleSearch}
      >
        Search History
      </button>

      {(searchStatus || deleteStatus) && (
        <div className="mt-4">
          {/* Show search OR delete status */}
          {searchStatus && (
            <p className="text-sm text-gray-700">{searchStatus}</p>
          )}
          {deleteStatus && (
            <p className="text-sm text-green-700">{deleteStatus}</p>
          )}

          {matchCount !== null && matchCount > 0 && (
            <button
              className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              onClick={handleDelete}
            >
              ✅ Confirm Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
