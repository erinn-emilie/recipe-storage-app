import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Recipe } from "../../context/RecipeContext";

interface Props{
    recipe: Recipe;
    editing: boolean;
}
export default function NotesTab( {recipe, editing }: Props){
    const { colors } = useTheme(); 
    return (
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 10, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Chef Notes</Text>
          <View style={{ backgroundColor: "#FFFBF5", borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
            <Text style={{ margin: 0, fontSize: 14, color: "#1A1410", fontStyle: "italic", fontFamily: "'Fraunces', serif" }}>{recipe.notes}</Text>
          </View>
          {recipe.origUrl != "personal" && (
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 10, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Source</Text>
              <View style={{ backgroundColor: `${colors.primary}10`, borderRadius: 12, paddingTop: 12, paddingBottom: 14, paddingLeft: 14, paddingRight: 14, alignItems: "center", gap: 10 }}>
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}><Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Svg>
                <Text style={{ margin: 0, fontSize: 12, color: colors.textSoft }}>{recipe.origUrl}</Text>
              </View>
            </View>
          )}
          <View style={{ marginTop: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Tags</Text>
            <View style={{  flexWrap: "wrap", gap: 8 }}>
              {(recipe.tags != null) && recipe.tags.split(',').map((t) => (
                <Text key={t} style={{ backgroundColor: `${colors.primary}12`, color: colors.textSoft, paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14, borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{t}</Text>
              ))}
            </View>
          </View>
        </View>
    )
}