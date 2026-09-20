import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useMemory } from "../context/MemoryContext";
import { View, Pressable, Text } from "react-native";
import Svg, { Line } from "react-native-svg";

import SettingsCard from "../components/Settings/SettingsCard";
import MemoryCard from "../components/Memories/MemoryCard";
import AddMemoryCard from "../components/Memories/AddMemoryCard";



export default function MemoriesScreen() {
  const { colors } = useTheme();
  const { allMemories } = useMemory(); 
  const [tab, setTab] = useState<"journal" | "settings">("journal");
  const [showAddMemory, setShowAddMemory] = useState(false);


  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ paddingTop: 16, paddingLeft: 20, paddingRight: 20, marginTop: 30 }}>
        <Text style={{ margin: 0, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>
          {tab === "journal" ? "What I've Made" : "Account"}
        </Text>
        <View style={{ justifyContent: "space-between", alignItems: "flex-end", flexDirection: "row" }}>
          <Text style={{ marginTop: 2, fontSize: 28, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>
            {tab === "journal" ? "Meal Journal" : "Settings"}
          </Text>
          {tab === "journal" && (
            <Pressable
              onPress={() => setShowAddMemory(true)}
              style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primary, borderWidth: 0,  alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2.5}><Line x1="12" y1="5" x2="12" y2="19"/><Line x1="5" y1="12" x2="19" y2="12"/></Svg>
            </Pressable>
          )}
        </View>
      </View>

      <View style={{  paddingTop: 14, paddingLeft: 20, paddingRight: 20, gap: 0, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.bg }}>
        {[{ id: "journal", label: "Journal" }, { id: "settings", label: "Settings" }].map((t) => (
          <Pressable key={t.id} onPress={() => setTab(t.id as any)} style={{ paddingTop: 10, paddingLeft: 18, paddingRight: 18, paddingBottom: 10, borderWidth: 0, cursor: "pointer", borderBottomWidth: 2, borderBottomColor: tab === t.id ? colors.primary : "transparent", marginBottom: -1 }}>
            <Text style={{ fontSize: 14, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? colors.primary : colors.muted, fontFamily: "'Outfit', sans-serif" }}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {tab === "journal" && (
        <View style={{ paddingTop: 16, paddingBottom: 16, paddingLeft: 20, paddingRight: 20 }}>
          {allMemories.map((memory, idx) => (
            <MemoryCard key={idx} memory={memory}></MemoryCard>
          ))}
        </View>
      )}

      {tab === "settings" && (
        <SettingsCard></SettingsCard>
      )}

      {showAddMemory && (
        <AddMemoryCard setShowAddMemory={setShowAddMemory}></AddMemoryCard>
      )}
    </View>
  );
}

