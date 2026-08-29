import { useState } from "react";
import { useTheme } from "../../theme/ThemeContext";
import { useAccount } from "../../theme/AccountContext";
import { View, Pressable, Text, TextInput } from "react-native";
import Svg, { Path, Line, Circle } from "react-native-svg";




export default function FriendCode({}:{}){
    const { colors } = useTheme();
    const { friendCode, setFriendCode} = useAccount();

    const [codeCopied, setCodeCopied] = useState(false);

    const copyFriendCode = () => {
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
    };
    return (
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, paddingTop: 4, paddingBottom: 4, paddingLeft: 16, paddingRight: 16, borderWidth: 1, borderColor: colors.border }}>
            <View style={{ paddingTop: 4, paddingBottom: 4 }}>
                <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500 }}>Your Friend Code</Text>
                <Text style={{ marginBottom: 10, fontSize: 13, color: colors.textSoft }}>
                Share this code with people you know so they can add you. Only friends you've approved can see your posts.
                </Text>
                <View style={{  alignItems: "center", gap: 10 }}>
                    <View style={{ flex: 1, backgroundColor: `${colors.primary}10`, borderRadius: 12, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, alignItems: "center", gap: 8 }}>
                        <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}><Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><Circle cx="9" cy="7" r="4"/><Line x1="19" y1="8" x2="19" y2="14"/><Line x1="22" y1="11" x2="16" y2="11"/></Svg>
                        <Text style={{ fontSize: 16, fontWeight: 700, color: colors.primary, letterSpacing: 2, fontFamily: "'Outfit', sans-serif" }}>{friendCode}</Text>
                    </View>
                    <Pressable onPress={copyFriendCode} style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, backgroundColor: codeCopied ? colors.primary : "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, cursor: "pointer" }}>
                        <Text style={{ fontSize: 13, fontWeight: 600, color: codeCopied ? "#FAF7F2" : colors.primary, fontFamily: "'Outfit', sans-serif"}}>{codeCopied ? "Copied!" : "Copy"}</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}