import { useState, useEffect } from "react";
import React from "react";
import StarRating from "../StarRating";
import { useTheme } from "../../context/ThemeContext";
import { View, Pressable, Text, Image } from "react-native";
import { Recipe } from "../../context/RecipeContext";


interface Props {
  recipe: Recipe;
  setParentTab: (tab: "cook" | "notes") => void;
  editing: boolean;
}

export default function DetailsHeader({ recipe, setParentTab, editing }: Props) {
    const { colors } = useTheme();
    const [tab, setTab] = useState<"cook" | "notes">("cook");

    useEffect(() => {
        setParentTab(tab);
    }, [tab]);

    const [servings, setServings] = useState(Number(recipe.servings));
    const cookTime = Number(recipe.cookTime);
    const prepTime = Number(recipe.prepTime);
    const totalTime = cookTime + prepTime;
    
    return (
        <View>
            <View style={{ backgroundColor: "#FFFFFF", paddingTop: 14, paddingBottom: 14, paddingLeft: 20, paddingRight: 20, gap: 0, borderBottomWidth: 1, borderBottomColor: colors.border }}>
                <View style={{ alignItems: "flex-start", flexDirection: "row", gap: 16 }}>
                    <MetaStat label="Prep" value={`${recipe.prepTime}m`} />
                    <MetaStat label="Cook" value={totalTime < 60 ? `${recipe.cookTime}m` : `${Math.floor(cookTime / 60)}h ${cookTime % 60 > 0 ? cookTime % 60 + "m" : ""}`} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ margin: 0, fontSize: 10, color: colors.muted, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 500 }}>Servings</Text>
                        <View style={{  flexDirection: "row", alignItems: "flex-start", gap: 8, marginTop: 3 }}>
                            {(editing) && (
                                <Pressable onPress={() => setServings(Math.max(1, servings - 1))} style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: `${colors.primary}18`, borderWidth: 0, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{fontSize: 14, color: colors.primary, fontWeight: 600}}>-</Text>
                                </Pressable>
                            )}
                            <Text style={{ fontSize: 16, fontWeight: 600, color: "#1A1410", minWidth: 20, textAlign: "center" }}>{servings}</Text>
                            {(editing) && (
                                <Pressable onPress={() => setServings(servings + 1)} style={{ width: 22, height: 22, marginBottom: 10, borderRadius: 6, backgroundColor: `${colors.primary}18`, borderWidth: 0, alignItems: "center", justifyContent: "center" }}>
                                    <Text style={{fontSize: 14, color: colors.primary, fontWeight: 600}}>+</Text> 
                                </Pressable>
                            )}
                        </View>
                        <StarRating rating={Number(recipe.rating)} size={14} interactive={true} />
                    </View>
                </View>
            </View>

            <View style={{  backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: colors.border }}>
                {[{ id: "cook", label: "Cook" }, { id: "notes", label: "Notes & Photos" }].map((t) => (
                <Pressable
                    key={t.id}
                    onPress={() => setTab(t.id as any)}
                    style={{
                    padding: 12,
                    backgroundColor: "none",
                    borderWidth: 0,
                    borderBottomWidth: 2,
                    borderBottomColor: tab === t.id ? colors.primary : "transparent",
                    marginBottom: -1,
                    }}
                >
                    <Text style={{ fontSize: 14, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? colors.primary : colors.muted, fontFamily: "'Outfit', sans-serif"}}>{t.label}</Text>
                </Pressable>
                ))}
            </View>
        </View>
    );
}

function MetaStat({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ margin: 0, fontSize: 10, color: colors.muted, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 500 }}>{label}</Text>
      <Text style={{ margin: "3px 0 0", fontSize: 16, fontWeight: 600, color: "#1A1410" }}>{value}</Text>
    </View>
  );
}