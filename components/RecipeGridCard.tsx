import { View, Image, Text, Pressable } from "react-native";
import { Recipe } from "../data/recipes";
import StarRating from "./StarRating";



export default function RecipeListCard({ recipe, onSelect, colors }: { recipe: Recipe; onSelect: () => void; colors: any }) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  return (
    <Pressable onPress={onSelect} style={{ backgroundColor: "#FFFFFF", borderRadius: 16, overflow: "hidden", cursor: "pointer",  boxShadow: "0 1px 3px rgba(0,0,0,0.06)", flexDirection: "row" }}>
      <View style={{ width: 90, height: 80, backgroundColor: "#E8E0D5", flexShrink: 0 }}>
        <Image src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </View>
      <View style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, flex: 1 }}>
        <Text style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{recipe.title}</Text>
        <View style={{  alignItems: "center", gap: 10, marginTop: 4, flexDirection: "row" }}>
          <StarRating rating={recipe.rating} size={11} />
          <Text style={{ fontSize: 11, color: colors.muted }}>{totalTime < 60 ? `${totalTime} min` : `${Math.round(totalTime / 60)}h`}</Text>
        </View>
      </View>
    </Pressable>
  );
}