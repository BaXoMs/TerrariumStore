import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export function ClinicalStampBadge({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <StyledView
      className={`border-2 border-vet items-center justify-center bg-vet-soft ${
        isSm ? "px-1.5 py-0.5" : isLg ? "px-4 py-2 border-[3px]" : "px-3 py-1.5"
      } ${className}`}
      style={{ transform: [{ rotate: "-14deg" }] }}
    >
      <StyledText
        className={`font-mono font-bold text-vet uppercase tracking-widest ${
          isSm ? "text-[8px]" : isLg ? "text-base tracking-[4px]" : "text-xs"
        }`}
      >
        Caso Clínico
      </StyledText>
    </StyledView>
  );
}
