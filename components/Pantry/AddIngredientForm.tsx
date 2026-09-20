import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { usePantry, PantryCategories, PosPantryItem } from "../../context/PantryContext";
import { View, Pressable, Text, TextInput } from "react-native";



export default function AddIngredientForm({ setShowAddForm } : { setShowAddForm: (state: boolean) => void }) {
    const [newName, setNewName] = useState("");
    const [newUnit, setNewUnit] = useState("");
    const [newAmount, setNewAmount] = useState("");
    const [newCategory, setNewCategory] = useState("");

    const { setNewItem } = usePantry();
    const { colors } = useTheme();

    const addItem = () => {
        const newItem: PosPantryItem = {
            name: newName,
            unit: newUnit,
            amount: newAmount,
            category: newCategory
        };
        setNewItem(newItem);
        setShowAddForm(false);
    }
    return (
        <View style={{ marginTop: 30, position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)", alignItems: "flex-end", zIndex: 50 }}>
            <View style={{ backgroundColor: colors.bg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, width: "100%", paddingTop: 24, paddingBottom: 32, paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, flexDirection: "row" }}>
                    <Text style={{ margin: 0, fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Add Ingredient</Text>
                    <Pressable onPress={() => setShowAddForm(false)} style={{ backgroundColor: "none", borderWidth: 0 }}>
                        <Text style={{fontSize: 22, color: colors.muted}}>x</Text>
                    </Pressable>
                </View>
                <View style={{ marginBottom: 14 }}>
                    <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>Name</Text>
                    <TextInput value={newName} onChangeText={setNewName} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingTop: 11, paddingRight: 14, paddingBottom: 11, paddingLeft: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
                </View>
                <View style={{ gap: 10 }}>
                    <View style={{ marginBottom: 14 }}>
                        <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>Amount</Text>
                        <TextInput value={newAmount} onChangeText={setNewAmount} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingTop: 11, paddingRight: 14, paddingBottom: 11, paddingLeft: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
                    </View>              
                    <View style={{ marginBottom: 14 }}>
                        <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>Unit</Text>
                        <TextInput value={newUnit} onChangeText={setNewUnit} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingTop: 11, paddingRight: 14, paddingBottom: 11, paddingLeft: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
                    </View>            
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>CATEGORY</Text>
                    <View style={{ flexWrap: "wrap", gap: 7 }}>
                    {PantryCategories.slice(1).map((c) => (
                        <Pressable key={c} onPress={() => setNewCategory(c)} style={{ paddingTop: 6, paddingBottom: 6, paddingLeft: 12, paddingRight: 12, borderRadius: 12, borderWidth: newCategory === c ? 0 : 1, borderColor: newCategory === c ? "none" : colors.border, backgroundColor: newCategory === c ? colors.primary : "#FFFFFF" }}>
                            <Text style={{color: newCategory === c ? "#FAF7F2" : colors.textSoft, fontSize: 12, fontFamily: "'Outfit', sans-serif"}}>{c}</Text>
                        </Pressable>
                    ))}
                    </View>
                </View>
                <Pressable onPress={addItem} style={{ width: "100%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14 }}>
                    <Text style={{color: "#FAF7F2", fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Add to Pantry</Text>
                </Pressable>
            </View>
        </View>
    )
}