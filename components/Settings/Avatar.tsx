import { useState } from "react";
import { useTheme, THEMES, ThemeId } from "../../theme/ThemeContext";
import { View, Text, Image } from "react-native";



export default function Avatar({ name, email }: { name:string, email:string }) {
    const { colors } = useTheme();

    const FindInitials = (name: string) => {
        var whitespace = name.indexOf(' ')
        var firstInitial = name.charAt(0).toUpperCase()
        var secondInitial = name.charAt(1).toUpperCase()
        if(whitespace > -1 && whitespace+1 < name.length) {
            secondInitial = name.charAt(whitespace+1).toUpperCase()
        }
        return `${firstInitial}${secondInitial}`
    }
    
    return(
        <View style={{  flexDirection: "column", alignItems: "center", paddingTop: 12, paddingBottom: 20 }}>
            <View style={{ width: 72, height: 72, borderRadius: 22, backgroundColor: colors.primary,  alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                <Text style={{ fontSize: 26, fontWeight: 700, color: "#FAF7F2", fontFamily: "'Fraunces', serif" }}>{FindInitials(name)}</Text>
            </View>
            <Text style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{name}</Text>
            <Text style={{ marginTop: 3, fontSize: 12, color: colors.muted }}>{email}</Text>
        </View>
    )
}