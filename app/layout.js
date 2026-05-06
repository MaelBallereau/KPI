import "./globals.css";

export const metadata = {
  title: "AI Technology Watch — KPI Dashboard",
  description: "Tableau de bord de veille IA — Mael Ballereau",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
