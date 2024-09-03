import { NavbarSettings } from "./_components/navbar-settings";


interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return (
        <div className="h-full w-full flex flex-col gap-y-10 mt-6 items-center justify-center">
            <NavbarSettings/>
            {children}
        </div>
    )
}
export default ProtectedLayout;