import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProjectById } from "@/api/projectApi";
import { toast } from "react-toastify";
import AddTaskModal from "@components/tasks/AddTaskModal";
import TaskList from "@components/tasks/TaskList";
import EditTaskData from "@components/tasks/EditTaskData";
import TaskModalDetails from "@components/tasks/TaskModalDetail";
import Spinner from "@components/Spinner/Spinner";
import { useAuth } from "@hooks/useAuth";
import isManager from "@utils/policies";

const ProjectDetailsPages = () => {
  const { data: user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId!;
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["projectById", projectId],
    queryFn: () => getProjectById(projectId),
    retry: 2,
  });

  if (isLoading && authLoading) return <Spinner />;
  if (isError) {
    toast.error(error.message, { toastId: "error-project-details" });
    return <Navigate to="/" />;
  }
  if (data && user) {
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>

        {isManager(data.manager, user._id) && (
          <nav className="my-5 flex gap-3">
            <button
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-10 rounded mt-5 inline-block text-xl cursor-pointer transition-colors"
              onClick={() => navigate("?newTask=true")}
            >
              Agregar Tarea
            </button>
            <Link
              to={"team"}
              className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-3 px-10 rounded mt-5 inline-block text-xl cursor-pointer transition-colors"
            >
              Colaboradores
            </Link>
          </nav>
        )}

        <TaskList tasks={data.task} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
  }
};

export default ProjectDetailsPages;
