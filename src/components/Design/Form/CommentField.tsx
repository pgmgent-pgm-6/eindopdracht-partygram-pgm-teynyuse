import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import isVoid from "@core/utils/isVoid";
import { DefaultStyles, Variables } from "@style";
import FieldError from "@design/Form/FieldError";
import Label from "@design/Form/Label";

export type TextFieldProps = TextInputProps & {
  name: string;
  value: string;
  label?: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  inputRef?: React.Ref<TextInput>;
  error?: string | null;
};

const CommentField = ({
  name,
  value,
  onChangeText,
  disabled = false,
  inputRef,
  placeholder
}: TextFieldProps) => {
  return (
    <View>
      <View>
        <TextInput
          style={styles.comment}
          value={value}
          editable={!disabled}
          onChangeText={onChangeText}
          ref={inputRef}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  comment:{
    width: 275,
  }
});

export default CommentField;
