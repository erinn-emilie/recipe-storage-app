import { useState } from "react";
import { Recipe } from "../data/recipes";
import StarRating from "../components/StarRating";
import { useTheme } from "../theme/ThemeContext";
import { ScrollView, View, Pressable, Text, TextInput, Image } from "react-native";
import Svg, { Path, Line, Circle } from "react-native-svg";

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

const friends: Friend[] = [
  { id: "f1", name: "Elena R.", initials: "ER", color: "#2D4A3E" },
  { id: "f2", name: "Marcus W.", initials: "MW", color: "#C4633A" },
  { id: "f3", name: "Priya K.", initials: "PK", color: "#7B5EA7" },
];

interface Props {
  recipes: Recipe[];
  onSelectRecipe: (r: Recipe) => void;
}

export default function FriendsScreen({ recipes, onSelectRecipe }: Props) {
  const { colors } = useTheme();
  const [posts, setPosts] = useState<FriendPost[]>([
    { id: "p1", friend: friends[0], recipe: recipes[0], note: "Made this for Sunday dinner — absolutely incredible. The preserved lemon makes it.", date: "2 days ago", likes: 4, liked: false },
    { id: "p2", friend: friends[1], recipe: recipes[2], note: "The 48-hour rest is 100% worth it. This is my new go-to for any gathering.", date: "4 days ago", likes: 7, liked: true },
    { id: "p3", friend: friends[2], recipe: recipes[1], note: "Quick, cold, deeply savory. Made this twice this week already.", date: "1 week ago", likes: 3, liked: false },
  ]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"feed" | "friends">("feed");

  const toggleLike = (id: string) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ paddingTop: 16, paddingBottom: 12, paddingLeft: 20, paddingRight: 20, justifyContent: "space-between", alignItems: "flex-end" }}>
        <View>
          <Text style={{ margin: 0, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>Community</Text>
          <Text style={{ marginTop: 2, fontSize: 28, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Friends</Text>
        </View>
        <Pressable onPress={() => setShowAddFriend(true)} style={{ backgroundColor: colors.primary, borderWidth: 0, borderRadius: 10, paddingTop: 8, paddingBottom: 8, paddingLeft: 14, paddingRight: 14, alignItems: "center", gap: 6 }}>
          <Svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2.5}><Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><Circle cx="9" cy="7" r="4"/><Line x1="19" y1="8" x2="19" y2="14"/><Line x1="22" y1="11" x2="16" y2="11"/></Svg>
          <Text style={{ color: "#FAF7F2", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Add</Text>
        </Pressable>
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 14, gap: 12, alignItems: "center" }}>
        {friends.map((f) => (
          <View key={f.id} style={{ flexDirection: "column", alignItems: "center", gap: 5 }}>
            <View style={{ width: 48, height: 48, borderRadius: 16, backgroundColor: f.color, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", fontFamily: "'Outfit', sans-serif" }}>{f.initials}</Text>
            </View>
            <Text style={{ fontSize: 10, color: colors.muted, fontWeight: 500 }}>{f.name.split(" ")[0]}</Text>
          </View>
        ))}
        <Pressable style={{ width: 48, height: 48, borderRadius: 16, borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.border, alignItems: "center", justifyContent: "center", cursor: "pointer" }} onPress={() => setShowAddFriend(true)}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={2}><Line x1="12" y1="5" x2="12" y2="19"/><Line x1="5" y1="12" x2="19" y2="12"/></Svg>
        </Pressable>
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 14, gap: 8 }}>
        {[{ id: "feed", label: "Friends' Feed" }, { id: "friends", label: "Saved by Friends" }].map((f) => (
          <Pressable key={f.id} onPress={() => setActiveFilter(f.id as any)} style={{ paddingTop: 7, paddingBottom: 7, paddingLeft: 16, paddingRight: 16, borderRadius: 20, borderWidth: activeFilter === f.id ? 0 : 1, borderColor: activeFilter === f.id ? "transparent" : colors.border, backgroundColor: activeFilter === f.id ? colors.primary : "#FFFFFF", cursor: "pointer" }}>
            <Text style={{color: activeFilter === f.id ? "#FAF7F2" : colors.textSoft, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>{f.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        {posts.map((post) => (
          <ScrollView key={post.id} style={{ backgroundColor: "#FFFFFF", borderRadius: 18, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <View style={{ padding: "12px 14px 10px",  alignItems: "center", gap: 10 }}>
              <View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: post.friend.color,  alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 12, fontWeight: 700, color: "#FFFFFF" }}>{post.friend.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>{post.friend.name}</Text>
                <Text style={{ margin: 0, fontSize: 11, color: colors.muted }}>{post.date}</Text>
              </View>
              <StarRating rating={post.recipe.rating} size={12} />
            </View>
            <Pressable onPress={() => onSelectRecipe(post.recipe)} style={{  borderTopWidth: 1, borderTopColor: colors.border, borderBottomWidth: 1, borderBottomColor: colors.border, cursor: "pointer" }}>
              <View style={{ width: 80, height: 70, backgroundColor: "#E8E0D5", flexShrink: 0 }}>
                <Image src={post.recipe.image} alt={post.recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </View>
              <View style={{ padding: "10px 12px" }}>
                <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{post.recipe.title}</Text>
                <Text style={{ marginTop: 3, fontSize: 11, color: colors.muted }}>{post.recipe.folder} · {post.recipe.prepTime + post.recipe.cookTime}min</Text>
              </View>
            </Pressable>
            <View style={{ padding: "10px 14px 12px" }}>
              <Text style={{ marginBottom: 10, fontSize: 13, color: colors.textSoft, lineHeight: 1.5, fontStyle: "italic" }}>"{post.note}"</Text>
              <View style={{  gap: 16, alignItems: "center" }}>
                <Pressable onPress={() => toggleLike(post.id)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer",  alignItems: "center", gap: 5, padding: 0 }}>
                  <Svg width="16" height="16" viewBox="0 0 24 24" fill={post.liked ? colors.accent : "none"} stroke={post.liked ? colors.accent : colors.muted} strokeWidth={2}><Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></Svg>
                  <Text style={{ fontSize: 12, fontWeight: 500, color: post.liked ? colors.accent : colors.muted, }}>{post.likes}</Text>
                </Pressable>
                <Pressable style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer",  alignItems: "center", gap: 5, padding: 0 }}>
                  <Svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={2}><Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Svg>
                  <Text style={{ fontSize: 12, fontWeight: 500 }}>Comment</Text>
                </Pressable>
                <Pressable style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer",  alignItems: "center", gap: 5, padding: 0, marginLeft: "auto" }}>
                  <Svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={2}><Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></Svg>
                  <Text style={{ fontSize: 12, fontWeight: 500, color: colors.muted }}>Save</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        ))}
      </View>

      {showAddFriend && (
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)",  alignItems: "flex-end", zIndex: 50 }}>
          <View style={{ backgroundColor: colors.bg, borderRadius: "24px 24px 0 0", width: "100%", padding: "24px 20px 32px" }}>
            <View style={{  justifyContent: "space-between", marginBottom: 20 }}>
              <Text style={{ margin: 0, fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Add a Friend</Text>
              <Pressable onPress={() => setShowAddFriend(false)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer" }}>
                <Text style={{ fontSize: 22, color: colors.muted}}>x</Text>
                </Pressable>
            </View>
            <Text style={{ fontSize: 14, color: colors.textSoft, lineHeight: 1.6, marginTop: 0 }}>
              Enter a friend's code to send them a request. Only people you've approved can see your saved recipes and ratings.
            </Text>
            <View style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 14,  alignItems: "center", gap: 10, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, marginBottom: 16 }}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={2}><Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><Circle cx="9" cy="7" r="4"/><Line x1="19" y1="8" x2="19" y2="14"/><Line x1="22" y1="11" x2="16" y2="11"/></Svg>
              <TextInput placeholder="Enter friend code, e.g. DISH-4827" style={{ backgroundColor: "none", borderWidth: 0, fontSize: 14, color: "#1A1410", flex: 1, fontFamily: "'Outfit', sans-serif", letterSpacing: 0.5 }} />
            </View>
            <Pressable style={{ width: "100%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: "14px", alignItems: "center", cursor: "pointer" }}>
              <Text style={{color: "#FAF7F2", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Send Friend Request</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}
