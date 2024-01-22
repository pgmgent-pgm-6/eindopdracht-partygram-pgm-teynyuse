import * as yup from "yup";
import { View, Button } from "react-native";
import { useMutation } from "@tanstack/react-query";
import AppTextField from "../Formik/AppTextField";
import ErrorMessage from "@design/Text/ErrorMessage";
import AppForm from "../Formik/AppForm";
import AppSubmitButton from "../Formik/AppSubmitButton";
import { CreateProfileBody, UpdateProfileBody } from "@core/modules/profiles/types";
import React, { useState } from "react";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import ImagePickerDialog from "@design/ImagePicker/ImagePickerDialog";
import { Bucket } from "@core/modules/files/constans";
import { uploadImage } from "@core/modules/files/api";
import { getPublicUrl } from "@core/modules/files/utils";

const getSchema = (options: Options) => {
  return yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    username: yup.string().required(),
  });
};

type Options = {
  showPassword: boolean;
};

const defaultOptions = {
  showPassword: true,
};

type Props<T> = {
  initialValues: T;
  onSuccess: () => void;
  updateMethod: (values: T) => Promise<any>;
  label: string;
  options?: Partial<Options>;
};

const ProfileForm = <T extends CreateProfileBody | UpdateProfileBody>({
  initialValues,
  onSuccess,
  updateMethod,
  label,
  options = {},
}: Props<T>) => {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [showPicker, setShowPicker] = useState(false);
    const { user } = useAuthContext();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSuccess,
  });

  const handleImageUpload = async (base64: string) => {
    setShowPicker(false);
    try {
      const fileName = `${user?.id}/${Date.now()}.jpg`;
      await uploadImage(Bucket.Avatars, fileName, base64);

      const publicImageUrl = getPublicUrl(Bucket.Avatars, fileName);
      setAvatar(publicImageUrl);
    } catch (uploadError) {
      console.error("Error uploading image:", uploadError);
    }
  };

const handleSubmit = async (values: T) => {
  if (avatar) {
    values.avatar = avatar;
  }
  mutate(values);
};

  const formOptions = { ...defaultOptions, ...options };

  return (
    <AppForm
      initialValues={{ ...initialValues }}
      validationSchema={getSchema(formOptions)}
      onSubmit={handleSubmit}
    >
      <View>
        {isError && <ErrorMessage error={error} />}
        <Button title="Kies een avatar" onPress={() => setShowPicker(true)} />
        {showPicker && (
          <ImagePickerDialog
            onDismiss={() => setShowPicker(false)}
            onImage={handleImageUpload}
          />
        )}
        <AppTextField name="username" label="Username" disabled={isPending} />
        <AppTextField
          name="first_name"
          label="First name"
          disabled={isPending}
        />
        <AppTextField name="last_name" label="Last name" disabled={isPending} />
        <AppSubmitButton disabled={isPending}>{label}</AppSubmitButton>
      </View>
    </AppForm>
  );
};

export default ProfileForm;
