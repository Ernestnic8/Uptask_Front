import { Link, useNavigate, redirect } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import type { Project, ProjectFormData } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/projectApi";
import { toast } from "react-toastify";

type Props = {
  data: ProjectFormData;
  projectId: Project["_id"];
};

const EditProjectForm = ({ data, projectId }: Props) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProject,
    onError: (error) => {
      toast.error(error.message);
      redirect("/");
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey:["projectById", projectId]});
      queryClient.invalidateQueries({queryKey:["projects"]});
      toast.success(data);
      navigate("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
    },
  });

  const handleForm = (formData: ProjectFormData) => {
    const editData = {
      formData,
      projectId,
    };
    mutate(editData);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el formulario para editar un proyecto
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
            value="Editar Proyecto"
            className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold p-3  rounded w-full text-xl cursor-pointer transition-colors uppercase "
          />
        </form>
      </div>
    </>
  );
};

export default EditProjectForm;
