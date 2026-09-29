import { useState } from "react";
import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useRecipes } from "../context/RecipeContext";
import { View, Pressable, Text, Image, TextInput } from "react-native";
import Svg, { Path, Polyline } from "react-native-svg";
import { Recipe } from "../context/RecipeContext";
import { useFriends } from "../context/FriendContext";
import { launchImageLibrary } from "react-native-image-picker";



interface Props {
  recipe: Recipe;
  onBack: () => void;
}

export default function RecipeDetailScreen({ recipe, onBack }: Props) {
  const { colors } = useTheme();
  const [tab, setTab] = useState<"cook" | "notes">("cook");
  const [editing, setEditing] = useState(false);
  
  const { setReadyToEditRecipe, setNewChangedRecipe, DeleteRecipe } = useRecipes(); 
  const { PostRecipe } = useFriends();


  const [servings, setServings] = useState(Number(recipe.servings));

  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);

  const [newTitle, setNewTitle] = useState(recipe.title);
  const [newIngredients, setNewIngredients] = useState<string>(recipe?.ingredients?.join('\n') ?? "");
  const [newInstructions, setNewInstructions] = useState<string>(recipe?.instructions?.join('\n') ?? "");
  const [newCookTime, setNewCookTime] = useState<string>(recipe.cookTime);
  const [newPrepTime, setNewPrepTime] = useState<string>(recipe.prepTime);
  const [newNotes, setNewNotes] = useState<string>(recipe.notes);
  const [newTags, setNewTags] = useState<string>(recipe.tags ?? "");
  const [newDesc, setNewDesc] = useState<string>(recipe.desc ?? "");
  const [newImg, setNewImg] = useState<string>(recipe.img ?? "");
  const [newUploadedStatus, setNewUploadedStatus] = useState<number>(recipe.uploaded ?? 0)

  const toggleStep = (i: number) => setCheckedSteps((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);
  const toggleIngredient = (i: number) => setCheckedIngredients((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  const UploadPhoto = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" } );
    if (!result.didCancel) {
      const assets = result.assets;
      if (assets != undefined) {
        const photo = assets[0];
        if (photo != undefined) {
          setNewImg(photo.uri ?? "")
        }
      }
    }
  }

  function SendDeleteRecipe() {
    DeleteRecipe(recipe.recipeId);
    onBack();
  }

  function SaveEdits() {
    const formattedIngredients = newIngredients
      .split('\n')
      .filter(ingredient => ingredient.trim() !== '');
      
    const formattedInstructions = newInstructions
      .split('\n')
      .filter(instruction => instruction.trim() !== '');

    var changedRecipe: Recipe = {
      recipeId: recipe.recipeId, 
      title: newTitle,
      cookTime: newCookTime,
      prepTime: newPrepTime,
      servings: String(servings),
      ingredients: formattedIngredients,
      instructions: formattedInstructions,
      desc: recipe.desc,
      img: newImg,
      rating: recipe.rating,
      tags: newTags,
      notes: newNotes,
      author: recipe.author,
      dateAdded: recipe.dateAdded,
      dateCreated: recipe.dateCreated,
      origUrl: recipe.origUrl,
      uploaded: newUploadedStatus
    }

    setNewChangedRecipe(changedRecipe);
    setReadyToEditRecipe(true);
    onBack();
  }



  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      <View style={{ position: "relative", height: 220, backgroundColor: "#E8E0D5" }}>
          <Image src={newImg} alt={recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <View style={{ position: "absolute", inset: 0, backgroundColor: "Linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.5) 100%)" }} />
            <Pressable onPress={onBack} style={{ position: "absolute", top: 39, left: 16, width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.35)", borderWidth: 0,  alignItems: "center", justifyContent: "center" }}>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2.5}><Path d="M19 12H5"/><Path d="m12 19-7-7 7-7"/></Svg>
            </Pressable>
            <View style={{ position: "absolute", bottom: 0, left: 20, right: 20, backgroundColor: colors.bg, borderRadius: 14 }}>
              <View style={{ padding: 10, alignItems: "center", justifyContent: "flex-end", borderColor: colors.border }} >
                {(!editing) && (
                  <>
                    <Text style={{ fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: colors.accent, textAlign: "center" }}>{recipe.title}</Text>
                    <Text style={{ fontSize: 12, fontFamily: "'Fraunces', serif", fontWeight: 200, color: colors.accent, textAlign: "center" }}>{recipe.desc}</Text>
                  </>
                )}
                {(editing) && (
                  <>
                    <TextInput onChangeText={setNewTitle} style={{ fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: colors.accent, textAlign: "center", backgroundColor: "white", borderColor: colors.border, borderStyle: "solid", borderWidth: 3, width: "100%", marginBottom: 10 }}>{newTitle}</TextInput>
                    <TextInput onChangeText={setNewDesc} style={{ fontSize: 12, fontFamily: "'Fraunces', serif", fontWeight: 200, color: colors.accent, textAlign: "center", backgroundColor: "white", borderColor: colors.border, borderStyle: "solid", borderWidth: 3, width: "100%", marginBottom: 10 }}>{newDesc}</TextInput>
                  </>
                )}
              </View>
              {(!editing) && (
                <Pressable onPress={() => setEditing(true)} style={{ backgroundColor: colors.accent, borderStyle: "solid", borderWidth: 2, padding: 10, borderRadius: 14, borderColor: colors.border }}>
                  <Text style={{ textAlign: "center", color: "white" }}>Edit</Text>
                </Pressable>
              )}
              {(editing) && (
                <View style={{flexDirection: "row"}}>
                  <Pressable onPress={SaveEdits} style={{ flexGrow: 1, backgroundColor: colors.accent, borderStyle: "solid", borderWidth: 2, padding: 10, borderRadius: 14, borderColor: colors.border }}>
                    <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
                  </Pressable>
                  <Pressable onPress={() => setEditing(false)} style={{ backgroundColor: colors.accent, borderStyle: "solid", borderWidth: 2, padding: 10, borderRadius: 14, borderColor: colors.border }}>
                    <Text style={{ textAlign: "center", color: "white" }}>Cancel</Text>
                  </Pressable>    
                  <Pressable onPress={UploadPhoto} style={{ backgroundColor: colors.accent, borderStyle: "solid", borderWidth: 2, padding: 10, borderRadius: 14, borderColor: colors.border }}>
                    <Text style={{ textAlign: "center", color: "white" }}>Swap Main Photo</Text>
                  </Pressable>  
                </View>
              )}
            </View>
            {(recipe.uploaded == 0) && (
              <Pressable onPress={() => PostRecipe(recipe.recipeId)} style={{ position: "absolute", top: 39, left: 360, width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.35)", borderWidth: 0,  alignItems: "center", justifyContent: "center" }}>
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
                  <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </Svg>              
              </Pressable>
            )}
            {(recipe.uploaded == 1) && (
              <Pressable style={{ position: "absolute", top: 39, left: 360, width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.35)", borderWidth: 0,  alignItems: "center", justifyContent: "center" }}>
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
                  <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <Path d="M18 2l-5.5 5.5M23 7l-6 6"/>
                </Svg>              
              </Pressable>
            )}
      </View>
      <View>
        <View style={{ backgroundColor: "#FFFFFF", paddingTop: 14, paddingBottom: 14, paddingLeft: 20, paddingRight: 20, gap: 0, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <View style={{ alignItems: "flex-start", flexDirection: "row", gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ margin: 0, fontSize: 10, color: colors.muted, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 500 }}>Prep</Text>
              {(editing) && (
                <TextInput onChangeText={setNewPrepTime} style={{ marginTop: 3, fontSize: 16, fontWeight: 600, color: "#1A1410", backgroundColor: "white", borderColor: colors.border, borderStyle: "solid", borderWidth: 3 }}>{recipe.prepTime}</TextInput>
              )}
              {(!editing) && (
                <Text style={{ marginTop: 3, fontSize: 16, fontWeight: 600, color: "#1A1410" }}>{recipe.prepTime}m</Text>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ margin: 0, fontSize: 10, color: colors.muted, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 500 }}>Cook</Text>
              {(editing) && (
                <TextInput onChangeText={setNewCookTime} style={{ marginTop: 3, fontSize: 16, fontWeight: 600, color: "#1A1410", backgroundColor: "white", borderColor: colors.border, borderStyle: "solid", borderWidth: 3 }}>{recipe.cookTime}</TextInput>
              )}
              {(!editing) && (
                <Text style={{ marginTop: 3, fontSize: 16, fontWeight: 600, color: "#1A1410" }}>{recipe.cookTime}m</Text>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ margin: 0, fontSize: 10, color: colors.muted, letterSpacing: 0.5, textTransform: "uppercase", fontWeight: 500 }}>Servings</Text>
              <View style={{  flexDirection: "row", alignItems: "flex-start", gap: 8, marginTop: 3 }}>
                  {(editing) && (
                    <Pressable onPress={() => setServings(Math.max(1, servings - 1))} style={{ width: 22, height: 22, borderRadius: 6, backgroundColor: `${colors.primary}18`, borderWidth: 0, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{fontSize: 14, color: colors.primary, fontWeight: 600}}>-</Text>
                    </Pressable>
                  )}
                  <Text style={{ fontSize: 16, fontWeight: 600, color: "#1A1410", minWidth: 20, textAlign: "center" }}>{servings}</Text>
                  {(editing) && (
                    <Pressable onPress={() => setServings(servings + 1)} style={{ width: 22, height: 22, marginBottom: 10, borderRadius: 6, backgroundColor: `${colors.primary}18`, borderWidth: 0, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{fontSize: 14, color: colors.primary, fontWeight: 600}}>+</Text> 
                    </Pressable>
                  )}
              </View>
            </View>
          </View>
        </View>

        <View style={{  backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: colors.border }}>
            {[{ id: "cook", label: "Cook" }, { id: "notes", label: "Notes & Photos" }].map((t) => (
            <Pressable
                key={t.id}
                onPress={() => setTab(t.id as any)}
                style={{
                padding: 12,
                backgroundColor: "none",
                borderWidth: 0,
                borderBottomWidth: 2,
                borderBottomColor: tab === t.id ? colors.primary : "transparent",
                marginBottom: -1,
                }}
            >
                <Text style={{ fontSize: 14, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? colors.primary : colors.muted, fontFamily: "'Outfit', sans-serif"}}>{t.label}</Text>
            </Pressable>
            ))}
        </View>
      </View>      
      {tab === "cook" && (
        <View>
          <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20 }}>
            <Text style={{ margin: 16, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Ingredients</Text>
            {(!editing) && recipe.ingredients.map((ing, i) => (
                <Pressable key={i} onPress={() => toggleIngredient(i)} style={{  alignItems: "center", gap: 12, paddingTop: 9, paddingBottom: 9, paddingLeft: 9, paddingRight: 15, flexDirection: "row", borderBottomWidth: 1, borderBottomColor: colors.border, cursor: "pointer", opacity: checkedIngredients.includes(i) ? 0.4 : 1 }}>
                  <View style={{ width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: checkedIngredients.includes(i) ? colors.primary : "#D4C5B0", backgroundColor: checkedIngredients.includes(i) ? colors.primary : "transparent",  alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {checkedIngredients.includes(i) && <Svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={3}><Polyline points="20 6 9 17 4 12"/></Svg>}
                  </View>
                  <Text style={{ flex: 1, fontSize: 14, color: "#1A1410" }}>{ing}</Text>
                </Pressable>
            ))}
            {(editing) && (
              <TextInput multiline={true} style={{ marginTop: 3, fontSize: 16, fontWeight: 600, color: "#1A1410", backgroundColor: "white", borderColor: colors.border, borderStyle: "solid", borderWidth: 3 }} onChangeText={setNewIngredients}>{newIngredients}</TextInput>
            )}
          </View>

          <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 24 }}>
            <Text style={{ marginBottom: 16, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Instructions</Text>
            {(!editing) && recipe.instructions.map((step, i) => (
                <Pressable key={i} onPress={() => toggleStep(i)} style={{  gap: 14, marginBottom: 16, cursor: "pointer", opacity: checkedSteps.includes(i) ? 0.35 : 1 }}>
                  <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: checkedSteps.includes(i) ? colors.primary : `${colors.primary}14`,  alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    {checkedSteps.includes(i)
                      ? <Svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={3}><Polyline points="20 6 9 17 4 12"/></Svg>
                      : <Text style={{ fontSize: 12, fontWeight: 700, color: colors.textSoft }}>{i + 1}</Text>}
                  </View>
                  <Text style={{ margin: 0, fontSize: 14, color: "#1A1410", flex: 1, textDecorationLine: checkedSteps.includes(i) ? "line-through" : "none" }}>{step}</Text>
                </Pressable>
            ))}
            {(editing) && (
              <TextInput multiline={true} style={{ marginTop: 3, fontSize: 16, fontWeight: 600, color: "#1A1410", backgroundColor: "white", borderColor: colors.border, borderStyle: "solid", borderWidth: 3 }} onChangeText={setNewInstructions}>{newInstructions}</TextInput>
            )}
          </View>
        </View>      
      )}

      {tab === "notes" && (
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 10, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Chef Notes</Text>
          {(!editing) && (
            <View style={{ backgroundColor: "#FFFBF5", borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingTop: 14, paddingBottom: 14, paddingLeft: 16, paddingRight: 16 }}>
              <Text style={{ margin: 0, fontSize: 14, color: "#1A1410", fontStyle: "italic", fontFamily: "'Fraunces', serif" }}>{recipe.notes}</Text>
            </View>
          )}
          {(editing) && (
            <TextInput multiline={true} style={{ marginTop: 3, fontSize: 16, fontWeight: 600, color: "#1A1410", backgroundColor: "white", borderColor: colors.border, borderStyle: "solid", borderWidth: 3 }} onChangeText={setNewNotes}>{newNotes}</TextInput>  
          )}
          {recipe.origUrl != "personal" && (
            <View style={{ marginTop: 20 }}>
              <Text style={{ marginBottom: 10, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Source</Text>
              <View style={{ backgroundColor: `${colors.primary}10`, borderRadius: 12, paddingTop: 12, paddingBottom: 14, paddingLeft: 14, paddingRight: 14, alignItems: "center", gap: 10 }}>
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}><Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Svg>
                <Text style={{ margin: 0, fontSize: 12, color: colors.textSoft }}>{recipe.origUrl}</Text>
              </View>
            </View>
          )}
          <View style={{ marginTop: 20 }}>
            <Text style={{ marginBottom: 10, fontSize: 13, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Tags</Text>
            <View style={{  flexWrap: "wrap", gap: 8, flexDirection: "row"}}>
              {(recipe.tags != null && !editing) && recipe.tags.split(',').map((t) => (
                <Text key={t} style={{ backgroundColor: `${colors.primary}12`, color: colors.textSoft, paddingTop: 6, paddingBottom: 6, paddingLeft: 14, paddingRight: 14, borderRadius: 20, fontSize: 13, fontWeight: 500 }}>{t}</Text>
              ))}
              {(recipe.tags != null && editing) && (
                <TextInput multiline={true} style={{ marginTop: 3, fontSize: 16, fontWeight: 600, color: "#1A1410", backgroundColor: "white", borderColor: colors.border, borderStyle: "solid", borderWidth: 3 }} onChangeText={setNewTags}>{newTags}</TextInput>   
              )}
            </View>
          </View>
          <View>
            <Pressable style={{ marginTop: 10, backgroundColor: colors.accent, borderStyle: "solid", borderWidth: 2, padding: 10, borderRadius: 14, borderColor: colors.border }} onPress={SendDeleteRecipe}>
              <Text style={{ textAlign: "center", color: "white" }}>Delete</Text>
            </Pressable>
          </View>
        </View>      
      )}
    </View>
  );
}

