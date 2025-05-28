import type { TeamMember } from "@/types/index";
import { addUserToProject } from "@api/teamAPi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
  user: TeamMember;
  reset: () => void;
};

const SearchResult = ({ user, reset }: SearchResultProps) => {
  const params = useParams();
  const projectId = params.projectId!;
  const queryClient = useQueryClient();
  const id = user._id;

  const { mutate } = useMutation({
    mutationFn: addUserToProject,
    onSuccess: (data) => {
      toast.success(data);      
      queryClient.invalidateQueries({ queryKey: ["projectTeam", projectId] });
      reset()
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleAddUser = () => {
    const data = {
      projectId,
      id,
    };
    mutate(data);
  };

  return (
    <>
      <p className="mt-2 text-center font-bold">Resultado:</p>
      <div className="flex items-center justify-between mt-5">
        <p>{user.name}</p>
        <button
          className="text-purple-600 hover:bg-purple-200 px-10 py-3 font-bold cursor-pointer"
          onClick={handleAddUser}
        >
          Agregar al proyexto
        </button>
      </div>
    </>
  );
};

export default SearchResult;
