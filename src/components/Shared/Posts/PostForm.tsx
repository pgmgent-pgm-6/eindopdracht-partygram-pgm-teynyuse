import React, { useState } from "react";
import { View, Button } from "react-native";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import AppForm from "@shared/Formik/AppForm";
import AppTextField from "@shared/Formik/AppTextField";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import ErrorMessage from "@design/Text/ErrorMessage";
import ImagePickerDialog from "@design/ImagePicker/ImagePickerDialog";
import { CreatePostBody, UpdatePostBody } from "@core/modules/posts/types";

// Hier veronderstellen we dat je een uploadImage functie hebt
import { uploadImage } from "@core/modules/files/api";

// Validation schema voor de formuliergegevens
const schema = yup.object().shape({
  description: yup.string().required("Description is required"),
  location: yup.string(),
  image: yup.string(),
  user: yup.string(),
});

type Props<T, U> = {
  initialValues: T;
  onSuccess: (data: U) => void;
  updateMethod: (values: T) => Promise<U>;
  label: string;
  user: string;
};

const PostForm = <T extends CreatePostBody | UpdatePostBody, U>({
  initialValues,
  onSuccess,
  updateMethod,
  label,
  user,
}: Props<T, U>) => {
  const [image, setImage] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);
  const { mutate, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSuccess,
  });

  const handleImageUpload = async (base64: string) => {
    setShowPicker(false);
    try {
      const bucket = "your-bucket-name"; // Vervang dit met je bucket naam
      const filename = `posts/${Date.now()}-image.png`; // Voorbeeld bestandsnaam
      const uploadedImage = await uploadImage(bucket, filename, base64);
      setImage(uploadedImage.Key); // Pas aan indien nodig
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
        <AppTextField name="description" label="Description" />
        <AppTextField name="location" label="Location" />
        <AppTextField name="image" label="Image" value={image || ""} />

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

export default PostForm;
