import { useState } from "react";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { usePantry } from "../context/PantryContext";
import { View, Pressable, Text, Image, TextInput } from "react-native";
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";
import { Recipe } from "../context/RecipeContext";
import DetailsHeader from "../components/RecipeDetails/DetailsHeader";
import CookTab from "../components/RecipeDetails/CookTab";
import NotesTab from "../components/RecipeDetails/NotesTab";


interface Props {
  recipe: Recipe;
  onBack: () => void;
}

export default function RecipeDetailScreen({ recipe, onBack }: Props) {
  const { colors } = useTheme();
  const { allItems } =  usePantry();
  const [tab, setTab] = useState<"cook" | "notes">("cook");
  const [editing, setEditing] = useState(false);
  

  const [newName, setNewName] = useState("");


  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ position: "relative", height: 220, backgroundColor: "#E8E0D5" }}>
          <Image src={recipe.img} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <View style={{ position: "absolute", inset: 0, backgroundColor: "Linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
            <Pressable onPress={onBack} style={{ position: "absolute", top: 39, left: 16, width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.35)", borderWidth: 0,  alignItems: "center", justifyContent: "center" }}>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2.5}><Path d="M19 12H5"/><Path d="m12 19-7-7 7-7"/></Svg>
            </Pressable>
            <View style={{ position: "absolute", bottom: 16, left: 20, right: 20, backgroundColor: colors.bg, borderRadius: 14 }}>
              <View style={{ padding: 10, alignItems: "center", justifyContent: "flex-end", borderColor: colors.border }} >
                {(!editing) && (
                  <Text style={{ fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: colors.accent, textAlign: "center" }}>{recipe.title}</Text>
                )}
                {(editing) && (
                  <TextInput onChangeText={setNewName} style={{ fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: colors.accent, textAlign: "center", backgroundColor: "white", borderColor: colors.border, borderStyle: "solid", borderWidth: 3, width: "100%", marginBottom: 10 }}>{recipe.title}</TextInput>
                )}
              </View>
              {(!editing) && (
                <Pressable onPress={() => setEditing(true)} style={{ backgroundColor: colors.accent, borderStyle: "solid", borderWidth: 2, padding: 10, borderRadius: 14, borderColor: colors.border }}>
                  <Text style={{ textAlign: "center", color: "white" }}>Edit</Text>
                </Pressable>
              )}
              {(editing) && (
                <View style={{flexDirection: "row"}}>
                  <Pressable onPress={() => setEditing(false)} style={{ flexGrow: 1, backgroundColor: colors.accent, borderStyle: "solid", borderWidth: 2, padding: 10, borderRadius: 14, borderColor: colors.border }}>
                    <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
                  </Pressable>
                  <Pressable onPress={() => setEditing(false)} style={{ backgroundColor: colors.accent, borderStyle: "solid", borderWidth: 2, padding: 10, borderRadius: 14, borderColor: colors.border }}>
                    <Text style={{ textAlign: "center", color: "white" }}>Cancel</Text>
                  </Pressable>    
                </View>
              )}
            </View>
      </View>
      <DetailsHeader recipe={recipe} setParentTab={setTab} editing={editing} />
      {tab === "cook" && (
        <CookTab recipe={recipe} editing={editing}></CookTab>
      )}

      {tab === "notes" && (
        <NotesTab recipe={recipe} editing={editing}></NotesTab>
      )}
    </View>
  );
}

function ActionBtn({ label, icon, primary }: { label: string; icon: string; primary: string }) {
  const icons: Record<string, React.ReactElement> = {
    share: <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth={2}><Circle cx="18" cy="5" r="3"/><Circle cx="6" cy="12" r="3"/><Circle cx="18" cy="19" r="3"/><Line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><Line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></Svg>,
    calendar: <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth={2}><Rect x="3" y="4" width="18" height="18" rx="2"/><Line x1="16" y1="2" x2="16" y2="6"/><Line x1="8" y1="2" x2="8" y2="6"/><Line x1="3" y1="10" x2="21" y2="10"/></Svg>,
    heart: <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth={2}><Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Svg>,
  };
  return (
    <Pressable style={{ flex: 1,  flexDirection: "column", alignItems: "center", gap: 5, backgroundColor: `${primary}10`, borderWidth: 0, borderRadius: 10, padding: "10px 0", cursor: "pointer" }}>
      {icons[icon]}
      <Text style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.3, fontFamily: "'Outfit', sans-serif", color: primary }}>{label}</Text>
    </Pressable>
  );
}
