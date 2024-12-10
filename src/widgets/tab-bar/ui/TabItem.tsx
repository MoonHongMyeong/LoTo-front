import { Link } from 'react-router-dom'
import { TabItem as TabItemType } from '../model/types'

interface TabItemProps extends TabItemType {
    isActive: boolean
}

export const TabItem = ({ path, label, icon, isActive }: TabItemProps) => {
    return(
        <Link to={path}
            className={`
                flex flex-col items-center justify-center
                w-full h-full
                no-underline
                select-none
                ${isActive ? 'text-primary' : 'text-gray-500'}
            `}
        >
            <div className="w-5 h-5">
                {icon(isActive)}
            </div>
            <span className="text-[10px] mt-0.5">{label}</span>
        </Link>
    )
}