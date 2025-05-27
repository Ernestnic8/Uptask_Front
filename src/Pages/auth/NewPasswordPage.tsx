import { useState } from "react";
import NewPasswordForm from "@components/Auth/NewPasswordForm";
import NewPasswordToken from "@components/Auth/NewPasswordToken";
import type { ConfirmToken } from "@/types/index";

const NewPasswordPage = () => {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Reestablecer Contraseña
      </h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el codigo que recibiste {""}
        <span className=" text-fuchsia-500 font-bold"> por Correo</span>
      </p>
      {isValidToken ? (
        <NewPasswordForm
          token={token}

        />
      ) : (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      )}
    </>
  );
};

export default NewPasswordPage;
