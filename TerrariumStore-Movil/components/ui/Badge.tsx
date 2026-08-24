import React from "react";
import { View, Text } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export function Badge({ children, className = "", textClassName = "" }: { children: React.ReactNode; className?: string; textClassName?: string }) {
  return (
    <StyledView className={`px-2 py-0.5 rounded-full ${className}`}>
      <StyledText className={`font-mono text-[10px] font-semibold uppercase tracking-widest ${textClassName}`}>
        {children}
      </StyledText>
    </StyledView>
  );
}

export function CareLevelBadge({ level }: { level: "básico" | "intermedio" | "avanzado" }) {
  if (level === "básico") return <Badge className="bg-lime-soft" textClassName="text-lime">Básico</Badge>;
  if (level === "intermedio") return <Badge className="bg-bamboo-soft" textClassName="text-bamboo">Intermedio</Badge>;
  return <Badge className="bg-vet-soft" textClassName="text-vet">Avanzado</Badge>;
}

export function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) return <Badge className="bg-vet-soft" textClassName="text-vet">Agotado</Badge>;
  if (stock <= 3) return <Badge className="bg-bamboo-soft" textClassName="text-bamboo">Últimos {stock}</Badge>;
  return <Badge className="bg-lime-soft" textClassName="text-lime">En stock</Badge>;
}
