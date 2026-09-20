import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { usePantry, PantryItem, PantryCategories } from "../context/PantryContext";
import { ScrollView, View, Pressable, Text, TextInput } from "react-native";
import Svg, { Line } from "react-native-svg";
import AddIngredientForm from "../components/Pantry/AddIngredientForm";



export default function PantryScreen() {
  const { colors } = useTheme();
  const { allItems, removeItem } = usePantry();

  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);


  const filtered = allItems.filter((i) => activeCategory === "All" || i.category === activeCategory);
  const lowItems = allItems.filter((i) => i.amount <= i.lowThreshold);
  const isLow = (item: PantryItem) => item.amount <= item.lowThreshold;

  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ paddingTop: 50, paddingLeft: 20, paddingRight: 20, paddingBottom: 12, justifyContent: "space-between", alignItems: "flex-end", flexDirection: "row" }}>
        <View>
          <Text style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase"}}>At Home</Text>
          <Text style={{ marginTop: 2, fontSize: 28, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Pantry</Text>
        </View>  
        <Pressable onPress={() => setShowAddForm(true)} style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primary, borderWidth: 0, alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2.5}><Line x1="12" y1="5" x2="12" y2="19"/><Line x1="5" y1="12" x2="19" y2="12"/></Svg>
        </Pressable>
      </View>

      {lowItems.length > 0 && (
        <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 14, backgroundColor: `${colors.accent}18`, borderWidth: 1, borderColor: colors.accent, borderRadius: 14, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14 }}>
          <Text style={{ margin: 0, fontSize: 11, color: colors.accent, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>Running Low</Text>
          <Text style={{ marginTop: 4, fontSize: 13, color: colors.textSoft }}>{lowItems.map((i) => i.name).join(", ")}</Text>
        </View>
      )}
  
      <View>
        <ScrollView style={{ gap: 8, paddingLeft: 20, paddingRight: 20, paddingBottom: 14 }}>
          {PantryCategories.map((c) => (
            <Pressable key={c} onPress={() => setActiveCategory(c)} style={{ paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14, borderRadius: 20, borderWidth: activeCategory === c ? 0 : 1, borderColor: activeCategory === c ? "transparent" : colors.border, backgroundColor: activeCategory === c ? colors.primary : "#FFFFFF",  cursor: "pointer" }}>
              <Text style={{ color: activeCategory === c ? "#FAF7F2" : colors.textSoft, fontSize: 12, fontWeight: 500, fontFamily: "'Outfit', sans-serif"}}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        {filtered.map((item) => (
          <View key={item.id} style={{ flexDirection: "row", backgroundColor: "#FFFFFF", borderRadius: 14, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, marginBottom: 8, alignItems: "center", justifyContent: "center", gap: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ alignItems: "center", justifyContent: "center", gap: 6, marginRight: 20 }}>
                <Text style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#1A1410" }}>{item.name}</Text>
                {isLow(item) && <Text style={{ fontSize: 9, backgroundColor: colors.accent, color: "#FFFFFF", borderRadius: 6, paddingTop: 2, paddingBottom: 2, paddingLeft: 6, paddingRight: 6, fontWeight: 600, letterSpacing: 0.3 }}>LOW</Text>}
                <Text style={{ marginTop: 2, fontSize: 11, color: colors.muted }}>{item.category}</Text>
              </View>
            </View>
            <Text style={{ margin: 0, fontSize: 15, fontWeight: 600, color: isLow(item) ? colors.accent : colors.primary }}>{item.amount}{item.unit ? ` ${item.unit}` : ""}</Text>
            <Pressable onPress={() => removeItem(item.id)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer", paddingLeft: 4, paddingRight: 4 }}>
              <Text style={{color: "#D4C5B0", fontSize: 18, }}>x</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {showAddForm && (
        <AddIngredientForm setShowAddForm={setShowAddForm}></AddIngredientForm>
      )}
    </View>
  );
}


