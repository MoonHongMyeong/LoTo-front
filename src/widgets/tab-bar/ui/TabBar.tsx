import { useLocation } from "react-router-dom"
import { TAB_ITEMS } from "../model/config"
import { TabItem } from "./TabItem";

export const TabBar = () => {
    const location = useLocation()

    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-[425px] mx-auto bg-white border-t border-gray-200">
            <div className="flex items-stretch">
                {TAB_ITEMS.map((item) => (
                    <TabItem
                        key={item.path}
                        {...item}
                        isActive={location.pathname === item.path}
                    />
                ))}
            </div>
        </nav>
    )
}
