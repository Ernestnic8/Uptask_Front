import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProjectById } from "@/api/projectApi";
import { toast } from "react-toastify";
import AddTaskModal from "@components/tasks/AddTaskModal";
import TaskList from "@components/tasks/TaskList";
import EditTaskData from "@components/tasks/EditTaskData";
import TaskModalDetails from '@components/tasks/TaskModalDetail';

const ProjectDetailsPages = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["projectById", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading) return <p>Cargando...</p>;
  if (isError) {
    toast.error(error.message);
    return <Navigate to="/" />;
  }
  if (data) {
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>
        <nav className="my-5 flex gap-3">
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-10 rounded mt-5 inline-block text-xl cursor-pointer transition-colors"
            onClick={() => navigate("?newTask=true")}
          >
            Agregar Tarea
          </button>
        </nav>
        <TaskList tasks={data.task} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails/>
      </>
    );
  }
};

export default ProjectDetailsPages;
