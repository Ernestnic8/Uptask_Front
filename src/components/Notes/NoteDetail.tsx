import type { Note } from "@/types/index";
import { deleteNote } from "@api/noteApi";
import Spinner from "@components/Spinner/Spinner";
import { useAuth } from "@hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@utils/utils";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
  note: Note;
};

const NoteDetail = ({ note }: NoteDetailProps) => {
  const { data, isLoading } = useAuth();
  const queryClient = useQueryClient();
  const canDelete = useMemo(
    () => data?._id === note.createdBy._id,
    [data, note.createdBy._id]
  );
  const params = useParams();
  const projectId = params.projectId!;
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por{" "}
          <span className="font-bold">{note.createdBy.name}</span>{" "}
        </p>
        <p className="text-xs text-slate-500">{formatDate(note.createdAt)}</p>
      </div>
      {canDelete && (
        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 text-white p-2 text-xs font-bold cursor-pointer transition-colors"
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
        >
          Eliminar
        </button>
      )}
    </div>
  );
};

export default NoteDetail;
