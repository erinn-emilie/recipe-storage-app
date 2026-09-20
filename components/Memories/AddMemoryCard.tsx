import { useState } from "react";
import StarRating from "../../components/StarRating";
import { useTheme } from "../../context/ThemeContext";
import { useMemory, PosMemory } from "../../context/MemoryContext";
import { View, Pressable, Text, TextInput } from "react-native";
import Svg, { Polyline, Circle, Rect } from "react-native-svg";
import { launchImageLibrary } from "react-native-image-picker";
import DatePicker from "react-native-date-picker";




interface Props{
    setShowAddMemory: (state: boolean) => void; 
}

export default function AddMemoryCard({ setShowAddMemory }: Props){
    const { colors } = useTheme();
    const { setNewMemory} = useMemory();

    const [mealName, setMealName] = useState<string>("");
    const [chef, setChef] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const[img, setImg] = useState<string>("");
    const[date, setDate] = useState<Date>(new Date());


    
    const UploadPhoto = async () => {
        const result = await launchImageLibrary({ mediaType: "photo" } );
        if (!result.didCancel) {
            const assets = result.assets;
            if (assets != undefined) {
                const photo = assets[0];
                if (photo != undefined) {
                    setImg(photo.uri ?? "")
                }
            }
        }
    }

    const SaveMemory = () => {
        const newMemory: PosMemory = {
            title: mealName,
            chef: chef,
            notes: notes,
            img: img,
            date: date
        };
        setNewMemory(newMemory); 
    }

    return (
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)",  alignItems: "flex-end", zIndex: 50 }}>
          <View style={{ backgroundColor: colors.bg, borderRadius: "24px 24px 0 0", width: "100%", paddingTop: 24, paddingBottom: 32, paddingLeft: 20, paddingRight: 20 }}>
            <View style={{  justifyContent: "space-between", marginBottom: 20 }}>
              <Text style={{ margin: 0, fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Log a Memory</Text>
              <Pressable onPress={() => setShowAddMemory(false)} style={{ backgroundColor: "none", borderWidth: 0 }}>
                <Text style={{fontSize: 22, color: colors.muted }}>x</Text>
              </Pressable>
            </View>
            <View style={{ backgroundColor: `${colors.primary}10`, borderRadius: 14, padding: 14, marginBottom: 16 }}>
              <Pressable style={{ marginVertical: 25, marginHorizontal: 50, backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, paddingVertical: 11, paddingHorizontal: 14, cursor: "pointer"}} onPress={() => UploadPhoto()}>
                <Text style={{ color: "#FFFFFF" }}>Upload Photo</Text>
              </Pressable>
            </View>
            <View style={{ marginBottom: 14 }}>
                <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>Meal Name</Text>
                <TextInput onChangeText={setMealName} placeholder={"Enter meal name..."} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingTop: 11, paddingBottom: 11, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
            </View>
            <View style={{ marginBottom: 14 }}>
                <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>Chef</Text>
                <TextInput onChangeText={setChef} placeholder={"Enter chef name..."} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingTop: 11, paddingBottom: 11, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
            </View>
            <View style={{ marginBottom: 14 }}>
                <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>Notes</Text>
                <TextInput onChangeText={setNotes} placeholder={"Enter notes..."} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingTop: 11, paddingBottom: 11, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
            </View>
            <View style={{ marginBottom: 14 }}>
                <DatePicker date={new Date()} onDateChange={setDate} mode="date"></DatePicker>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ marginBottom: 8, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>YOUR RATING</Text>
              <StarRating rating={0} size={28} interactive={true} />
            </View>
            <Pressable onPress={SaveMemory} style={{ width: "100%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14 }}>
              <Text style={{color: "#FAF7F2", fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Save Memory</Text>
            </Pressable>
          </View>
        </View>
    )
}