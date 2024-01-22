import CommentField, { TextFieldProps } from "@design/Form/CommentField";
import { useFormikContext } from "formik";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

type Props = Omit<TextFieldProps, "value" | "onChangeText">;

const AppTextField = ({ name, ...rest }: Props) => {
  const { values, errors, touched, setFieldValue, handleBlur } =
    useFormikContext<Record<string, any>>();
  const hasError = errors[name] && touched[name];

  return (
    <CommentField
      name={name}
      value={values[name]}
      onChangeText={(text: string) => setFieldValue(name, text)}
      onBlur={handleBlur(name)}
      error={hasError ? String(errors[name]) : null}
      {...rest}
    />
  );
};




export default AppTextField;
