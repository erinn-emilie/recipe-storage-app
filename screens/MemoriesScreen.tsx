import { useState } from "react";
import StarRating from "../components/StarRating";
import { useTheme } from "../theme/ThemeContext";
import { View, Pressable, Text, TextInput, Image } from "react-native";
import Svg, { Line, Polyline, Circle, Rect } from "react-native-svg";

import SettingsCard from "../components/Settings/SettingsCard";
import MemoryCard from "../components/MemoryCard";

interface Memory {
  id: string;
  title: string;
  date: string;
  chef: string;
  image: string;
  notes: string;
  rating: number;
  friendRatings: { name: string; rating: number }[];
}

const memories: Memory[] = [
  {
    id: "m1",
    title: "Moroccan Night",
    date: "November 3, 2024",
    chef: "Me",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=500&fit=crop&auto=format",
    notes: "First time making the tagine for guests. Six people, ate every last bit. Served with flatbread and a good bottle of Grenache.",
    rating: 5,
    friendRatings: [
      { name: "Elena R.", rating: 5 },
      { name: "Marcus W.", rating: 5 },
    ],
  },
  {
    id: "m2",
    title: "Cookie Sunday",
    date: "September 22, 2024",
    chef: "Me",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=500&fit=crop&auto=format",
    notes: "Used 48-hour rested dough. Pressed extra chocolate in right after baking. Priya's batch went faster than mine — will make double next time.",
    rating: 5,
    friendRatings: [{ name: "Priya K.", rating: 5 }],
  },
  {
    id: "m3",
    title: "Quick Weeknight Dinner",
    date: "October 18, 2024",
    chef: "Me",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop&auto=format",
    notes: "The cucumber salad alongside grilled chicken. Done in 20 minutes. Marcus had never had it before.",
    rating: 4,
    friendRatings: [{ name: "Priya K.", rating: 5 }],
  },
];


export default function MemoriesScreen() {
  const { colors } = useTheme();
  const [tab, setTab] = useState<"journal" | "settings">("journal");
  const [showAddMemory, setShowAddMemory] = useState(false);


  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      {/* Header */}
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

      {/* Tab switcher */}
      <View style={{  paddingTop: 14, paddingLeft: 20, paddingRight: 20, gap: 0, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.bg }}>
        {[{ id: "journal", label: "Journal" }, { id: "settings", label: "Settings" }].map((t) => (
          <Pressable key={t.id} onPress={() => setTab(t.id as any)} style={{ paddingTop: 10, paddingLeft: 18, paddingRight: 18, paddingBottom: 10, borderWidth: 0, cursor: "pointer", borderBottomWidth: 2, borderBottomColor: tab === t.id ? colors.primary : "transparent", marginBottom: -1 }}>
            <Text style={{ fontSize: 14, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? colors.primary : colors.muted, fontFamily: "'Outfit', sans-serif" }}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* ── JOURNAL TAB ── */}
      {tab === "journal" && (
        <View style={{ paddingTop: 16, paddingBottom: 16, paddingLeft: 20, paddingRight: 20 }}>
          {memories.map((memory) => (
            <MemoryCard memory={memory}></MemoryCard>
          ))}
        </View>
      )}

      {/* ── SETTINGS TAB ── */}
      {tab === "settings" && (
        <SettingsCard></SettingsCard>
      )}

      {/* Add memory modal */}
      {showAddMemory && (
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)",  alignItems: "flex-end", zIndex: 50 }}>
          <View style={{ backgroundColor: colors.bg, borderRadius: "24px 24px 0 0", width: "100%", paddingTop: 24, paddingBottom: 32, paddingLeft: 20, paddingRight: 20 }}>
            <View style={{  justifyContent: "space-between", marginBottom: 20 }}>
              <Text style={{ margin: 0, fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Log a Memory</Text>
              <Pressable onPress={() => setShowAddMemory(false)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer"}}>
                <Text style={{fontSize: 22, color: colors.muted }}>x</Text>
              </Pressable>
            </View>
            <View style={{ backgroundColor: `${colors.primary}10`, borderRadius: 14, padding: 14, marginBottom: 16, cursor: "pointer" }}>
              <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={1.5} style={{ marginTop: 6 }}><Rect x="3" y="3" width="18" height="18" rx="2"/><Circle cx="8.5" cy="8.5" r="1.5"/><Polyline points="21 15 16 10 5 21"/></Svg>
              <Text style={{ margin: 0, fontSize: 13, color: colors.muted }}>Add photos</Text>
            </View>
            {["Meal Name", "Chef", "Notes"].map((field) => (
              <View key={field} style={{ marginBottom: 14 }}>
                <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>{field.toUpperCase()}</Text>
                <TextInput placeholder={`Enter ${field.toLowerCase()}...`} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingTop: 11, paddingBottom: 11, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
              </View>
            ))}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ marginBottom: 8, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>YOUR RATING</Text>
              <StarRating rating={0} size={28} interactive />
            </View>
            <Pressable style={{ width: "100%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14, cursor: "pointer" }}>
              <Text style={{color: "#FAF7F2", fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Save Memory</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

