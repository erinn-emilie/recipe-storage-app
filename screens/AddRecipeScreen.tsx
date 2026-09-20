import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { View, Pressable, Text, TextInput } from "react-native";
import Svg, { Path } from "react-native-svg";
import ManualEntry from "../components/AddRecipes/ManualEntry";
import UrlEntry from "../components/AddRecipes/UrlEntry";

interface Props {
  onAdd: () => void;
  onBack: () => void;
}

export default function AddRecipeScreen({ onAdd, onBack }: Props) {
  const { colors } = useTheme();
  const [mode, setMode] = useState<"manual" | "url" | null>(null);


  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 14, alignItems: "center", gap: 14 , flexDirection: "row"}}>
        <Pressable onPress={onBack} style={{ width: 36, height: 36, borderRadius: 10, borderTopColor: colors.border, borderBottomColor: colors.border, borderLeftColor: colors.border, borderRightColor: colors.border, borderWidth: 1, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C4D3A" strokeWidth={2.5}><Path d="M19 12H5"/><Path d="m12 19-7-7 7-7"/></Svg>
        </Pressable>
        <View>
          <Text style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>New Recipe</Text>
          <Text style={{ marginTop: 2, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 22, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Add Recipe</Text>
        </View>
      </View>

      {!mode && (
        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{ fontSize: 14, color: colors.textSoft, marginBottom: 20}}>
            Enter a recipe manually, or paste a URL from any recipe website and we'll extract the recipe for you — no blog stories, no ads.
          </Text>
          <View style={{ flexDirection: "column", gap: 12 }}>
            <Pressable
              onPress={() => setMode("url")}
              style={{ backgroundColor: colors.primary, borderWidth:0, paddingTop: 18, paddingBottom: 18, paddingLeft: 20, paddingRight: 20, alignItems: "center", gap: 14, cursor: "pointer"}}
            >
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(250,247,242,0.15)", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2}><Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Svg>
              </View>
              <View>
                <Text style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 16, fontWeight: 600, color: "#FAF7F2", fontFamily: "'Fraunces', serif" }}>Parse from URL</Text>
                <Text style={{ marginTop: 3, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 12, color: "rgba(250,247,242,0.7)" }}>Paste a recipe link!</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => setMode("manual")}
              style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingTop: 18, paddingBottom: 18, paddingLeft: 20, paddingRight: 20, alignItems: "center", gap: 14, cursor: "pointer" }}
            >
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}><Path d="M12 20h9"/><Path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></Svg>
              </View>
              <View>
                <Text style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 16, fontWeight: 600, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>Enter manually</Text>
                <Text style={{ marginTop: 3, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 12, color: colors.muted }}>Fill in the details yourself</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}

      {mode === "url" && (
        <UrlEntry onAdd={onAdd}></UrlEntry>
      )}

      {mode === "manual" && (
        <ManualEntry onAdd={onAdd}></ManualEntry>
      )}
    </View>
  );
}

