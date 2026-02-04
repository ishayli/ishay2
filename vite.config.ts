import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react"; // או @vitejs/plugin-react-swc אם אתה משתמש ב-swc
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// הגדרה מאוחדת אחת בלבד
export default defineConfig({
  // הוספנו את ה-base כאן כדי שזה יעבוד ב-GitHub Pages
  base: '/ishay2/', 
  
  plugins: [
    react(), 
    tailwindcss(), 
    viteSingleFile()
  ],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
