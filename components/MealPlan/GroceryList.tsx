import { useTheme } from "../../context/ThemeContext";
import { View, Pressable, Text } from "react-native";
import { useGrocery } from "../../context/GroceryContext";

interface Props {
    setShowGroceryList: (status: boolean) => void;
}

export default function GroceryList({setShowGroceryList}:Props){
    const { allGroceryItems } = useGrocery();
    const { colors } = useTheme();

    return (
        <View style={{ marginLeft : 20, marginRight: 20, marginBottom: 16, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
          <View style={{  justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text style={{ margin: 0, fontSize: 20, fontWeight: 600, color: "#1A1410" }}>Grocery List</Text>
            <Pressable onPress={() => setShowGroceryList(false)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer" }}>
              <Text style={{color: colors.muted, fontSize: 18, lineHeight: 1}}></Text>
            </Pressable>
          </View>
          {Object.entries(allGroceryItems).map(([name, data]) => (
            <View key={name} style={{  justifyContent: "space-between", paddingTop: 7, paddingBottom: 7, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <Text style={{ fontSize: 13, color: "#1A1410" }}>{name}</Text>
              <Text style={{ fontSize: 13, color: colors.textSoft, fontWeight: 500 }}>{data.amount > 0 ? `${data.amount % 1 === 0 ? data.amount : data.amount.toFixed(1)} ${data.unit}` : data.unit || "—"}</Text>
            </View>
          ))}
        </View>
    )
}