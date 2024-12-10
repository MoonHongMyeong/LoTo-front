import { HomeIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/outline'
import { HomeIcon as HomeIconSolid, UserGroupIcon as UserGroupIconSolid, UserIcon as UserIconSolid } from '@heroicons/react/24/solid'
import { TabItem } from './types'

export const TAB_ITEMS: TabItem[] = [
  {
    path: '/main',
    label: '홈',
    icon: (isActive) => 
      isActive 
        ? <HomeIconSolid className="w-6 h-6 text-primary" /> 
        : <HomeIcon className="w-6 h-6" />
  },
  {
    path: '/character',
    label: '숙제현황',
    icon: (isActive) => 
      isActive 
        ? <UserGroupIconSolid className="w-6 h-6 text-primary" /> 
        : <UserGroupIcon className="w-6 h-6" />
  },
  {
    path: '/@me',
    label: '프로필',
    icon: (isActive) => 
      isActive 
        ? <UserIconSolid className="w-6 h-6 text-primary" /> 
        : <UserIcon className="w-6 h-6" />
  }
] 