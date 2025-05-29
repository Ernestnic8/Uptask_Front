import type { NoteFormData } from "@/types/index";
import { createNote } from "@api/noteApi";
import ErrorMessage from "@components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddNotesForm = () => {
  const param = useParams();
  const projectId = param.projectId!;
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  const initialValues: NoteFormData = {
    content: "",
  };

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createNote,
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
        toast.success(data);
        reset();
        queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    }
  });

  const handleAddNote = (formData: NoteFormData) => {
    mutate({projectId, taskId, formData});
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddNote)}
      className="space-y-3"
      noValidate
    >
      <div className="flex flex-col gap-2">
        <label className="font-bold" htmlFor="content">
          Crear Nota
        </label>
        <input
          id="content"
          type="text"
          placeholder="Contenido de la nota"
          className="w-full p-3 border border-gray-300 rounded-md"
          {...register("content", {
            required: "El contenido de la nota es obligatorio",
          })}
        />
        {errors.content && (
          <ErrorMessage>{errors.content.message}</ErrorMessage>
        )}
        <input
          type="submit"
          value="Crear Nota"
          className="w-full bg-fuchsia-600 text-white p-3 rounded-md hover:bg-fuchsia-700 transition-colors cursor-pointer font-black"
        />
      </div>
    </form>
  );
};

export default AddNotesForm;
