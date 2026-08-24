import React from "react";
import { View } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <StyledView className={`bg-paper border border-line rounded-md overflow-hidden ${className}`}>
      {children}
    </StyledView>
  );
}
