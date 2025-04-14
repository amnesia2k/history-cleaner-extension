# 🧹 History Cleaner

A simple Chrome Extension that lets you _search_ and _delete_ your browser history using a **keyword**. No fluff, just clean, focused productivity.

## 🚀 Features

- 🔎 Search your Chrome browsing history by keyword
- 🧼 Instantly delete all matching entries (based on URL or title)
- 📦 Lightweight and fast — perfect for quick cleaning

## 🛠 How It Works

1. **User Interface**  
   A minimal popup with:

   - An input field to enter the keyword.
   - A button to trigger deletion.

2. **Logic (App.tsx)**

   - Listens for a click on the delete button.
   - Searches your history using `chrome.history.search()`.
   - Filters items matching the keyword (in title or URL).
   - Deletes each match using `chrome.history.deleteUrl()`.

3. **Permissions**
   - Requires `"history"` permission in `manifest.json`.

## 🧪 Getting Started

1. **Clone the repo or download the files**

2. **Install Dependencies:**

   ```bash
      pnpm install
   ```

3. **Build your project:**

   ```bash
      pnpm build
   ```

4. **Load the extension into Chrome:**

   - Go to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked**
   - Select the `dist` folder inside your project directory

5. **Use the extension:**

   - Click the extension icon
   - Type a keyword (e.g., `twitter`)
   - Hit **Delete Matches**
   - Watch your history get ✨yeeted✨

## 📜 Manifest (v3)

### Feel free to edit

```json
{
  "manifest_version": 3,
  "name": "History Cleaner",
  "version": "2.0",
  "description": "A Chrome extension to clear browsing history.",
  "permissions": ["history"],
  "action": {
    "default_popup": "index.html"
  }
}
```

## ⚠️ Disclaimer

This extension deletes history permanently.  
There is **no undo**, so be sure before you click!

## 💡 Ideas for Future Updates

- 🔁 Add option to delete history from a specific time range
- 🧠 Save frequently used keywords
- 🎨 Dark mode popup UI
- 🕵️‍♂️ Keyword suggestions based on frequent visits

## 🧑‍💻 Built With

- ReactJS
- TailwindCSS
- Chrome Extensions API (Manifest V3)

## 🙌 Contributing

Feel free to fork and suggest improvements. PRs welcome!

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
