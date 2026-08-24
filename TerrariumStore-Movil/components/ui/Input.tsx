import React, { forwardRef } from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledInput = styled(TextInput);

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <StyledView className="flex-col w-full mb-4">
        {label && (
          <StyledText className="font-body text-sm font-medium text-ink mb-1">
            {label}
          </StyledText>
        )}
        <StyledInput
          ref={ref}
          className={`px-3 py-3 rounded-sm border font-body text-base text-ink bg-paper focus:border-lime ${
            error ? "border-vet" : "border-line"
          } ${className}`}
          placeholderTextColor="#667068"
          {...props}
        />
        {error && (
          <StyledText className="font-body text-xs text-vet mt-1">
            {error}
          </StyledText>
        )}
      </StyledView>
    );
  }
);

Input.displayName = "Input";
