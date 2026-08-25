import { View, Image, Text, Pressable } from "react-native";
import { Recipe } from "../data/recipes";
import StarRating from "./StarRating";

interface Friend {
  id: string;
  name: string;
  initials: string;
  color: string;
}

interface FriendPost {
  id: string;
  friend: Friend;
  recipe: Recipe;
  note: string;
  date: string;
  likes: number;
  liked: boolean;
}

export default function RecipeGridCard({ recipe, onSelect, colors }: { recipe: Recipe; onSelect: () => void; colors: any }) {
  const totalTime = recipe.prepTime + recipe.cookTime;
  return (
    <Pressable onPress={onSelect} style={{ backgroundColor: "#FFFFFF", borderRadius: 16, overflow: "hidden", cursor: "pointer", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      <View style={{ position: "relative", height: 110, backgroundColor: "#E8E0D5" }}>
        <Image src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <View style={{ position: "absolute", top: 8, right: 8, backgroundColor: "rgba(250,247,242,0.92)", borderRadius: 8, paddingTop: 3, paddingBottom: 3, paddingLeft: 7, paddingRight: 7 }}>
          <Text style={{fontSize: 10, fontWeight: 600, color: colors.primary}}>{totalTime < 60 ? `${totalTime}m` : `${Math.round(totalTime / 60)}h`}</Text>
        </View>
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 12, paddingLeft: 10, paddingRight: 10 }}>
        <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{recipe.title}</Text>
        <View style={{ marginTop: 6 }}><StarRating rating={recipe.rating} size={10} /></View>
        <View style={{  flexWrap: "wrap", gap: 4, marginTop: 7, flexDirection: "row" }}>
          {recipe.tags.slice(0, 2).map((t) => (
            <Text key={t} style={{ fontSize: 9, backgroundColor: `${colors.primary}14`, color: colors.muted, paddingTop: 2, paddingBottom: 2, paddingLeft: 7, paddingRight: 7, borderRadius: 10, fontWeight: 500, letterSpacing: 0.3 }}>{t}</Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
}