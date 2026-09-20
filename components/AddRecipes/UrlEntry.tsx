import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAccount } from "../../context/AccountContext";
import { View, Pressable, Text, TextInput } from "react-native";
import { useRecipes } from "../../context/RecipeContext";



export default function UrlEntry( { onAdd } : { onAdd:() => void; } ){
    const { colors } = useTheme();
    const { ParseRecipeFromUrl } = useRecipes();

    const [url, setUrl] = useState<string>("");

    const parse = async () => {
        ParseRecipeFromUrl(url); 
        onAdd();    
    }
    return (
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
            onPress={parse}
            disabled={!url}
            style={{ width: "100%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, paddingTop: 14, paddingBottom: 14, paddingLeft: 14, paddingRight: 14, cursor: "pointer", opacity: !url ? 0.5 : 1,}}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Parse Recipe</Text>
          </Pressable>
          {parseError && (
            <Text style={{ color: "red", fontSize: 12, marginTop: 8 }}>{parseError}</Text>
          )};
        </View>
    );
}