import { useState } from "react";
import { Recipe } from "../data/recipes";
import { useTheme } from "../theme/ThemeContext";
import { ScrollView, View, Pressable, Text, Image } from "react-native";
import Svg, { Line } from "react-native-svg";

interface Props {
  recipes: Recipe[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MEALS = ["Breakfast", "Lunch", "Dinner", "Dessert", "Other"];

type PlanMap = Record<string, Record<string, Recipe | null>>;

const buildInitialPlan = (recipes: Recipe[]): PlanMap => {
  const p: PlanMap = {};
  DAYS.forEach((d) => {
    p[d] = { Breakfast: null, Lunch: null, Dinner: null, Dessert: null, Other: null };
  });
  if (recipes[0]) p.Mon.Dinner = recipes[0];
  if (recipes[2]) p.Sat.Dessert = recipes[2];
  if (recipes[1]) p.Wed.Lunch = recipes[1];
  if (recipes[3]) p.Sun.Dinner = recipes[3];
  return p;
};

export default function PlannerScreen({ recipes }: Props) {
  const { colors } = useTheme();
  const [plan, setPlan] = useState<PlanMap>(() => buildInitialPlan(recipes));
  const [activeDay, setActiveDay] = useState("Mon");
  const [picking, setPicking] = useState<{ day: string; meal: string } | null>(null);
  const [showGroceryList, setShowGroceryList] = useState(false);

  const assign = (day: string, meal: string, recipe: Recipe | null) => {
    setPlan((prev) => ({ ...prev, [day]: { ...prev[day], [meal]: recipe } }));
    setPicking(null);
  };

  const groceryIngredients: Record<string, { amount: number; unit: string }> = {};
  DAYS.forEach((day) => {
    MEALS.forEach((meal) => {
      const r = plan[day][meal];
      if (r) {
        r.ingredients.forEach((ing) => {
          const amt = parseFloat(ing.amount) || 0;
          if (!groceryIngredients[ing.name]) groceryIngredients[ing.name] = { amount: 0, unit: ing.unit };
          groceryIngredients[ing.name].amount += amt;
        });
      }
    });
  });

  const plannedCount = DAYS.reduce((acc, d) => acc + MEALS.filter((m) => plan[d][m] !== null).length, 0);

  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ paddingTop: 16, paddingLeft: 20, paddingRight: 20, paddingBottom: 12 }}>
        <Text style={{ padding: 25,fontSize: 24, color: colors.muted, letterSpacing: 1.5, fontWeight: 500 }}>THIS WEEK</Text>
        <View style={{  justifyContent: "space-between", alignItems: "flex-end" }}>
          {plannedCount > 0 && (
            <Pressable onPress={() => setShowGroceryList(!showGroceryList)} style={{ backgroundColor: colors.primary, borderWidth: 0, borderRadius: 10, paddingTop: 8, paddingRight: 14, paddingBottom: 8, paddingLeft: 14, cursor: "pointer" }}>
              <Text style={{color: "#FAF7F2", fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Grocery List</Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={{  padding: "0 20px 14px", gap: 6 }}>
        {DAYS.map((d) => {
          const hasItems = MEALS.some((m) => plan[d][m] !== null);
          const isActive = activeDay === d;
          return (
            <Pressable key={d} onPress={() => setActiveDay(d)} style={{ flex: 1, paddingTop: 8, paddingBottom: 8, borderRadius: 12, borderWidth: 0, backgroundColor: isActive ? colors.primary : "#FFFFFF", position: "relative", cursor: "pointer" }}>
              <Text style={{padding: 10, color: isActive ? "#FAF7F2" : colors.textSoft, fontSize: 11, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>{d}</Text>
              {hasItems && !isActive && <Text style={{ position: "absolute", top: 4, right: 4, width: 5, height: 5, borderRadius: 3, backgroundColor: colors.accent }} />}
            </Pressable>
          );
        })}
      </View>

      {showGroceryList && (
        <View style={{ marginLeft : 20, marginRight: 20, marginBottom: 16, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
          <View style={{  justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1A1410" }}>Weekly Grocery List</Text>
            <Pressable onPress={() => setShowGroceryList(false)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer" }}>
              <Text style={{color: colors.muted, fontSize: 18, lineHeight: 1}}>x</Text>
            </Pressable>
          </View>
          {Object.entries(groceryIngredients).map(([name, data]) => (
            <View key={name} style={{  justifyContent: "space-between", paddingTop: 7, paddingBottom: 7, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <Text style={{ fontSize: 13, color: "#1A1410" }}>{name}</Text>
              <Text style={{ fontSize: 13, color: colors.textSoft, fontWeight: 500 }}>{data.amount > 0 ? `${data.amount % 1 === 0 ? data.amount : data.amount.toFixed(1)} ${data.unit}` : data.unit || "—"}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        {MEALS.map((meal) => {
          const r = plan[activeDay][meal];
          return (
            <View key={meal} style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 5, fontSize: 10, color: colors.muted, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 600 }}>{meal}</Text>
              {r ? (
                <View style={{ backgroundColor: "#FFFFFF", borderRadius: 14, overflow: "hidden",  boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                  <View style={{ width: 72, height: 68, backgroundColor: "#E8E0D5", flexShrink: 0 }}>
                    <Image src={r.image} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </View>
                  <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft : 12, paddingRight: 12, flex: 1 }}>
                    <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{r.title}</Text>
                    <Text style={{ marginTop: 3, fontSize: 11, color: colors.muted }}>{r.servings} servings · {r.prepTime + r.cookTime}min</Text>
                  </View>
                  <Pressable onPress={() => assign(activeDay, meal, null)} style={{ padding: "0 14px", backgroundColor: "none", borderWidth: 0, cursor: "pointer"}}>
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
          <ScrollView style={{ backgroundColor: colors.bg, borderRadius: 24, width: "100%", maxHeight: "70%", padding: 20 }}>
            <View style={{  justifyContent: "space-between", marginBottom: 16 }}>
              <Text style={{ margin: 0, fontSize: 18, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Pick a recipe</Text>
              <Pressable onPress={() => setPicking(null)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer" }}>
                <Text style={{fontSize: 22, color: colors.muted}}>x</Text>
              </Pressable>
            </View>
            {recipes.map((r) => (
              <Pressable key={r.id} onPress={() => assign(picking.day, picking.meal, r)} style={{  gap: 12, padding: "10px 0", borderBottomWidth: 1, borderBottomColor: colors.border, cursor: "pointer", alignItems: "center" }}>
                <ScrollView style={{ width: 52, height: 48, borderRadius: 10, backgroundColor: "#E8E0D5", flexShrink: 0 }}>
                  <Image src={r.image} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </ScrollView>
                <View>
                  <Text style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{r.title}</Text>
                  <Text style={{ marginTop: 2, fontSize: 11, color: colors.muted }}>{r.servings} servings</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
