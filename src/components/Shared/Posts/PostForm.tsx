import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text, Switch } from "react-native";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import AppForm from "@shared/Formik/AppForm";
import AppTextField from "@shared/Formik/AppTextField";
import AppSubmitButton from "@shared/Formik/AppSubmitButton";
import ErrorMessage from "@design/Text/ErrorMessage";
import ImagePickerDialog from "@design/ImagePicker/ImagePickerDialog";
import { getPublicUrl } from "@core/modules/files/utils";
import { CreatePostBody, UpdatePostBody } from "@core/modules/posts/types";
import { Bucket,} from "@core/modules/files/constans";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import * as Location from "expo-location";



import { uploadImage } from "@core/modules/files/api";

// Validation schema voor de formuliergegevens
const schema = yup.object().shape({
  description: yup.string().required("Description is required"),
  location: yup.string(),
  user: yup.string(),
});

type Props<T, U> = {
  initialValues: T;
  onSuccess: (data: U) => void;
  updateMethod: (values: T) => Promise<U>;
  label: string;
  user: string;
};

const getReadableAddress = async (location) => {
  let [result] = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
  return `${result.city}, ${result.country}`;
};

const PostForm = <T extends CreatePostBody | UpdatePostBody, U>({
  initialValues,
  onSuccess,
  updateMethod,
  label,
}: Props<T, U>) => {
  const [image, setImage] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  const [location, setLocation] = useState();
  const [shareLocation, setShareLocation] = useState(false);
  const [address, setAdress] = useState("");
  const { user } = useAuthContext();

  const { mutate, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSuccess,
  });

  const formikRef = useRef();

useEffect(() => {
  const getPermissionsAndLocation = async () => {
    if (shareLocation) {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      let address = await getReadableAddress(currentLocation);
      setAdress(address);
      if (formikRef.current) {
        formikRef.current.setFieldValue("location", address);
      }
    } else {
      setAdress(""); // Reset het adres naar een lege string
      if (formikRef.current) {
        formikRef.current.setFieldValue("location", ""); // Reset Formik veld
      }
    }
  };

  getPermissionsAndLocation();
}, [shareLocation]);

  const handleImageUpload = async (base64: string) => {
    setShowPicker(false);
    try {
      const fileName = `${user?.id}/${Date.now()}.jpg`;
      await uploadImage(Bucket.Posts, fileName, base64);

      const publicImageUrl = getPublicUrl(Bucket.Posts, fileName);
      setImage(publicImageUrl);
    } catch (uploadError) {
      console.error("Error uploading image:", uploadError);
    }
  };

  const handleSubmit = async (values: T) => {
    console.log("Formulierwaarden bij verzending:", values);
    if (image) {
      values.image = image;
    }
    mutate(values);
  };
  return (
    <AppForm
      initialValues={{
        ...initialValues,
        location: address || initialValues.location,
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
      innerRef={formikRef} // Voeg ref toe aan AppForm
    >
      <View>
        {isError && <ErrorMessage error={error} />}
        <AppTextField name="description" label="Description" />
        <AppTextField
          name="location"
          label="Location"
          value={address ? address : ""}
          editable={false}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Deel locatie</Text>
          <Switch value={shareLocation} onValueChange={setShareLocation} />
        </View>

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
