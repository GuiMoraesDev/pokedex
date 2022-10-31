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

      <body className="bg-gradient-to-b from-red-700 to-red-600">
        {children}
      </body>
    </html>
  );
}
