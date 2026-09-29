import { useState, useEffect } from "react";
import StarRating from "../../components/StarRating";
import { useTheme } from "../../context/ThemeContext";
import { Memory, useMemory } from "../../context/MemoryContext";
import { View, Pressable, Text, Image, TextInput } from "react-native";

export default function MemoryCard({memory}: {memory:Memory}) {
    const [expanded, setExpanded] = useState<number | null>(null);
    const [editing, setEditing] = useState<boolean>(false);

    const[newTitle, setNewTitle] = useState<string>(memory.title);
    const[newChef, setNewChef] = useState<string>(memory.chef);
    const[newNotes, setNewNotes] = useState<string>(memory.notes);
    const[newRating, setNewRating] = useState<number>(memory.rating);

    const { colors } = useTheme();
    const { setNewChangedMemory } = useMemory();

    useEffect(() => {
        if(expanded == null) {
            setEditing(false);
        }
    }, [expanded])

    useEffect(() => {
        console.log(memory)
    }, [])

    function SaveMemory(){
        memory.title = newTitle;
        memory.chef = newChef;
        memory.notes = newNotes;
        memory.rating = newRating;
        setNewChangedMemory(memory);
        setExpanded(null)
    }
    return (
        <Pressable
            key={memory.id}
            style={{ backgroundColor: "#FFFFFF", borderRadius: 18, overflow: "hidden", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            onPress={() => setExpanded(expanded === memory.id ? null : memory.id)}
        >
            <View style={{ position: "relative", height: expanded === memory.id ? 160 : 120, backgroundColor: "#E8E0D5" }}>
                <Image src={memory.img} alt={memory.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <View style={{ position: "absolute", inset: 0, backgroundColor: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />
                    <View style={{ position: "absolute", bottom: 12, left: 14, right: 14,  justifyContent: "space-between", alignItems: "flex-end" }}>
                        {(!editing) && (
                            <>
                            <View>
                                    <Text style={{ margin: 0, fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#FFFFFF" }}>{memory.title}</Text>
                                    <Text style={{ marginTop: 2, fontSize: 11, color: "rgba(250,247,242,0.8)" }}>{memory.date.toString()} · Chef: {memory.chef}</Text>
                                </View>
                                <StarRating rating={memory.rating} size={13} />
                            </>
                        )}
                    </View>
            </View>
            {expanded === memory.id && (
                <View style={{ padding: 14 }}>
                    {(!editing) && (
                        <Text style={{ marginBottom: 12, fontSize: 13, color: colors.textSoft, fontStyle: "italic", fontFamily: "'Fraunces', serif" }}>"{memory.notes}"</Text>
                    )}
                    {(editing) && (
                        <View>
                            <StarRating rating={memory.rating} interactive={true} sendNewRating={setNewRating} size={17} />
                            <View style={{flexDirection: "row",  backgroundColor: colors.bg, paddingVertical: 5, paddingHorizontal: 10, alignItems: "center", gap: 10, borderRadius: 12}}>
                                <Text  style={{ margin: 0, fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 600, color: colors.primary }}>Title:</Text>
                                <TextInput onChangeText={setNewTitle} style={{width: "70%", borderRadius: 12, borderStyle: "solid", borderColor: colors.border, borderWidth: 3, backgroundColor: "white", margin: 0, fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 400, color: colors.primary }}>{memory.title}</TextInput>
                            </View>
                            <View style={{flexDirection: "row",  backgroundColor: colors.bg, paddingVertical: 5, paddingHorizontal: 10, alignItems: "center", gap: 10, borderRadius: 12}}>
                                <Text  style={{ margin: 0, fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 600, color: colors.primary }}>Chef:</Text>
                                <TextInput onChangeText={setNewChef} style={{width: "70%", borderRadius: 12, borderStyle: "solid", borderColor: colors.border, borderWidth: 3, backgroundColor: "white", margin: 0, fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 400, color: colors.primary }}>{memory.chef}</TextInput>
                            </View>    
                            <View style={{flexDirection: "row",  backgroundColor: colors.bg, paddingVertical: 5, paddingHorizontal: 10, alignItems: "center", gap: 10, borderRadius: 12}}>
                                <Text  style={{ margin: 0, fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 600, color: colors.primary }}>Notes:</Text>
                                <TextInput onChangeText={setNewNotes} style={{width: "70%", borderRadius: 12, borderStyle: "solid", borderColor: colors.border, borderWidth: 3, backgroundColor: "white", margin: 0, fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 400, color: colors.primary }}>{memory.notes}</TextInput>
                            </View>                           
                        </View>
                    )}
                    <View style={{  gap: 8, marginTop: 12 }}>
                        <View style={{flexDirection: "row", gap: 10}}>
                            {(!editing) && (
                                <Pressable onPress={() => setEditing(true)} style={{ flex: 1, backgroundColor: `${colors.primary}12`, borderWidth: 0, borderRadius: 10, padding: 9}}>
                                    <Text style={{fontSize: 12, textAlign: "center", fontWeight: 600, color: colors.primary, fontFamily: "'Outfit', sans-serif"}}>Edit</Text>
                                </Pressable>
                            )}
                            {(editing) && (
                                <Pressable onPress={SaveMemory} style={{ flex: 1, backgroundColor: `${colors.primary}12`, borderWidth: 0, borderRadius: 10, padding: 9}}>
                                    <Text style={{fontSize: 12, textAlign: "center", fontWeight: 600, color: colors.primary, fontFamily: "'Outfit', sans-serif"}}>Save</Text>
                                </Pressable>
                            )}
                            <Pressable style={{ flex: 1, backgroundColor: `${colors.primary}12`, borderWidth: 0, borderRadius: 10, padding: 9}}>
                                <Text style={{fontSize: 12, textAlign: "center", fontWeight: 600, color: colors.primary, fontFamily: "'Outfit', sans-serif"}}>Share</Text>
                            </Pressable>
                            <Pressable style={{ flex: 1, backgroundColor: `${colors.accent}12`, borderWidth: 0, borderRadius: 10, padding: 9}}>
                                <Text style={{fontSize: 12, textAlign: "center", fontWeight: 600, color: colors.accent, fontFamily: "'Outfit', sans-serif"}}>Delete</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
        </Pressable>
    )
}