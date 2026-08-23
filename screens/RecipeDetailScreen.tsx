import { useState } from "react";
import React from "react";
import { Recipe } from "../data/recipes";
import StarRating from "../components/StarRating";
import { useTheme } from "../theme/ThemeContext";
import { View, Pressable, Text, Image } from "react-native";
import Svg, { Circle, Line, Path, Rect, Polyline } from "react-native-svg";

interface Props {
  recipe: Recipe;
  onBack: () => void;
}

export default function RecipeDetailScreen({ recipe, onBack }: Props) {
  const { colors } = useTheme();
  const [tab, setTab] = useState<"cook" | "notes">("cook");
  const [servings, setServings] = useState(recipe.servings);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);

  const scaleFactor = servings / recipe.servings;
  const scaleAmount = (amount: string) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return amount;
    const scaled = num * scaleFactor;
    return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
  };

  const toggleStep = (i: number) => setCheckedSteps((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);
  const toggleIngredient = (i: number) => setCheckedIngredients((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ position: "relative", height: 220, backgroundColor: "#E8E0D5" }}>
        <Image src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <View style={{ position: "absolute", inset: 0, backgroundColor: "Linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
        <Pressable onPress={onBack} style={{ position: "absolute", top: 16, left: 16, width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.35)", borderWidth: 0,  alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2.5}><Path d="M19 12H5"/><Path d="m12 19-7-7 7-7"/></Svg>
        </Pressable>
        {recipe.parsedFrom && (
          <View style={{ position: "absolute", top: 16, right: 16, backgroundColor: "rgba(0,0,0,0.4)", borderRadius: 8, padding: "4px 10px",  alignItems: "center", gap: 5 }}>
            <Svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2}><Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Svg>
            <Text style={{ fontSize: 10, color: "#FAF7F2", fontWeight: 500 }}>Parsed</Text>
          </View>
        )}
        <View style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
          <Text style={{  padding: 5, marginTop: 4, fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: colors.accent, backgroundColor: colors.bg}}>{recipe.title}</Text>
        </View>
      </View>

      <View style={{ backgroundColor: "#FFFFFF", paddingTop: 14, paddingBottom: 14, paddingLeft: 20, paddingRight: 20, gap: 0, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <MetaStat label="Prep" value={`${recipe.prepTime}m`} />
        <View style={{ width: 1, backgroundColor: colors.border, marginLeft: 16, marginRight: 16 }} />
        <MetaStat label="Cook" value={totalTime < 60 ? `${recipe.cookTime}m` : `${Math.floor(recipe.cookTime / 60)}h ${recipe.cookTime % 60 > 0 ? recipe.cookTime % 60 + "m" : ""}`} />
        <View style={{ width: 1, backgroundColor: colors.border, marginLeft: 16, marginRight: 16 }} />
        <View style={{ flex: 1 }}>
          <Text style={{ margin: 0, fontSize: 10, color: colors.muted, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 500 }}>Servings</Text>
          <View style={{  alignItems: "center", gap: 8, marginTop: 3 }}>
            <Pressable onPress={() => setServings(Math.max(1, servings - 1))} style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: `${colors.primary}18`, borderWidth: 0, cursor: "pointer", alignItems: "center", justifyContent: "center" }}>
              <Text style={{fontSize: 14, color: colors.primary, fontWeight: 600}}>-</Text>
            </Pressable>
            <Text style={{ fontSize: 16, fontWeight: 600, color: "#1A1410", minWidth: 20, textAlign: "center" }}>{servings}</Text>
            <Pressable onPress={() => setServings(servings + 1)} style={{ width: 22, height: 22, marginBottom: 10, borderRadius: 6, backgroundColor: `${colors.primary}18`, borderWidth: 0, cursor: "pointer", alignItems: "center", justifyContent: "center" }}>
              <Text style={{fontSize: 14, color: colors.primary, fontWeight: 600}}>+</Text> 
            </Pressable>
          </View>
        </View>
        <View style={{  alignItems: "center", marginLeft: 8 }}>
          <StarRating rating={recipe.rating} size={14} />
        </View>
      </View>

      <View style={{  backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: colors.border }}>
        {[{ id: "cook", label: "Cook" }, { id: "notes", label: "Notes & Photos" }].map((t) => (
          <Pressable
            key={t.id}
            onPress={() => setTab(t.id as any)}
            style={{
              padding: 12,
              backgroundColor: "none",
              borderWidth: 0,
              cursor: "pointer",
              borderBottomWidth: 2,
              borderBottomColor: tab === t.id ? colors.primary : "transparent",
              marginBottom: -1,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? colors.primary : colors.muted, fontFamily: "'Outfit', sans-serif"}}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {tab === "cook" && (
        <View>
          <View style={{ padding: "20px 20px 0" }}>
            <Text style={{ margin: 16, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Ingredients</Text>
            {recipe.ingredients.map((ing, i) => (
              <Pressable key={i} onPress={() => toggleIngredient(i)} style={{  alignItems: "center", gap: 12, paddingTop: 9, paddingBottom: 9, paddingLeft: 9, paddingRight: 15, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: colors.border, cursor: "pointer", opacity: checkedIngredients.includes(i) ? 0.4 : 1 }}>
                <View style={{ width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: checkedIngredients.includes(i) ? colors.primary : "#D4C5B0", backgroundColor: checkedIngredients.includes(i) ? colors.primary : "transparent",  alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {checkedIngredients.includes(i) && <Svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={3}><Polyline points="20 6 9 17 4 12"/></Svg>}
                </View>
                <Text style={{ flex: 1, fontSize: 14, color: "#1A1410" }}>{ing.name}</Text>
                <Text style={{ fontSize: 14, fontWeight: 500, color: colors.textSoft }}>{scaleAmount(ing.amount)}{ing.unit ? ` ${ing.unit}` : ""}</Text>
              </Pressable>
            ))}
          </View>

          <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 24 }}>
            <Text style={{ marginBottom: 16, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Instructions</Text>
            {recipe.steps.map((step, i) => (
              <Pressable key={i} onPress={() => toggleStep(i)} style={{  gap: 14, marginBottom: 16, cursor: "pointer", opacity: checkedSteps.includes(i) ? 0.35 : 1 }}>
                <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: checkedSteps.includes(i) ? colors.primary : `${colors.primary}14`,  alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  {checkedSteps.includes(i)
                    ? <Svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={3}><Polyline points="20 6 9 17 4 12"/></Svg>
                    : <Text style={{ fontSize: 12, fontWeight: 700, color: colors.textSoft }}>{i + 1}</Text>}
                </View>
                <Text style={{ margin: 0, fontSize: 14, color: "#1A1410", flex: 1, textDecorationLine: checkedSteps.includes(i) ? "line-through" : "none" }}>{step}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {tab === "notes" && (
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 10, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Chef Notes</Text>
          <View style={{ backgroundColor: "#FFFBF5", borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
            <Text style={{ margin: 0, fontSize: 14, color: "#1A1410", fontStyle: "italic", fontFamily: "'Fraunces', serif" }}>{recipe.notes}</Text>
          </View>
          {recipe.parsedFrom && (
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 10, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Source</Text>
              <View style={{ backgroundColor: `${colors.primary}10`, borderRadius: 12, paddingTop: 12, paddingBottom: 14, paddingLeft: 14, paddingRight: 14, alignItems: "center", gap: 10 }}>
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}><Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Svg>
                <Text style={{ margin: 0, fontSize: 12, color: colors.textSoft }}>{recipe.parsedFrom}</Text>
              </View>
            </View>
          )}
          <View style={{ marginTop: 20 }}>
            <Text style={{ margin: "0 0 10px", fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Tags</Text>
            <View style={{  flexWrap: "wrap", gap: 8 }}>
              {recipe.tags.map((t) => (
                <Text key={t} style={{ backgroundColor: `${colors.primary}12`, color: colors.textSoft, paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14, borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{t}</Text>
              ))}
            </View>
          </View>
          <View style={{ marginTop: 20, backgroundColor: "#FFFFFF", borderRadius: 14, padding: 16, borderWidth: 1, borderColor: colors.border }}>
            <Text style={{ margin: 0, fontSize: 12, color: colors.muted, marginBottom: 8, letterSpacing: 0.5 }}>ADDED {recipe.createdAt}</Text>
            <View style={{  gap: 10 }}>
              <ActionBtn label="Share" icon="share" primary={colors.primary} />
              <ActionBtn label="Add to Plan" icon="calendar" primary={colors.primary} />
              <ActionBtn label="Log Memory" icon="heart" primary={colors.primary} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

function MetaStat({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ margin: 0, fontSize: 10, color: colors.muted, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 500 }}>{label}</Text>
      <Text style={{ margin: "3px 0 0", fontSize: 16, fontWeight: 600, color: "#1A1410" }}>{value}</Text>
    </View>
  );
}

function ActionBtn({ label, icon, primary }: { label: string; icon: string; primary: string }) {
  const icons: Record<string, React.ReactElement> = {
    share: <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth={2}><Circle cx="18" cy="5" r="3"/><Circle cx="6" cy="12" r="3"/><Circle cx="18" cy="19" r="3"/><Line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><Line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></Svg>,
    calendar: <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth={2}><Rect x="3" y="4" width="18" height="18" rx="2"/><Line x1="16" y1="2" x2="16" y2="6"/><Line x1="8" y1="2" x2="8" y2="6"/><Line x1="3" y1="10" x2="21" y2="10"/></Svg>,
    heart: <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth={2}><Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Svg>,
  };
  return (
    <Pressable style={{ flex: 1,  flexDirection: "column", alignItems: "center", gap: 5, backgroundColor: `${primary}10`, borderWidth: 0, borderRadius: 10, padding: "10px 0", cursor: "pointer" }}>
      {icons[icon]}
      <Text style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.3, fontFamily: "'Outfit', sans-serif", color: primary }}>{label}</Text>
    </Pressable>
  );
}
