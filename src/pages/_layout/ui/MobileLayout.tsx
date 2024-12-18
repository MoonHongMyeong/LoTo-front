import { TabBar } from "@/widgets/tab-bar"

export const MobileLayout = ({children}: {children: React.ReactNode}) => {

    return (
        <div className="min-h-screen max-w-[425px] mx-auto bg-gray-100 relative">
            <header className="sticky top-0 left-0 right-0 h-12 bg-primary shadow-sm z-10">
                <div className="flex items-center justify-between px-4 h-full">
                    <h1 className="text-lg font-bold text-white">LoTo</h1>
                </div>
            </header>

            <main className="min-h-[calc(100vh-48px)]">
                {children}
            </main>

            <TabBar/>
        </div>
    )
}