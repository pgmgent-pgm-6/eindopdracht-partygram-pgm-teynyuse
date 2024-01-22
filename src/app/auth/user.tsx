import useTitle from "@core/hooks/useTitle";
import { createProfile } from "@core/modules/profiles/api";
import DefaultView from "@design/View/DefaultView";
import ProfileForm from "@shared/User/ProfileForm";
import { useRouter } from "expo-router";
import { useAuthContext } from "@shared/Auth/AuthProvider";
import { StatusBar } from "expo-status-bar";

const RegisterScreen = () => {
      const { user } = useAuthContext();

  const router = useRouter();

  return (
    <>
      <DefaultView>
        <ProfileForm
          updateMethod={createProfile}
          onSuccess={() => router.push("/(app)/(tabs)")}
          initialValues={{
            first_name: "",
            last_name: "",
            username: "",
            avatar: null,
            user_id: user?.id,
          }}
          label="Create profile"
        />
      </DefaultView>
      <StatusBar style="light" />
    </>
  );
};

export default RegisterScreen;
