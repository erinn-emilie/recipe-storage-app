import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { ScrollView, View, Pressable, Text, TextInput } from "react-native";
import Svg, { Line } from "react-native-svg";

interface PantryItem {
  id: string;
  name: string; 
  amount: number;
  unit: string;
  category: string;
  lowThreshold: number;
}

const initialItems: PantryItem[] = [
  { id: "1", name: "All-purpose flour", amount: 1200, unit: "g", category: "Dry Goods", lowThreshold: 500 },
  { id: "2", name: "Olive oil", amount: 400, unit: "ml", category: "Oils & Vinegars", lowThreshold: 200 },
  { id: "3", name: "Garlic", amount: 8, unit: "cloves", category: "Fresh", lowThreshold: 4 },
  { id: "4", name: "Butter", amount: 200, unit: "g", category: "Dairy", lowThreshold: 100 },
  { id: "5", name: "Eggs", amount: 6, unit: "", category: "Dairy", lowThreshold: 3 },
  { id: "6", name: "Rice vinegar", amount: 250, unit: "ml", category: "Condiments", lowThreshold: 100 },
  { id: "7", name: "Soy sauce", amount: 180, unit: "ml", category: "Condiments", lowThreshold: 100 },
  { id: "8", name: "Dark brown sugar", amount: 320, unit: "g", category: "Dry Goods", lowThreshold: 150 },
  { id: "9", name: "Cumin", amount: 25, unit: "g", category: "Spices", lowThreshold: 10 },
  { id: "10", name: "Saffron", amount: 2, unit: "g", category: "Spices", lowThreshold: 1 },
  { id: "11", name: "Canned tomatoes", amount: 2, unit: "cans", category: "Pantry", lowThreshold: 1 },
  { id: "12", name: "Sesame oil", amount: 140, unit: "ml", category: "Oils & Vinegars", lowThreshold: 80 },
];

const CATEGORIES = ["All", "Dry Goods", "Fresh", "Dairy", "Condiments", "Oils & Vinegars", "Spices", "Pantry"];

export default function PantryScreen() {
  const { colors } = useTheme();
  const [items, setItems] = useState<PantryItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", amount: "", unit: "", category: "Dry Goods" });

  const filtered = items.filter((i) => activeCategory === "All" || i.category === activeCategory);
  const lowItems = items.filter((i) => i.amount <= i.lowThreshold);
  const isLow = (item: PantryItem) => item.amount <= item.lowThreshold;

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const addItem = () => {
    if (!newItem.name) return;
    setItems((prev) => [...prev, { id: Date.now().toString(), name: newItem.name, amount: parseFloat(newItem.amount) || 0, unit: newItem.unit, category: newItem.category, lowThreshold: 0 }]);
    setNewItem({ name: "", amount: "", unit: "", category: "Dry Goods" });
    setShowAddForm(false);
  };

  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ paddingTop: 50, paddingLeft: 20, paddingRight: 20, paddingBottom: 12, justifyContent: "space-between", alignItems: "flex-end", flexDirection: "row" }}>
        <View>
          <Text style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase"}}>At Home</Text>
          <Text style={{ marginTop: 2, fontSize: 28, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Pantry</Text>
        </View>  
        <Pressable onPress={() => setShowAddForm(true)} style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primary, borderWidth: 0, alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2.5}><Line x1="12" y1="5" x2="12" y2="19"/><Line x1="5" y1="12" x2="19" y2="12"/></Svg>
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
          {CATEGORIES.map((c) => (
            <Pressable key={c} onPress={() => setActiveCategory(c)} style={{ paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14, borderRadius: 20, borderWidth: activeCategory === c ? 0 : 1, borderColor: activeCategory === c ? "transparent" : colors.border, backgroundColor: activeCategory === c ? colors.primary : "#FFFFFF",  cursor: "pointer" }}>
              <Text style={{ color: activeCategory === c ? "#FAF7F2" : colors.textSoft, fontSize: 12, fontWeight: 500, fontFamily: "'Outfit', sans-serif"}}>{c}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        {filtered.map((item) => (
          <View key={item.id} style={{ flexDirection: "row", backgroundColor: "#FFFFFF", borderRadius: 14, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, marginBottom: 8, alignItems: "center", justifyContent: "center", gap: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: isLow(item) ? `${colors.accent}18` : `${colors.primary}10`, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Text style={{ fontSize: 18 }}>{getCategoryEmoji(item.category)}</Text>
            </View>
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
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)", alignItems: "flex-end", zIndex: 50 }}>
          <View style={{ backgroundColor: colors.bg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, width: "100%", paddingTop: 24, paddingBottom: 32, paddingLeft: 20, paddingRight: 20 }}>
            <View style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, flexDirection: "row" }}>
              <Text style={{ margin: 0, fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Add Ingredient</Text>
              <Pressable onPress={() => setShowAddForm(false)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer" }}>
                <Text style={{fontSize: 22, color: colors.muted}}>x</Text>
              </Pressable>
            </View>
            <FormInput label="Name" value={newItem.name} onChange={(v) => setNewItem((p) => ({ ...p, name: v }))} placeholder="e.g. Chickpeas" colors={colors} />
            <View style={{ gap: 10 }}>
              <FormInput label="Amount" value={newItem.amount} onChange={(v) => setNewItem((p) => ({ ...p, amount: v }))} placeholder="e.g. 400" colors={colors} />
              <FormInput label="Unit" value={newItem.unit} onChange={(v) => setNewItem((p) => ({ ...p, unit: v }))} placeholder="g / ml / cans" colors={colors} />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>CATEGORY</Text>
              <View style={{ flexWrap: "wrap", gap: 7 }}>
                {CATEGORIES.slice(1).map((c) => (
                  <Pressable key={c} onPress={() => setNewItem((p) => ({ ...p, category: c }))} style={{ paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12, borderRadius: 12, borderWidth: newItem.category === c ? 0 : 1, borderColor: newItem.category === c ? "none" : colors.border, backgroundColor: newItem.category === c ? colors.primary : "#FFFFFF", cursor: "pointer" }}>
                    <Text style={{color: newItem.category === c ? "#FAF7F2" : colors.textSoft, fontSize: 12, fontFamily: "'Outfit', sans-serif"}}>{c}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <Pressable onPress={addItem} style={{ width: "100%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14, cursor: "pointer" }}>
              <Text style={{color: "#FAF7F2", fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Add to Pantry</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

function FormInput({ label, value, onChange, placeholder, colors }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; colors: any }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ margin: "0 0 6px", fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>{label.toUpperCase()}</Text>
      <TextInput value={value} onChangeText={onChange} placeholder={placeholder} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingTop: 11, paddingRight: 14, paddingBottom: 11, paddingLeft: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
    </View>
  );
}

function getCategoryEmoji(category: string): string {
  const map: Record<string, string> = { "Dry Goods": "🌾", "Fresh": "🥬", "Dairy": "🧈", "Condiments": "🫙", "Oils & Vinegars": "🫒", "Spices": "🌿", "Pantry": "🥫" };
  return map[category] || "📦";
}
