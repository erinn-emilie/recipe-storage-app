import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { View, Pressable, Text, TextInput, Image } from "react-native";
import { Recipe, ManualRecipe, useRecipes } from "../../context/RecipeContext";
import { launchImageLibrary } from "react-native-image-picker";
import StarRating from "../StarRating";



export default function ManualEntry( { onAdd } : { onAdd:() => void; } ){
    const { colors } = useTheme();
    const { setNewManualRecipe, setReadyToAddManualRecipe } = useRecipes();

    const[title, setTitle] = useState<string>("");
    const[desc, setDesc] = useState<string>("");
    const[img, setImg] = useState<string>("");
    const[prepTime, setPrepTime] = useState<string>("");
    const[cookTime, setCookTime] = useState<string>("");
    const[servings, setServings] = useState<string>("");
    const[rating, setRating] = useState<string>("");
    const[tags, setTags] = useState<string>("");
    const[ingredients, setIngredients] = useState<string>("");
    const[instructions, setInstructions] = useState<string>("");
    const[notes, setNotes] = useState<string>("");


    const[page, setPage] = useState<number>(1);




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

    const SaveRecipe = async () => {
      console.log("Save recipe on manual entry")
      const newRecipe: ManualRecipe = {
        title: title,
        desc: desc,
        prepTime: prepTime,
        cookTime: cookTime,
        rating: "5",
        img: img,
        tags: tags,
        servings: servings,
        notes: notes,
        ingredients: ingredients,
        instructions: instructions,
      };
      setNewManualRecipe(newRecipe);
      setReadyToAddManualRecipe(true);
      onAdd();
    }


    return (
      <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 24 }}>
        {page === 1 && (
          <>
            {(img != "") && (
              <Image style={{ width: 200, height: 200 }} source={{ uri: img }}></Image>
            )}
            <Text style={{ marginBottom: 16, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>Basics</Text>
            <View style={{ flexDirection: "row" }}>
              <FieldInput label="Title" value={title} onChange={setTitle} placeholder="e.g. Herb-Roasted Chicken" />
              <Pressable style={{ marginVertical: 25, marginHorizontal: 50, backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, paddingVertical: 11, paddingHorizontal: 14, cursor: "pointer"}} onPress={() => UploadPhoto()}>
                <Text style={{ color: "#FFFFFF" }}>Upload Photo</Text>
              </Pressable>
            </View>
            <FieldInput label="Description" value={desc} onChange={setDesc} placeholder="A short description..." multiline />
            <View style={{ gap: 10 }}>
              <FieldInput label="Prep (min)" value={prepTime} onChange={setPrepTime} placeholder="15" />
              <FieldInput label="Cook (min)" value={cookTime} onChange={setCookTime} placeholder="30" />
              <FieldInput label="Serves" value={servings} onChange={setServings} placeholder="4" />
            </View>
            <FieldInput label="Tags" value={tags} onChange={setTags} placeholder="e.g. chicken, easy, weeknight" />
          </>
        )}
        {page === 2 && (
          <>
            <Text style={{ marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>Ingredients</Text>
            <Text style={{ marginBottom: 12, fontSize: 12, color: colors.muted }}>One per line, e.g. "200 g butter"</Text>
            <TextInput
              multiline={true}
              value={ingredients}
              onChangeText={setIngredients}
              placeholder={"2 cups flour\n1 tsp salt\n3 eggs..."}
              rows={20}
              style={{ width: "100%", backgroundColor: "#FFFFFF", borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }}
            />
          </>
        )}
        {page === 3 && (
          <>
            <Text style={{ marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>Instructions</Text>
            <Text style={{ marginBottom: 12, fontSize: 12, color: colors.muted }}>One step per line</Text>
            <TextInput
              multiline={true}
              value={instructions}
              onChangeText={setInstructions}
              placeholder={"Preheat oven to 200°C.\nSear chicken until golden.\nRoast for 35 minutes..."}
              rows={20}
              style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor:colors.border, borderRadius: 12, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }}
            />
            <Text style={{ marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>Notes</Text>
            <TextInput
              multiline={true}
              value={notes}
              onChangeText={setNotes}
              placeholder={"Best served hot!"}
              rows={20}
              style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor:colors.border, borderRadius: 12, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }}
            />
          </>
        )}
        <View style={{ gap: 10, marginTop: 20, alignItems: "center" }}>
          {page > 1 && (
            <Pressable onPress={() => setPage(page - 1)} style={{ backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14, cursor: "pointer" }}>
              <Text style={{color: "#FAF7F2", fontSize: 15, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Back</Text>
            </Pressable>
          )}
          {page < 3 ? (
          <Pressable onPress={() => setPage(page + 1)} style={{ backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14, cursor: "pointer" }}>
              <Text style={{color: "#FAF7F2", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Continue</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => SaveRecipe()} style={{ flex: 2, backgroundColor: colors.accent, borderWidth: 0, borderRadius: 14, padding: 14, cursor: "pointer" }}>
              <Text style={{color: "#FAF7F2", fontSize: 15, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Save Recipe</Text>
            </Pressable>
          )}
        </View>
      </View>
  )
}

function FieldInput({ label, value, onChange, placeholder, multiline }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; multiline?: boolean }) {
  const { colors } = useTheme();
  const common = {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 14,
    color: "#1A1410",
    fontFamily: "'Outfit', sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
    resize: "none" as const,
  };
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>{label.toUpperCase()}</Text>
      {multiline
        ? <TextInput value={value} onChangeText={onChange} placeholder={placeholder} rows={3} style={common} />
        : <TextInput value={value} onChangeText={onChange} placeholder={placeholder} style={common} />
      }
    </View>
  );
}
