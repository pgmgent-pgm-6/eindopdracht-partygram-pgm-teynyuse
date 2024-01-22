import * as yup from "yup";
import { View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import AppTextField from "../Formik/AppTextField";
import ErrorMessage from "@design/Text/ErrorMessage";
import AppForm from "../Formik/AppForm";
import AppSubmitButton from "../Formik/AppSubmitButton";
import { CreateUserBody, UpdateUserBody } from "@core/modules/auth/types";

const getSchema = (options: Options) => {
  return yup.object().shape({
    email: yup
      .string()
      .email("Ongeldig e-mailformaat")
      .required("E-mail is vereist")
      .matches(
        /@(student\.)?arteveldehs\.be$/,
        "E-mail moet eindigen op @student.arteveldehs.be of @arteveldehs.be"
      ),
    ...(options.showPassword
      ? { password: yup.string().min(8).required("Wachtwoord is vereist") }
      : {}),
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

const UserForm = <T extends CreateUserBody | UpdateUserBody>({
  initialValues,
  onSuccess,
  updateMethod,
  label,
  options = {},
}: Props<T>) => {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updateMethod,
    onSuccess: onSuccess,
  });

  const handleSubmit = async (values: T) => {
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
        <AppTextField
          name="email"
          label="Email"
          autoComplete="email"
          keyboardType="email-address"
          disabled={isPending}
          placeholder="student.arteveldehs.be of @arteveldehs.be "
        />
        {formOptions.showPassword && (
          <AppTextField name="password" label="Password" secureTextEntry={true} disabled={isPending} />
        )}
        <AppSubmitButton disabled={isPending}>{label}</AppSubmitButton>
      </View>
    </AppForm>
  );
};

export default UserForm;
