import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";
import { Variables } from "@style";
import Like from "@design/Button/Like";

type Props = {
  disabled?: boolean;
};


const AppLikeButton = ({ disabled }: Props) => {
  const { handleSubmit, isValid } = useFormikContext();
  return (
    <Like
      style={styles.button}
      onPress={handleSubmit}
      disabled={disabled || !isValid}
    >
    </Like>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: Variables.sizes.xs,
    width: "100%",
  },
});

export default 
  AppLikeButton;
