import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { View, Pressable, Text } from "react-native";
import GroceryList from "../components/MealPlan/GroceryList";
import MealPlan from "../components/MealPlan/MealPlan";


export default function PlannerScreen() {
  const { colors } = useTheme();
  const [showGroceryList, setShowGroceryList] = useState(false);



  return (
    <View style={{ backgroundColor: colors.bg, paddingTop: 20 }}>
      <View style={{ flexDirection: "row", paddingTop: 20, paddingBottom: 20, paddingLeft: 20 }}>
        <View>
          <Text style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase"}}>This Week</Text>
          <Text style={{ marginTop: 2, fontSize: 28, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Meal Plan</Text>
        </View>        
        <View style={{  flex: 1, alignItems: "flex-end", justifyContent: "center", paddingRight: 10 }}>
          <Pressable onPress={() => setShowGroceryList(!showGroceryList)} style={{ backgroundColor: colors.primary, borderWidth: 0, borderRadius: 10, paddingTop: 8, paddingRight: 14, paddingBottom: 8, paddingLeft: 14, cursor: "pointer" }}>
            {showGroceryList && (
              <Text style={{color: "#FAF7F2", fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Meal Planner</Text>
            )}
            {!showGroceryList && (
              <Text style={{color: "#FAF7F2", fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Grocery List</Text>
            )}
          </Pressable>  
        </View>
      </View>

      {showGroceryList && (
        <GroceryList setShowGroceryList={setShowGroceryList}></GroceryList>
      )}

      {!showGroceryList && (
        <MealPlan></MealPlan>
      )}

    </View>
  );
}
