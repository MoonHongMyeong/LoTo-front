import { LogoutButton } from '@/features/auth/ui/LogoutButton'

export const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="h-16 bg-primary shadow-sm z-10">
        <div className="flex items-center justify-between px-4 h-full">
          <h1 className="text-lg font-bold text-white">LoTo</h1>
          <div className="flex items-center gap-2">
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
    </div>
  )
}
