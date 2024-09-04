import Footer from "@/components/Footer";
import Header from "@/components/header/Header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16">{children}</main>
      <Footer />
    </div>
  );
};
export default AuthLayout;
