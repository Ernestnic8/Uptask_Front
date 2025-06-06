import { Link, Navigate, Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Logo from "@components/Logo";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@hooks/useAuth";
import Spinner from "@components/Spinner/Spinner";

const AppLayout = () => {
  const { data, isError, isLoading } = useAuth();
  if (isLoading) return <Spinner/>;
  if (isError) {
    return <Navigate to="/auth/login" />;
  }
  if (data)
    return (
      <>
        <header className="bg-gray-800 text-white py-5">
          <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
            <div className="w-64">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <NavMenu name={data.name} />
          </div>
        </header>
        <main className=" max-w-screen-2xl mx-auto mt-10 p-5">
          <Outlet />
        </main>
        <footer className="bg-gray-800 text-white py-5">
          <p className="text-center">
            Todos los derechos reservados {new Date().getFullYear()}
          </p>
        </footer>
      </>
    );
};

export default AppLayout;
