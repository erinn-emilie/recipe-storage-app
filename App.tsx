import { useState } from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";
import RecipesScreen from "./screens/RecipesScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import PlannerScreen from "./screens/PlannerScreen";
import PantryScreen from "./screens/PantryScreen";
import FriendsScreen from "./screens/FriendsScreen";
import MemoriesScreen from "./screens/MemoriesScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import { Recipe, recipes as initialRecipes } from "./data/recipes";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import { AccountProvider } from "./theme/AccountContext";


export type Screen =
  | "recipes"
  | "recipe-detail"
  | "planner"
  | "pantry"
  | "friends"
  | "memories"
  | "add-recipe";

export default function App() {
  return (
    <ThemeProvider>
      <AccountProvider>
        <AppInner />
      </AccountProvider>
    </ThemeProvider>
  );
}

function AppInner() {
  const { colors } = useTheme();
  const [screen, setScreen] = useState<Screen>("recipes");
  const [activeTab, setActiveTab] = useState<"recipes" | "planner" | "pantry" | "friends" | "memories">("recipes");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);

  const navigate = (s: Screen, recipe?: Recipe) => {
    if (recipe) setSelectedRecipe(recipe);
    setScreen(s);
    if (["recipes", "planner", "pantry", "friends", "memories"].includes(s)) {
      setActiveTab(s as typeof activeTab);
    }
  };

  const addRecipe = (r: Recipe) => {
    setRecipes((prev) => [r, ...prev]);
    navigate("recipes");
  };

  const showNav = !["recipe-detail", "add-recipe"].includes(screen);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView style={{ flex: 1}} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={true}>
        {screen === "recipes" && (
          <RecipesScreen recipes={recipes} onSelect={(r) => navigate("recipe-detail", r)} onAdd={() => navigate("add-recipe")} />
        )}
        {screen === "recipe-detail" && selectedRecipe && (
          <RecipeDetailScreen recipe={selectedRecipe} onBack={() => navigate("recipes")} />
        )}
        {screen === "planner" && <PlannerScreen recipes={recipes} />}
        {screen === "pantry" && <PantryScreen />}
        {screen === "friends" && <FriendsScreen recipes={recipes} onSelectRecipe={(r) => navigate("recipe-detail", r)} />}
        {screen === "memories" && <MemoriesScreen />}
        {screen === "add-recipe" && <AddRecipeScreen onAdd={addRecipe} onBack={() => navigate("recipes")} />}
      </ScrollView>

      {showNav && (
        <BottomNav active={activeTab} onNavigate={(t) => navigate(t)} />
      )}

    </View>
  );
}

function BottomNav({ active, onNavigate }: { active: string; onNavigate: (t: any) => void }) {
  const { colors } = useTheme();
  const tabs = [
    { id: "recipes", label: "Recipes", icon: BookIcon },
    { id: "planner", label: "Planner", icon: CalendarIcon },
    { id: "pantry", label: "Pantry", icon: JarIcon },
    { id: "friends", label: "Friends", icon: UsersIcon },
    { id: "memories", label: "Journal", icon: HeartIcon },
  ];
  return (
    <View style={{ backgroundColor: "#FFFFFF", borderTopColor: '#E8E0D5', borderTopWidth: 1, paddingTop: 8, flexDirection: "row", flexShrink: 0 }}>
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <Pressable
            key={t.id}
            onPress={() => onNavigate(t.id)}
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              backgroundColor: "transparent",
              cursor: "pointer",
              paddingTop: 6,
              paddingBottom: 6,
              borderWidth: 0
            }}
          >
            <t.icon size={22} filled={isActive} />
            <Text style={{ fontSize: 10, fontWeight: isActive ? 600 : 400, letterSpacing: 0.3, color: isActive ? colors.primary : colors.muted }}>{t.label}</Text>
            {isActive && <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.accent, marginTop: 0 }} />}
        </Pressable>
        );
      })}
    </View>
  );
}


function BookIcon({ size, filled }: { size: number; filled: boolean }) {
  const { colors } = useTheme();
  const c = filled ? colors.primary : colors.muted;
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? c : "none"} stroke={c} strokeWidth={1.8}>
    <Path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <Path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </Svg>;
}
function CalendarIcon({ size, filled }: { size: number; filled: boolean }) {
  const { colors } = useTheme();
  const c = filled ? colors.primary : colors.muted;
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8}>
    <Rect x="3" y="4" width="18" height="18" rx="2" fill={filled ? c : "none"}/><Line x1="16" y1="2" x2="16" y2="6" stroke={filled ? "#FFFFFF" : c}/>
    <Line x1="8" y1="2" x2="8" y2="6" stroke={filled ? "#FFFFFF" : c}/><Line x1="3" y1="10" x2="21" y2="10" stroke={filled ? "#FFFFFF" : c}/>
  </Svg>;
}
function JarIcon({ size, filled }: { size: number; filled: boolean }) {
  const { colors } = useTheme();
  const c = filled ? colors.primary : colors.muted;
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={1.8}><Path d="M8 3h8v2.5c1.5.8 2.5 2.3 2.5 4V19a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2V9.5C5.5 8 6.5 6.5 8 5.5V3z" fill={filled ? c : "none"}/><Line x1="9" y1="3" x2="15" y2="3" stroke={filled ? "#FFFFFF" : c}/></Svg>;
}
function UsersIcon({ size, filled }: { size: number; filled: boolean }) {
  const { colors } = useTheme();
  const c = filled ? colors.primary : colors.muted;
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? c : "none"} stroke={c} strokeWidth={1.8}><Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><Circle cx="9" cy="7" r="4"/><Path d="M23 21v-2a4 4 0 0 0-3-3.87"/><Path d="M16 3.13a4 4 0 0 1
  0 7.75"/></Svg>;        
}
function HeartIcon({ size, filled }: { size: number; filled: boolean }) {
  const { colors } = useTheme();
  const c = filled ? colors.accent : colors.muted;
  return <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? c : "none"} stroke={c} strokeWidth={1.8}><Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Svg>;
}
