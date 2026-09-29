import { useState, useEffect } from "react";
import { Recipe } from "../context/RecipeContext";
import { useFriends } from "../context/FriendContext"
import FriendRow from "../components/Friends/FriendRow";
import AddFriend from "../components/Friends/AddFriend";
import Posts from "../components/Friends/Posts";
import { useTheme } from "../context/ThemeContext";
import { View, Pressable, Text } from "react-native";
import FriendRequests from "../components/Friends/FriendRequests";

interface Props{
  onSelectRecipe: (r: Recipe) => void;
}

export default function FriendsScreen({onSelectRecipe}:Props) {
  const { colors } = useTheme();
  const { allPosts, FetchAllPosts } = useFriends();

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);

  useEffect(() => {
    FetchAllPosts()
  }, [])

  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between", alignItems: "flex-start", paddingTop: 50, paddingBottom: 20, paddingLeft: 20 }}>
          <View>
            <Text style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase" }}>Community</Text>
            <Text style={{ marginTop: 2, fontSize: 28, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Friends</Text>
          </View>  
        <Pressable onPress={() => setShowFriendRequests(true)} style={{ backgroundColor: colors.primary, borderWidth: 0, borderRadius: 10, paddingTop: 8, paddingBottom: 8, paddingLeft: 14, paddingRight: 14, marginTop: 20, alignItems: "center", gap: 6 }}>
          <Text style={{ color: "#FAF7F2", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Friend Requests</Text>
        </Pressable>
      </View>

      <FriendRow setShowAddFriend={setShowAddFriend}></FriendRow>

      <View style={{ paddingLeft: 20, paddingRight: 20 }}>
        {allPosts.map((post, idx) => (
          <Posts key={idx} post={post} id={idx} onSelectRecipe={onSelectRecipe}></Posts>
        ))}
      </View>

      {(showFriendRequests) && (
        <FriendRequests setShowFriendRequests={setShowFriendRequests} ></FriendRequests>
      )}


      {showAddFriend && (
        <AddFriend setShowAddFriend={setShowAddFriend}></AddFriend>
      )}
    </View>
  );
}
