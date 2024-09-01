import { NavbarSettings } from "../profile/_components/navbar-settings";


interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-background">
            <NavbarSettings/>
            {children}
        </div>
    )
}
export default ProtectedLayout;