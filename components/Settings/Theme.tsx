import { useState } from "react";
import { useTheme, THEMES, ThemeId } from "../../theme/ThemeContext";
import { useAccount } from "../../theme/AccountContext";
import { View, Pressable, Text, TextInput } from "react-native";
import Svg, { Path, Line, Polyline, Circle } from "react-native-svg";




export default function Theme({}:{}) {
    const { colors, themeId, setThemeId } = useTheme();

    return (
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, paddingTop: 4, paddingBottom: 4, paddingLeft: 16, paddingRight: 16, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ marginBottom: 12, fontSize: 12, color: colors.muted, fontWeight: 500 }}>App Theme</Text>
            <View style={{ gap: 10 }}>
              {(Object.entries(THEMES) as [ThemeId, typeof THEMES[ThemeId]][]).map(([id, t]) => (
                <Pressable
                  key={id}
                  onPress={() => setThemeId(id)}
                  style={{ backgroundColor: t.colors.bg, borderWidth: 2, borderColor: themeId === id ? t.colors.primary : colors.border, borderRadius: 14, padding: 12, cursor: "pointer", position: "relative" }}
                >
                  <View style={{  gap: 5, marginBottom: 8 }}>
                    {t.preview.map((color, i) => (
                      <View key={i} style={{ width: i === 0 ? 24 : 16, height: 24, borderRadius: 6, backgroundColor: color, borderWidth: 1, borderColor: "rgba(0,0,0,0.06)" }} />
                    ))}
                  </View>
                  <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: t.colors.primary, fontFamily: "'Outfit', sans-serif" }}>{t.label}</Text>
                  {themeId === id && (
                    <View style={{ position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: 9, backgroundColor: t.colors.primary,  alignItems: "center", justifyContent: "center" }}>
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={3}><Polyline points="20 6 9 17 4 12"/></Svg>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
        </View>
    )
}