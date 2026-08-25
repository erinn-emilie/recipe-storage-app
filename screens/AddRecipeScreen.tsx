import { useState } from "react";
import { Recipe } from "../data/recipes";
import { useTheme } from "../theme/ThemeContext";
import { View, Pressable, Text, TextInput } from "react-native";
import Svg, { Path, Polyline } from "react-native-svg";

interface Props {
  onAdd: (r: Recipe) => void;
  onBack: () => void;
}

export default function AddRecipeScreen({ onAdd, onBack }: Props) {
  const { colors } = useTheme();
  const [mode, setMode] = useState<"manual" | "url" | null>(null);
  const [url, setUrl] = useState("");
  const [parsing, setParsing] = useState(false);
  const [parseFeedback, setParseFeedback] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folder, setFolder] = useState("Quick");
  const [servings, setServings] = useState("4");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [stepInput, setStepInput] = useState("");
  const [tags, setTags] = useState("");
  const [step, setStep] = useState(1);

  const parseRecipeFromUrl = () => {

  }


  const submit = () => {
    if (!title) return;
    const recipe: Recipe = {
      id: Date.now().toString(),
      title,
      description,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=500&fit=crop&auto=format",
      prepTime: parseInt(prepTime) || 15,
      cookTime: parseInt(cookTime) || 30,
      servings: parseInt(servings) || 4,
      rating: 0,
      folder,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      ingredients: ingredientInput.split("\n").filter(Boolean).map((line) => {
        const parts = line.trim().split(" ");
        return { amount: parts[0] || "", unit: parts[1] || "", name: parts.slice(2).join(" ") || line.trim() };
      }),
      steps: stepInput.split("\n").filter(Boolean).map((s) => s.replace(/^\d+\.\s*/, "")),
      notes: "",
      parsedFrom: parseFeedback ? url : undefined,
      createdAt: new Date().toISOString().split("T")[0],
    };
    onAdd(recipe);
  };

  const FOLDERS = ["Quick", "Slow Cooks", "Baking", "Vegetables", "Pasta", "Soups", "Other"];

  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      {/* Header */}
      <View style={{ paddingTop: 40, paddingLeft: 20, paddingRight: 20, paddingBottom: 14, alignItems: "center", gap: 14 , flexDirection: "row"}}>
        <Pressable onPress={onBack} style={{ width: 36, height: 36, borderRadius: 10, borderTopColor: colors.border, borderBottomColor: colors.border, borderLeftColor: colors.border, borderRightColor: colors.border, borderWidth: 1, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" }}>
          <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5C4D3A" strokeWidth={2.5}><Path d="M19 12H5"/><Path d="m12 19-7-7 7-7"/></Svg>
        </Pressable>
        <View>
          <Text style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>New Recipe</Text>
          <Text style={{ marginTop: 2, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 22, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Add Recipe</Text>
        </View>
      </View>

      {/* Mode selection */}
      {!mode && (
        <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{ fontSize: 14, color: colors.textSoft, marginBottom: 20}}>
            Enter a recipe manually, or paste a URL from any recipe website and we'll extract the recipe for you — no blog stories, no ads.
          </Text>
          <View style={{ flexDirection: "column", gap: 12 }}>
            <Pressable
              onPress={() => setMode("url")}
              style={{ backgroundColor: colors.primary, borderWidth:0, paddingTop: 18, paddingBottom: 18, paddingLeft: 20, paddingRight: 20, alignItems: "center", gap: 14, cursor: "pointer"}}
            >
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(250,247,242,0.15)", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2}><Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></Svg>
              </View>
              <View>
                <Text style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 16, fontWeight: 600, color: "#FAF7F2", fontFamily: "'Fraunces', serif" }}>Parse from URL</Text>
                <Text style={{ marginTop: 3, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 12, color: "rgba(250,247,242,0.7)" }}>Paste a recipe link!</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => setMode("manual")}
              style={{ backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 16, paddingTop: 18, paddingBottom: 18, paddingLeft: 20, paddingRight: 20, alignItems: "center", gap: 14, cursor: "pointer" }}
            >
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}><Path d="M12 20h9"/><Path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></Svg>
              </View>
              <View>
                <Text style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 16, fontWeight: 600, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>Enter manually</Text>
                <Text style={{ marginTop: 3, marginBottom: 0, marginLeft: 0, marginRight: 0, fontSize: 12, color: colors.muted }}>Fill in the details yourself</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}

      {/* URL entry */}
      {mode === "url" && !parseFeedback && (
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Text style={{ fontSize: 14, color: colors.textSoft, marginBottom: 16 }}>
            Paste the URL of any recipe page. We'll extract the ingredients, steps, and timing — and leave behind the blog post.
          </Text>
          <View style={{ marginBottom: 14 }}>
            <Text style={{ marginTop: 0, marginBottom: 6, marginLeft: 0, marginRight: 0, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>RECIPE URL</Text>
            <TextInput
              value={url}
              onChangeText={setUrl}
              placeholder="https://..."
              style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth:1, borderColor:colors.border, borderRadius: 12, paddingTop: 13, paddingBottom: 13, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }}
            />
          </View>
          <Pressable
            onPress={parseRecipeFromUrl}
            disabled={parsing || !url}
            style={{ width: "100%", backgroundColor: parsing ? colors.muted : colors.primary, borderWidth: 0, borderRadius: 14, paddingTop: 14, paddingBottom: 14, paddingLeft: 14, paddingRight: 14, cursor: "pointer", opacity: !url ? 0.5 : 1,}}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>{parsing ? "Parsing recipe…" : "Parse Recipe"}</Text>
          </Pressable>
          {parsing && (
            <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}>
              <View style={{ gap: 6 }}>
                {[0, 1, 2].map((i) => (
                  <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary }} />
                ))}
              </View>
              <Text style={{ fontSize: 13, color: colors.muted, marginTop: 10 }}>Extracting recipe from page…</Text>
            </View>
          )}
          <Pressable onPress={() => setMode(null)} style={{ width: "100%", backgroundColor: "transparent", borderWidth: 0, borderRadius: 14, paddingTop: 14, paddingBottom: 14, paddingLeft: 14, paddingRight: 14, cursor: "pointer" }}>
            <Text style={{fontSize: 14, color: colors.muted, marginTop: 8, fontFamily: "'Outfit', sans-serif" }}>Cancel</Text>
          </Pressable>
        </View>
      )}

      {/* Manual entry form */}
      {mode === "manual" && (
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 24 }}>
          {parseFeedback && (
            <View style={{ backgroundColor: "#F0F7F4", borderColor: "#A8C5BC", borderWidth: 1, borderRadius: 12, paddingTop: 10, paddingBottom: 10, paddingLeft: 14, paddingRight: 14, marginBottom: 16, alignItems: "center", gap: 8 }}>
              <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2.5}><Polyline points="20 6 9 17 4 12"/></Svg>
              <Text style={{ margin: 0, fontSize: 12, color: colors.primary, fontWeight: 500 }}>Parsed successfully — review and save</Text>
            </View>
          )}

          {/* Step indicator */}
          <View style={{ display: "flex", gap: 6, marginBottom: 20 }}>
            {[1, 2, 3].map((s) => (
              <View key={s} style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: s <= step ? colors.primary : colors.border }} />
            ))}
          </View>

          {step === 1 && (
            <>
              <Text style={{ marginBottom: 16, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>Basics</Text>
              <FieldInput label="Title" value={title} onChange={setTitle} placeholder="e.g. Herb-Roasted Chicken" />
              <FieldInput label="Description" value={description} onChange={setDescription} placeholder="A short description..." multiline />
              <View style={{ gap: 10 }}>
                <FieldInput label="Prep (min)" value={prepTime} onChange={setPrepTime} placeholder="15" />
                <FieldInput label="Cook (min)" value={cookTime} onChange={setCookTime} placeholder="30" />
                <FieldInput label="Serves" value={servings} onChange={setServings} placeholder="4" />
              </View>
              <FieldInput label="Tags" value={tags} onChange={setTags} placeholder="e.g. chicken, easy, weeknight" />
            </>
          )}

          {step === 2 && (
            <>
              <Text style={{ marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>Ingredients</Text>
              <Text style={{ marginBottom: 12, fontSize: 12, color: colors.muted }}>One per line, e.g. "200 g butter"</Text>
              <TextInput
                multiline={true}
                value={ingredientInput}
                onChangeText={setIngredientInput}
                placeholder={"2 cups flour\n1 tsp salt\n3 eggs..."}
                rows={10}
                style={{ width: "100%", backgroundColor: "#FFFFFF", borderColor: colors.border, borderWidth: 1, borderRadius: 12, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }}
              />
            </>
          )}

          {step === 3 && (
            <>
              <Text style={{ marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>Method</Text>
              <Text style={{ marginBottom: 12, fontSize: 12, color: colors.muted }}>One step per line</Text>
              <TextInput
                multiline={true}
                value={stepInput}
                onChangeText={setStepInput}
                placeholder={"Preheat oven to 200°C.\nSear chicken until golden.\nRoast for 35 minutes..."}
                rows={12}
                style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor:colors.border, borderRadius: 12, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }}
              />
            </>
          )}

          <View style={{ gap: 10, marginTop: 20, alignItems: "center" }}>
            {step > 1 && (
              <Pressable onPress={() => setStep(step - 1)} style={{ backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14, cursor: "pointer" }}>
                <Text style={{color: "#FAF7F2", fontSize: 15, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Back</Text>
              </Pressable>
            )}
            {step < 3 ? (
            <Pressable onPress={() => setStep(step + 1)} style={{ backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14, cursor: "pointer" }}>
                <Text style={{color: "#FAF7F2", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif" }}>Continue</Text>
              </Pressable>
            ) : (
              <Pressable onPress={submit} style={{ flex: 2, backgroundColor: colors.accent, borderWidth: 0, borderRadius: 14, padding: 14, cursor: "pointer" }}>
                <Text style={{color: "#FAF7F2", fontSize: 15, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Save Recipe</Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
    </View>
  );
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
