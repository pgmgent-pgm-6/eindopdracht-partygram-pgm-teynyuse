import React from "react";
import { View } from "react-native";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@design/Text/ErrorMessage";
import { CreateLikeBody, UpdateLikeBody } from "@core/modules/likes/types";
import AppForm from "@shared/Formik/AppForm";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import { createLike } from "@core/modules/likes/api";

const schema = yup.object().shape({
  post_id: yup.number(),
  liker_id: yup.string(),
});



type Props<T, U> = {
  post_id: number;
  liker_id: string;
  onSuccess: (data: U) => void;
  updateMethod: (values: T) => Promise<U>;
};

const PostForm =  <T extends CreateLikeBody | UpdateLikeBody, U>({
  post_id,
  liker_id,
  onSuccess,
  updateMethod,
}: Props<T, U>) => {
  const { mutate, isError, error } = useMutation({
    mutationFn: createLike,
    onSuccess: onSuccess,
  });

  const initialValues = { post_id, liker_id  };

  const handleSubmit = async (values: T) => {
    mutate(values);
  };
  
  console.log("values",initialValues);

  return (
    <View>
      <AppForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <ErrorMessage error={error} visible={isError} />
        <AppSubmitButton>Like</AppSubmitButton>
      </AppForm>
    </View>
  );
};

export default PostForm;
