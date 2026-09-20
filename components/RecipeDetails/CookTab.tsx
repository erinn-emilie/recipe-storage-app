
import { useState } from "react";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { View, Pressable, Text } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { Recipe } from "../../context/RecipeContext";

interface Props {
  recipe: Recipe;
  editing: boolean;
}

export default function CookTab({ recipe, editing } : Props){

    const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
    const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);

    const toggleStep = (i: number) => setCheckedSteps((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);
    const toggleIngredient = (i: number) => setCheckedIngredients((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

    const { colors } = useTheme(); 

    return (
        <View>
          <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ margin: 16, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Ingredients</Text>
            {recipe.ingredients.map((ing, i) => (
              <Pressable key={i} onPress={() => toggleIngredient(i)} style={{  alignItems: "center", gap: 12, paddingTop: 9, paddingBottom: 9, paddingLeft: 9, paddingRight: 15, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: colors.border, cursor: "pointer", opacity: checkedIngredients.includes(i) ? 0.4 : 1 }}>
                <View style={{ width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: checkedIngredients.includes(i) ? colors.primary : "#D4C5B0", backgroundColor: checkedIngredients.includes(i) ? colors.primary : "transparent",  alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {checkedIngredients.includes(i) && <Svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={3}><Polyline points="20 6 9 17 4 12"/></Svg>}
                </View>
                <Text style={{ flex: 1, fontSize: 14, color: "#1A1410" }}>{ing}</Text>
              </Pressable>
            ))}
          </View>

          <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 24 }}>
            <Text style={{ marginBottom: 16, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Instructions</Text>
            {recipe.instructions.map((step, i) => (
              <Pressable key={i} onPress={() => toggleStep(i)} style={{  gap: 14, marginBottom: 16, cursor: "pointer", opacity: checkedSteps.includes(i) ? 0.35 : 1 }}>
                <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: checkedSteps.includes(i) ? colors.primary : `${colors.primary}14`,  alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  {checkedSteps.includes(i)
                    ? <Svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={3}><Polyline points="20 6 9 17 4 12"/></Svg>
                    : <Text style={{ fontSize: 12, fontWeight: 700, color: colors.textSoft }}>{i + 1}</Text>}
                </View>
                <Text style={{ margin: 0, fontSize: 14, color: "#1A1410", flex: 1, textDecorationLine: checkedSteps.includes(i) ? "line-through" : "none" }}>{step}</Text>
              </Pressable>
            ))}
          </View>
        </View>
    )
}