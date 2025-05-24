import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ProjectForm from "@components/Projects/ProjectForm";
import type { ProjectFormData } from "@/types";
import { createProject } from "@/api/projectApi";
import { toast } from "react-toastify";

const CreateProjectPage = () => {
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();
  
  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/");
    },
  });

  const handleForm = async (data: ProjectFormData) => {
    await mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-5xl font-black">Crear proyecto</h1>
      <p className="text-2xl font-light text-gray-500 mt-5">
        Llena el formulario para crear un nuevo proyecto
      </p>
      <nav>
        <Link
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-10 rounded mt-5 inline-block text-xl cursor-pointer transition-colors"
          to="/"
        >
          Volver a Proyecto
        </Link>
      </nav>

      <form
        className="mt-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <ProjectForm register={register} errors={errors} />
        <input
          type="submit"
          value="Crear Proyecto"
          className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold p-3  rounded w-full text-xl cursor-pointer transition-colors uppercase "
        />
      </form>
    </div>
  );
};

export default CreateProjectPage;
