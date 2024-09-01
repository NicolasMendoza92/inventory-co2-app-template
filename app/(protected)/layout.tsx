import { NavbarSettings } from "./_components/navbar-settings";


interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = ({children}: ProtectedLayoutProps) => {
    return (
        <div className=" w-full flex flex-col gap-y-10 items-center justify-center bg-background">
            <NavbarSettings/>
            {children}
        </div>
    )
}
export default ProtectedLayout;