import './globals.css'

export const metadata = {
  title: 'Brig Consultoria - Sistema de Gestão MEI',
  description: 'Sistema de gestão para microempreendedores individuais',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
