import React, { useState } from "react";
import { View, Button } from "react-native";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import AppForm from "@shared/Formik/AppForm";
import AppTextField from "@shared/Formik/AppTextField";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import ErrorMessage from "@design/Text/ErrorMessage";
import ImagePickerDialog from "@design/ImagePicker/ImagePickerDialog";
import { getPublicUrl } from "@core/modules/files/utils";
import { CreateStoryBody, UpdateStoryBody } from "@core/modules/stories/types";
import { Bucket } from "@core/modules/files/constans";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { uploadImage } from "@core/modules/files/api";

const schema = yup.object().shape({
  user: yup.string(),
});

type Props<T, U> = {
  initialValues: T;
  onSuccess: (data: U) => void;
  updateMethod: (values: T) => Promise<U>;
  user: string;
  label: string;
};

const StoryForm = <T extends CreateStoryBody | UpdateStoryBody, U>({
  label,
  initialValues,
  onSuccess,
  updateMethod,
}: Props<T, U>) => {

  const [image, setImage] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const { user } = useAuthContext();

  const { mutate, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSuccess,
  });

const handleImageUpload = async (base64: string) => {
  setShowPicker(false);
  try {
    const fileName = `${user?.id}/${Date.now()}.jpg`;
    await uploadImage(Bucket.Stories, fileName, base64);

    const publicImageUrl = getPublicUrl(Bucket.Stories, fileName);
    setImage(publicImageUrl);
  } catch (uploadError) {
    console.error("Error uploading image:", uploadError);
  }
};

const handleSubmit = async (values: T) => {
  if (image) {
    values.image = image;
  }
  mutate(values);
};
  return (
    <AppForm
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <View>
        {isError && <ErrorMessage error={error} />}
        <Button title="Kies Foto" onPress={() => setShowPicker(true)} />
        {showPicker && (
          <ImagePickerDialog
            onDismiss={() => setShowPicker(false)}
            onImage={handleImageUpload}
          />
        )}

        <AppSubmitButton>{label}</AppSubmitButton>
      </View>
    </AppForm>
  );
};

export default StoryForm;
