import { useState } from "react";
import { Recipe } from "../data/recipes";
import RecipeGridCard from "../components/RecipeListCard";
import RecipeListCard from "../components/RecipeGridCard";
import { useTheme } from "../theme/ThemeContext";
import { View, Pressable, Text, TextInput } from "react-native";
import Svg, { Circle, Line, Path, Rect } from "react-native-svg";

interface Props {
  recipes: Recipe[];
  onSelect: (r: Recipe) => void;
  onAdd: () => void;
}

export default function RecipesScreen({ recipes, onSelect, onAdd }: Props) {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = recipes.filter((r) => {
    const matchSearch = search === "" || r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some((t) => t.includes(search.toLowerCase()));
    return matchSearch;
  });

  return (
    <View style={{ paddingTop: 16, backgroundColor: colors.bg, flex: 1 }}>
      <View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 20, paddingLeft: 20, paddingBottom: 20}}>
          <View>
            <Text style={{ margin: 0, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>My Kitchen</Text>
            <Text style={{ marginTop: 2, fontSize: 28, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Recipes</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", paddingRight: 25}}>
            <Pressable
              onPress={onAdd}
              style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primary, borderWidth: 0,  alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <SearchIcon/>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ marginLeft: 20, marginRight: 20, paddingLeft: 10,  backgroundColor: colors.bg === "#FAF7F2" ? "#F0EBE3" : `${colors.primary}12`, borderRadius: 12,  alignItems: "center", gap: 8, flexDirection: "row" }}>
          <Svg style={{ paddingLeft: 30}} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={2}><Circle cx="11" cy="11" r="8"/><Path d="m21 21-4.35-4.35"/></Svg>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search recipes or tags..."
            style={{ backgroundColor: "none", borderWidth: 0, flex: 1, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif" }}
          />
      </View>
      <View style={{  flexDirection: "column", gap: 10, paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
        {filtered.map((r) => (
          <RecipeGridCard key={r.id} recipe={r} onSelect={() => onSelect(r)} colors={colors} />
        ))}
      </View>

      {filtered.length === 0 && (
        <View style={{ paddingTop: 40, paddingBottom: 40, paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{ fontSize: 16, fontFamily: "'Fraunces', serif", fontStyle: "italic", textAlign: "center",  color: colors.muted }}>No recipes found</Text>
          <Text style={{ fontSize: 13, marginTop: 4,  textAlign: "center",  color: colors.muted }}>Try a different search or folder</Text>
        </View>
      )}

      <View style={{ height: 20 }} />
    </View>
  );
}

function ListIcon({ color }: { color: string }) {
  return <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}><Line x1="8" y1="6" x2="21" y2="6"/><Line x1="8" y1="12" x2="21" y2="12"/><Line x1="8" y1="18" x2="21" y2="18"/><Line x1="3" y1="6" x2="3.01" y2="6"/><Line x1="3" y1="12" x2="3.01" y2="12"/><Line x1="3" y1="18" x2="3.01" y2="18"/></Svg>;
}
function GridIcon({ color }: { color: string }) {
  return <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}><Rect x="3" y="3" width="7" height="7"/><Rect x="14" y="3" width="7" height="7"/><Rect x="3" y="14" width="7" height="7"/><Rect x="14" y="14" width="7" height="7"/></Svg>;
}

function SearchIcon() {
  return <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2.5}><Line x1="12" y1="5" x2="12" y2="19"/><Line x1="5" y1="12" x2="19" y2="12"/></Svg>;
}