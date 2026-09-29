
import { useState, useEffect } from "react";
import { useFriends } from "../../context/FriendContext"
import { useTheme } from "../../context/ThemeContext";
import { View, Pressable, Text, TextInput } from "react-native";
import Svg, { Line } from "react-native-svg";

interface Props {
    setShowAddFriend: (status: boolean) => void;
}

export default function FriendRow({setShowAddFriend} : Props){
    const { allFriends, FetchAllFriends } = useFriends();
    const { colors } = useTheme();

    useEffect(() => {
        console.log("here")
        console.log(allFriends[0])
        FetchAllFriends()
    }, [])

    return (
      <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20, paddingBottom: 14, gap: 12, alignItems: "center" }}>
        {allFriends.map((f, idx) => (
          <View key={idx} style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            {(f.firstName != "" && f.lastName != "") && (
                <View style={{ width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", fontFamily: "'Outfit', sans-serif" }}>{f.firstName.charAt(0)}.{f.lastName.charAt(0)}.</Text>
                </View>
            )}
            <Text style={{ fontSize: 10, color: colors.muted, fontWeight: 500 }}>{f.username.split(" ")[0]}</Text>   
          </View>
        ))}
        <Pressable style={{ width: 48, height: 48, borderRadius: 16, borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.border, alignItems: "center", justifyContent: "center", cursor: "pointer" }} onPress={() => setShowAddFriend(true)}>
          <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={2}><Line x1="12" y1="5" x2="12" y2="19"/><Line x1="5" y1="12" x2="19" y2="12"/></Svg>
        </Pressable>
      </View>
    )
}