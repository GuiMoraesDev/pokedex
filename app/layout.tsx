import "../src/styles/global.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>Pokédex</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
