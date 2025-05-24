import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/projectApi";
import { toast } from "react-toastify";
import EditProjectForm from "@/components/Projects/EditProjectForm";

const EditProjectPage = () => {
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
    return <EditProjectForm data={data} projectId={projectId} />;
  }
};

export default EditProjectPage;
