import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@design/Text/ErrorMessage";
import { CreateCommentBody, UpdateCommentBody } from "@core/modules/comments/types";
import AppForm from "@shared/Formik/AppForm";
import { createComment  } from "@core/modules/comments/api";
import AppSendButton from "@shared/Formik/AppSendButton";
import AppCommentField from "@shared/Formik/AppCommentField";

const schema = yup.object().shape({
  user_id: yup.string(),
  post_id: yup.number(),
  comment: yup.string(),
});


type Props<T, U> = {
  user_id: string;
  userAvatar: string;
  initialValues: T;
  onSuccess: (data: U) => void;
  label: string;
};

const CreateComment = <T extends CreateCommentBody | UpdateCommentBody, U>({
  userAvatar,
  initialValues,
  onSuccess,
  label,
}: Props<T, U>) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createComment,
    onSuccess: onSuccess,
  });

  const handleSubmit = async (values: any) => {
    mutate(values);
  };


  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <View style={styles.input}>
          <View style={styles.first}>
            <Image
              style={styles.avatar}
              source={{ uri: userAvatar }}
            />
            <AppCommentField
              name="comment"
              placeholder="Type Your Comment..."
              disabled={isPending}
              multiline={true}
            />
          </View>
          <AppSendButton></AppSendButton>
        </View>
      </AppForm>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    padding: 3,
    width: "93%",
    height: 45,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
  }, 
  first:{
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20, // Make it circular
    marginRight: 10,
  },
  input: {
    flexDirection: "row",
    marginTop: 4,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
  },
});

export default CreateComment;
