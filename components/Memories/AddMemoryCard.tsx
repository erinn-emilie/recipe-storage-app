import { useState } from "react";
import StarRating from "../../components/StarRating";
import { useTheme } from "../../context/ThemeContext";
import { useMemory, PosMemory } from "../../context/MemoryContext";
import { View, Pressable, Text, TextInput, Image } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";




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
                  console.log(photo.uri)
                  setImg(photo.uri ?? "")
                }
            }
        }
    }
``
    const SaveMemory = () => {
        const newMemory: PosMemory = {
            title: mealName,
            chef: chef,
            notes: notes,
            img: img,
            date: date
        };
        setNewMemory(newMemory); 
        setShowAddMemory(false);
    }

    return (
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)",  alignItems: "flex-end", zIndex: 50 }}>
          <View style={{ backgroundColor: colors.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, width: "100%", paddingTop: 24, paddingBottom: 32, paddingLeft: 20, paddingRight: 20 }}>
            <View style={{  marginTop: 20, flexDirection:"row", justifyContent: "space-between", marginBottom: 20 }}>
              <Text style={{ marginTop: 2, fontSize: 28, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Log a Memory</Text>
              <Pressable onPress={() => setShowAddMemory(false)} style={{ backgroundColor: "none", borderWidth: 0 }}>
                <Text style={{fontSize: 22, color: colors.muted }}>x</Text>
              </Pressable>
            </View>
            <View style={{ borderRadius: 16, width: "100%", height: "20%", marginTop: 20, flexDirection:"row", justifyContent: "space-between" }}>
              <Image src={img} style={{ borderRadius: 16, width: "100%", height: "100%", objectFit: "cover" }} />
            </View>
            <Pressable style={{ marginVertical: 25, marginHorizontal: 50, backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, paddingVertical: 11, paddingHorizontal: 14, cursor: "pointer"}} onPress={() => UploadPhoto()}>
              <Text style={{ color: "#FFFFFF" }}>Upload Photo</Text>
            </Pressable>
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
            <View style={{ marginBottom: 16 }}>
              <Text style={{ marginBottom: 8, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>Rating</Text>
              <StarRating rating={0} size={28} interactive={true} />
            </View>
            <Pressable onPress={SaveMemory} style={{ width: "100%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14 }}>
              <Text style={{color: "#FAF7F2", fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Save Memory</Text>
            </Pressable>
          </View>
        </View>
    )
}