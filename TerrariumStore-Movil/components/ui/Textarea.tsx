import React, { forwardRef } from "react";
import { TextInput } from "react-native";
import { Input, InputProps } from "./Input";

export const Textarea = forwardRef<TextInput, InputProps>((props, ref) => {
  return (
    <Input
      ref={ref}
      multiline={true}
      numberOfLines={4}
      textAlignVertical="top"
      className="min-h-[100px]"
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
