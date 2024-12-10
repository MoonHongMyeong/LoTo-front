export interface TabItem {
    path: string,
    label: string,
    icon: (isActive: boolean) => React.ReactNode,
}   