import "../src/styles/global.css";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({
  children,
}: Props) {
  return (
    <html className="h-screen w-screen">
      <head>
        <title>Pokédex</title>
        <script src="https://unpkg.com/phosphor-icons" async defer></script>
      </head>

      <body className="h-screen w-screen bg-slate-50">{children}</body>
    </html>
  );
}
