import { LanguageProvider } from '@/contexts/LanguageContext'

export default function LivreDorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <LanguageProvider>{children}</LanguageProvider>
}
