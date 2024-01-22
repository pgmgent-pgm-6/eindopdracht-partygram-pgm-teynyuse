import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "@design/Text/ErrorMessage";
import { CreateLikeBody, UpdateLikeBody } from "@core/modules/likes/types";
import AppForm from "@shared/Formik/AppForm";
import AppLikeButton from "@shared/Formik/AppLikeButton";
import { createLike, checkLiked } from "@core/modules/likes/api";

const schema = yup.object().shape({
  post_id: yup.number(),
  liker_id: yup.string(),
});

type Props<T, U> = {
  post_id: number;
  liker_id: string;
  onSuccess: (data: U) => void;
  initialValues: T;
};

const CreateLike = <T extends CreateLikeBody | UpdateLikeBody, U>({
  post_id,
  liker_id,
  onSuccess,
  initialValues,
}: Props<T, U>) => {
  const queryClient = useQueryClient();

  const { mutate, isError, error } = useMutation({
    mutationFn: createLike,
    onSuccess: (data) => {

      queryClient.invalidateQueries({ 
        queryKey: ["likes", post_id, liker_id] });
      if (onSuccess) {
        onSuccess(data);
      }
    },
  });

  const { data: likesData, isLoading: isLoadingLikes } = useQuery({
    queryFn: () => checkLiked(post_id, liker_id),
    queryKey: ["likes", post_id, liker_id],
  });

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!isLoadingLikes && likesData) {
      setIsLiked(likesData.length > 0);
    }
  }, [likesData, isLoadingLikes]);

  const handleSubmit = (values:any) => {
    mutate(values);
  };

  return (
    <View>
      <AppForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <ErrorMessage error={error} />
        <AppLikeButton disabled={isLiked}></AppLikeButton>
      </AppForm>
    </View>
  );
};

export default CreateLike;
