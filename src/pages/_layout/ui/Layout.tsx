import { useMediaQuery } from '@shared/lib/hooks/useMediaQuery'
import { MobileLayout } from './MobileLayout'
import { DesktopLayout } from './DesktopLayout'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useMediaQuery('(max-width: 425px)')
  
  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <DesktopLayout>{children}</DesktopLayout>
  )
}
