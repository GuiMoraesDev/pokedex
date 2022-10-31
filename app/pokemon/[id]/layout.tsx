type Props = {
  children: React.ReactNode;
  params: { id: string };
};

export default async function RootLayout({ children, params }: Props) {
  const title = `Pokémon - ${params.id}`;

  return (
    <html className="h-screen w-screen">
      <head>
        <title>{title}</title>
        <script src="https://unpkg.com/phosphor-icons" async defer></script>
      </head>

      <body className="h-screen w-screen">
        {children}
      </body>
    </html>
  );
}
