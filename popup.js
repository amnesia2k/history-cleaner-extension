"use strict";

document.getElementById("deleteBtn").addEventListener("click", () => {
  const keyword = document.getElementById("keyword").value;

  if (!keyword) {
    alert("Please enter a keyword to delete.");
    return;
  }

  const allTime = Date.now() - 4 * 365 * 24 * 60 * 60 * 1000;

  chrome.history.search(
    { text: keyword, maxResults: 10000, startTime: allTime },
    (historyItems) => {
      console.log("Total items returned from search():", historyItems.length);
      console.log("Searching for keyword:", keyword);
      console.log("=== Raw items returned ===");
      console.log(historyItems); // <--- Dump everything here

      const matchingUrls = historyItems.filter(
        (item) =>
          item.title?.toLowerCase().includes(keyword.toLowerCase()) ||
          item.url?.toLowerCase().includes(keyword.toLowerCase())
      );

      console.log("Matching items to be deleted:", matchingUrls.length);
      matchingUrls.forEach((item) => {
        console.log("⏳Deleting:", item.url);
        chrome.history.deleteUrl({ url: item.url }, () => {
          console.log(`✅ Deleted: ${item.url}`);
        });
      });

      alert(`${matchingUrls.length} items deleted from history.`);
    }
  );
});
