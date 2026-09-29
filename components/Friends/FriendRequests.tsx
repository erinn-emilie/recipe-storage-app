import { useEffect } from "react";
import { useFriends } from "../../context/FriendContext"
import { useTheme } from "../../context/ThemeContext";
import { View, Pressable, Text } from "react-native";


interface Props {
    setShowFriendRequests: (status: boolean) => void;
}

export default function FriendRequests({setShowFriendRequests}:Props){
    const { allFriendRequests, FetchAllFriendRequests, AcceptFriendRequest, DeclineFriendRequest } = useFriends();
    const { colors } = useTheme(); 

    useEffect(() => {
        FetchAllFriendRequests();
    }, [])
     return (
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)",  alignItems: "center", zIndex: 50 }}>
            <View style={{ backgroundColor: colors.bg, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, width: "100%", paddingTop: 24, paddingLeft: 20, paddingRight: 20, paddingBottom: 32 }}>
              <View style={{  justifyContent: "space-between", marginBottom: 20, flexDirection: "row" }}>
                <Text style={{paddingTop: 20,fontSize: 24, color: colors.muted, fontWeight: 500 }}>Friend Requests</Text>
                <Pressable onPress={() => setShowFriendRequests(false)} style={{ backgroundColor: "none", borderWidth: 0, marginTop: 20 }}>
                  <Text style={{ fontSize: 22, color: colors.muted}}>x</Text>
                </Pressable>
              </View>
              {allFriendRequests.map((requests) => (
                <View style={{flexDirection: "row", backgroundColor: "#FFFFFF", borderRadius: 24, width: "100%", paddingTop: 24, paddingLeft: 20, paddingRight: 20, paddingBottom: 32 }}>
                  <View style={{marginRight: 50}}>
                    <Text style={{ margin: 0, fontSize: 20, fontWeight: 400, color: "#1A1410" }}>{requests.username} ({requests.name})</Text>
                    <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>wants to be your friend!</Text>
                    <Text style={{ margin: 0, fontSize: 11, color: colors.muted }}>{requests.date}</Text>
                    <View style = {{ flexDirection: "row" }}>
                        <Pressable onPress={() => AcceptFriendRequest(requests.requesterId)} style={{ marginRight: 5, backgroundColor: colors.primary, borderWidth: 0, borderRadius: 10, paddingTop: 8, paddingBottom: 8, paddingLeft: 14, paddingRight: 14, marginTop: 20, alignItems: "center", gap: 6 }}>
                            <Text style={{ color: "#FAF7F2", fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Accept</Text>
                        </Pressable>
                        <Pressable onPress={() => DeclineFriendRequest(requests.requesterId)} style={{ backgroundColor: colors.accent, borderWidth: 0, borderRadius: 10, paddingTop: 8, paddingBottom: 8, paddingLeft: 14, paddingRight: 14, marginTop: 20, alignItems: "center", gap: 6 }}>
                            <Text style={{ color: "#FAF7F2", fontSize: 12, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Decline</Text>
                        </Pressable>
                    </View>
                  </View>
                </View>
              ))}
          </View>
        </View>
     )
}