import {
  ColorValue,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Variables } from "@style";
import { Fontisto } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
  style?: ViewStyle;
  color?: ColorValue;
  disabled?: boolean;
};

const Like = ({ onPress, style, color, disabled = false }: Props) => {
  const iconName = disabled ? "heart" : "heart-alt";

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      android_ripple={{ color: Variables.colors.ripple, foreground: true }}
    >
      <View>
        <Fontisto
          style={styles.icon}
          name={iconName}
          size={20}
          color={disabled ? "red" : "grey"}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});

export default Like;
