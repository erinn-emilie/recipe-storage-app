import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { ScrollView, View, Pressable, Text, Image } from "react-native";
import Svg, { Line } from "react-native-svg";
import { useMealPlan, DAYS, MEALS } from "../../context/MealPlanContext";
import { Recipe, useRecipes } from "../../context/RecipeContext";


export default function MealPlan(){
    const [activeDay, setActiveDay] = useState("Sunday");
    const [picking, setPicking] = useState<{ day: string; meal: string } | null>(null);

    const { colors } = useTheme();

    const { mealPlan, AddToMealPlan } = useMealPlan();

    const { allRecipes} = useRecipes(); 

    const assignToMealPlan = (day:string, meal:string, recipe:Recipe) => {
      AddToMealPlan(day, meal, recipe); 
      setPicking(null);
    }


    return (
      <>
        <View style={{  paddingLeft: 20, paddingRight: 20, paddingBottom: 20, gap: 6 }}>
          {DAYS.map((d) => {
            const isActive = activeDay === d;
            return (
              <Pressable key={d} onPress={() => setActiveDay(d)} style={{ flex: 1, padding: 8, marginHorizontal: 10, borderRadius: 12, borderWidth: 0, backgroundColor: isActive ? colors.primary : "#FFFFFF", position: "relative", cursor: "pointer" }}>
                <Text style={{padding: 10, color: isActive ? "#FAF7F2" : colors.textSoft, fontSize: 11, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>{d}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          {MEALS.map((meal) => {
            const r = mealPlan[activeDay][meal];
            return (
              <View key={meal} style={{ marginBottom: 10 }}>
                <Text style={{ marginBottom: 5, fontSize: 10, color: colors.muted, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 600 }}>{meal}</Text>
                {r?.title ? (
                  <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", borderRadius: 14 }}>
                    <View style={{ width: 25, height: 68, backgroundColor: "#E8E0D5", flex: 1,  borderRadius: 14}}>
                      <Image src={r.img} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover",  borderTopLeftRadius: 14, borderBottomLeftRadius: 14 }} />
                    </View>
                    <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft : 12, paddingRight: 12, flex: 1 }}>
                      <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{r.title}</Text>
                      <Text style={{ marginTop: 3, fontSize: 13, color: colors.muted }}>{r.servings} servings · {Number(r.prepTime) + Number(r.cookTime)}min</Text>
                    </View>
                    <Pressable onPress={() => assignToMealPlan(activeDay, meal, {} as Recipe)} style={{ paddingLeft: 14, paddingRight: 14, backgroundColor: "none", borderWidth: 0, cursor: "pointer"}}>
                      <Text style={{color: colors.muted, fontSize: 18 }}>x</Text>
                    </Pressable>
                  </View>
                ) : (
                  <Pressable onPress={() => setPicking({ day: activeDay, meal: meal })} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.border, borderRadius: 14, padding: 14,  alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
                    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={2}><Line x1="12" y1="5" x2="12" y2="19"/><Line x1="5" y1="12" x2="19" y2="12"/></Svg>
                    <Text style={{ fontSize: 13, fontFamily: "'Outfit', sans-serif", color: colors.muted }}>Add Recipe</Text>
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>

      {picking && (
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)",  alignItems: "flex-end", zIndex: 50 }}>
          <ScrollView style={{ backgroundColor: colors.bg, borderRadius: 24, width: "100%", height: "70%", maxHeight: "70%", padding: 30 }}>
            <View style={{  justifyContent: "space-between", marginBottom: 16, marginTop:16 }}>
              <Pressable onPress={() => setPicking(null)} style={{ backgroundColor: "none", borderWidth: 0 }}>
                <Text style={{fontSize: 22, color: colors.muted}}>x</Text>
              </Pressable>
              <Text style={{ color: "rgba(26,20,16,0.6)", fontSize: 20, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Pick A Recipe</Text>

            </View>
            {allRecipes.map((r) => (
              <Pressable key={r.recipeId} onPress={() => assignToMealPlan(picking.day, picking.meal, r)} style={{  gap: 12, paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.border, alignItems: "center" }}>
                <ScrollView style={{ width: 52, height: 48, borderRadius: 10, backgroundColor: "#E8E0D5", flexShrink: 0 }}>
                  <Image src={r.img} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </ScrollView>
                <View>
                  <Text style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{r.title}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
      </>
    )
}