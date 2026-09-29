import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import { View, Pressable, Text, TextInput } from "react-native";
import Svg, { Path, Line, Circle } from "react-native-svg";
import { useFriends } from "../../context/FriendContext"


interface Props {
    setShowAddFriend: (status: boolean) => void;
}

export default function AddFriend({setShowAddFriend}:Props) {
    const { colors } = useTheme();
    const { SendFriendRequest } = useFriends();

    const[friendCode, setFriendCode] = useState<string>("");

    function TrySendFriendRequest(){
        console.log(friendCode);
        SendFriendRequest(friendCode);
    }

    return (
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)",  alignItems: "flex-end", zIndex: 50 }}>
          <View style={{ backgroundColor: colors.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, width: "100%", paddingTop: 24, paddingLeft: 20, paddingRight: 20, paddingBottom: 32 }}>
            <View style={{  justifyContent: "space-between", marginBottom: 20, flexDirection: "row" }}>
              <Text style={{paddingTop: 20,fontSize: 24, color: colors.muted, fontWeight: 500 }}>Add A Friend</Text>
              <Pressable onPress={() => setShowAddFriend(false)} style={{ backgroundColor: "none", borderWidth: 0, marginTop: 20 }}>
                <Text style={{ fontSize: 22, color: colors.muted}}>x</Text>
                </Pressable>
            </View>
            <Text style={{ fontSize: 14, color: colors.textSoft, marginBottom: 20 }}>
              Enter a friend's code to send them a request. Only people you've approved can see your saved recipes and ratings.
            </Text>
            <View style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 14,  alignItems: "center", gap: 10, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, marginBottom: 16, flexDirection: "row" }}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={2}><Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><Circle cx="9" cy="7" r="4"/><Line x1="19" y1="8" x2="19" y2="14"/><Line x1="22" y1="11" x2="16" y2="11"/></Svg>
              <TextInput onChangeText={setFriendCode} placeholder="Enter friend code, e.g. DISH-4827" style={{ backgroundColor: "none", borderWidth: 0, fontSize: 14, color: "#1A1410", flex: 1, fontFamily: "'Outfit', sans-serif", letterSpacing: 0.5 }} />
            </View>
            <Pressable onPress={TrySendFriendRequest} style={{ width: "100%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14, alignItems: "center", cursor: "pointer" }}>
              <Text style={{color: "#FAF7F2", fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Send Friend Request</Text>
            </Pressable>
          </View>
        </View>
    )
}