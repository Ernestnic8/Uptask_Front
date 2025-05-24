import Logo from "@components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Flip } from "react-toastify";

const AuthLayout = () => {
  return (
    <>
      <div className="bg-gray-700 min-h-screen">
        <div className="py-10 lg:py-20 mx-auto w-[450px]">
          <Logo />
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </>
  );
};

export default AuthLayout;
