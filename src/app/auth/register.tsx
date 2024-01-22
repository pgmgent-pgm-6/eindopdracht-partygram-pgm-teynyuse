import useTitle from "@core/hooks/useTitle";
import { createUser } from "@core/modules/auth/api";
import { createProfile } from "@core/modules/profiles/api";
import DefaultView from "@design/View/DefaultView";
import UserForm from "@shared/User/UserForm";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RegisterScreen = () => {
const router = useRouter();

useTitle("Create account");

return (
    <>
    <DefaultView>
        
        <UserForm
        updateMethod={createUser}
        onSuccess={() => router.push("/auth/user")}
        initialValues={{ email: "", password: "", }}
        label="Create account"
        />
    </DefaultView>
    <StatusBar style="light" />
    </>
);
};

export default RegisterScreen;