/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statischer Export -> Ergebnis landet im Ordner "out/"
  // Das ist genau das, was GitHub Pages als Hosting braucht (kein Server nötig).
  output: 'export',

  // Next/Image-Optimierung braucht einen Server – für GitHub Pages deaktivieren.
  images: {
    unoptimized: true,
  },

  // Wichtig für GitHub Pages: saubere URLs als echte Ordner mit index.html ausgeben,
  // damit /work/leona/ auch ohne Server-Rewrite funktioniert.
  trailingSlash: true,

  // Falls die Seite NICHT unter einer eigenen Domain (CNAME), sondern unter
  // https://<username>.github.io/<repo-name>/ liegt, hier den Repo-Namen eintragen,
  // z. B.: basePath: '/tomnuesser-portfolio'
  // Für tomnuesser.com (eigene Domain via CNAME-Datei) bleibt das leer.
  // basePath: '',
};

export default nextConfig;
