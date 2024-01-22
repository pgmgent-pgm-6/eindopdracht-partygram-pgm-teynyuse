import { useFormikContext } from "formik";
import { StyleSheet } from "react-native";
import { Variables } from "@style";
import Send from "@design/Button/Send";

type Props = {
};

const AppSendButton = () => {
  const { handleSubmit, isValid } = useFormikContext();
  return (
    <Send
      style={styles.button}
      onPress={handleSubmit}
    >
    </Send>
  );
};

const styles = StyleSheet.create({
});

export default AppSendButton;
