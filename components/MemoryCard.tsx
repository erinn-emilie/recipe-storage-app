import { useState } from "react";
import StarRating from "../components/StarRating";
import { useTheme } from "../theme/ThemeContext";
import { View, Pressable, Text, Image } from "react-native";

interface Memory {
  id: string;
  title: string;
  date: string;
  chef: string;
  image: string;
  notes: string;
  rating: number;
  friendRatings: { name: string; rating: number }[];
}



export default function MemoryCard({memory}: {memory:Memory}) {
    const [expanded, setExpanded] = useState<string | null>(null);
    const { colors } = useTheme();

    return (
        <Pressable
            key={memory.id}
            style={{ backgroundColor: "#FFFFFF", borderRadius: 18, overflow: "hidden", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", cursor: "pointer" }}
            onPress={() => setExpanded(expanded === memory.id ? null : memory.id)}
        >
            <View style={{ position: "relative", height: expanded === memory.id ? 160 : 120, backgroundColor: "#E8E0D5" }}>
            <Image src={memory.image} alt={memory.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <View style={{ position: "absolute", inset: 0, backgroundColor: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />
                <View style={{ position: "absolute", bottom: 12, left: 14, right: 14,  justifyContent: "space-between", alignItems: "flex-end" }}>
                    <View>
                        <Text style={{ margin: 0, fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#FFFFFF" }}>{memory.title}</Text>
                        <Text style={{ marginTop: 2, fontSize: 11, color: "rgba(250,247,242,0.8)" }}>{memory.date} · Chef: {memory.chef}</Text>
                    </View>
                    <StarRating rating={memory.rating} size={13} />
                </View>
            </View>
            {expanded === memory.id && (
            <View style={{ padding: 14 }}>
                <Text style={{ marginBottom: 12, fontSize: 13, color: colors.textSoft, fontStyle: "italic", fontFamily: "'Fraunces', serif" }}>"{memory.notes}"</Text>
                {memory.friendRatings.length > 0 && (
                    <View style={{ borderTopWidth: 1, borderTopColor: colors.border,paddingTop: 10 }}>
                        <Text style={{ marginBottom: 8, fontSize: 10, color: colors.muted, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 600 }}>Friend Ratings</Text>
                        {memory.friendRatings.map((fr) => (
                        <View key={fr.name} style={{  justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                            <Text style={{ fontSize: 13, color: "#1A1410" }}>{fr.name}</Text>
                            <StarRating rating={fr.rating} size={12} />
                        </View>
                        ))}
                    </View>
                )}
                <View style={{  gap: 8, marginTop: 12 }}>
                    <Pressable style={{ flex: 1, backgroundColor: `${colors.primary}12`, borderWidth: 0, borderRadius: 10, padding: 9, cursor: "pointer"}}>
                        <Text style={{fontSize: 12, fontWeight: 600, color: colors.primary, fontFamily: "'Outfit', sans-serif"}}>Edit</Text>
                    </Pressable>
                    <Pressable style={{ flex: 1, backgroundColor: `${colors.primary}12`, borderWidth: 0, borderRadius: 10, padding: 9, cursor: "pointer"}}>
                        <Text style={{fontSize: 12, fontWeight: 600, color: colors.primary, fontFamily: "'Outfit', sans-serif"}}>Share</Text>
                    </Pressable>
                </View>
            </View>
            )}
        </Pressable>
    )
}