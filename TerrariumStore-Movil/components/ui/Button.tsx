import React from "react";
import { Pressable, Text, ActivityIndicator, ViewStyle, TextStyle } from "react-native";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);
const StyledText = styled(Text);

type ButtonProps = {
  onPress?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
};

const VARIANT_STYLES: Record<string, string> = {
  primary: "bg-lime border border-lime",
  secondary: "bg-transparent border border-line",
  danger: "bg-vet border border-vet",
  ghost: "bg-transparent border border-transparent",
  whatsapp: "bg-[#25D366] border border-[#25D366]",
};

const TEXT_STYLES: Record<string, string> = {
  primary: "text-white font-semibold",
  secondary: "text-ink font-semibold",
  danger: "text-white font-semibold",
  ghost: "text-ink font-semibold",
  whatsapp: "text-white font-semibold",
};

const SIZE_STYLES: Record<string, string> = {
  sm: "px-3 py-1.5 rounded-sm",
  md: "px-4 py-2.5 rounded-md",
  lg: "px-6 py-3.5 rounded-md",
};

export function Button({
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  children,
  className = "",
  textClassName = "",
}: ButtonProps) {
  const baseStyle = "flex-row items-center justify-center active:opacity-80";
  const disabledStyle = disabled || loading ? "opacity-50" : "";

  return (
    <StyledPressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseStyle} ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${disabledStyle} ${className}`}
    >
      {loading && <ActivityIndicator size="small" color={variant === "secondary" || variant === "ghost" ? "#1F2320" : "#FFF"} className="mr-2" />}
      <StyledText className={`font-body text-center ${TEXT_STYLES[variant]} ${textClassName}`}>
        {children}
      </StyledText>
    </StyledPressable>
  );
}
