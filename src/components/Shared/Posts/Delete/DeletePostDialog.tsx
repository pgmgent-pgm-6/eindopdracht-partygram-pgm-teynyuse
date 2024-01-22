import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { deletePost } from "@core/modules/posts/api";
import AlertDialog from "@design/Dialog/AlertDialog";

type Props = {
  id: number;
  onDismiss: () => void;
  onDelete: () => void;
};

const DeletePostDialog = ({ id, onDismiss, onDelete }: Props) => {
  const { mutate, isError, error } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => onDelete(),
  });

  const handleDelete = () => {
    mutate(id);
  };

  useEffect(() => {
    if (isError) {
      alert(error);
    }
  }, [isError]);

  return (
    <AlertDialog
      title="Remove post"
      description="Are you sure you want to remove this post?"
      onDismiss={onDismiss}
      onAction={handleDelete}
      actionText="Delete"
    />
  );
};

export default DeletePostDialog;
