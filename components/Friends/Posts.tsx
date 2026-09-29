import { RecipePost } from "../../context/FriendContext";
import { Recipe, useRecipes } from "../../context/RecipeContext";
import StarRating from "../../components/StarRating";
import { useTheme } from "../../context/ThemeContext";
import { useFriends } from "../../context/FriendContext";
import { ScrollView, View, Pressable, Text, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useState } from "react";


interface Props{
    post: RecipePost;
    onSelectRecipe: (recipe: Recipe) => void;
    id: number;
}
export default function Posts({post, onSelectRecipe, id}: Props){

    const { colors } = useTheme();
    const { SaveRecipeFromPost } = useRecipes();

    function SaveRecipe(){
        SaveRecipeFromPost(post.recipe, post.postId);
        post.saved = true;
    }
    console.log(post.recipe.img)
    return (
        <ScrollView key={id} style={{ backgroundColor: "#FFFFFF", borderRadius: 18, marginBottom: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <View style={{ paddingTop: 12, paddingLeft: 14, paddingRight: 14, paddingBottom: 10,  alignItems: "center", gap: 10, flexDirection: "row" }}>
                <View style={{ width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 12, fontWeight: 700, color: "#FFFFFF" }}>{post.username}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1410" }}>{post.username}</Text>
                    <Text style={{ margin: 0, fontSize: 11, color: colors.muted }}>{post.date}</Text>
                </View>
                <StarRating interactive={false} rating={Number(post.recipe.rating)} size={12} />
            </View>
            <Pressable onPress={() => onSelectRecipe(post.recipe)} style={{  borderTopWidth: 1, borderTopColor: colors.border, borderBottomWidth: 1, borderBottomColor: colors.border, cursor: "pointer", flexDirection: "row" }}>
                <View style={{ width: 80, height: 70, backgroundColor: "#E8E0D5", flexDirection: "row" }}>
                <Image src={post.recipe.img} alt={post.recipe.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </View>
                <View style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12 }}>
                <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{post.recipe.title}</Text>
                <Text style={{ marginTop: 3, fontSize: 11, color: colors.muted }}>{post.recipe.prepTime + post.recipe.cookTime} min</Text>
                </View>
            </Pressable>
            <View style={{ paddingTop: 10, paddingLeft: 14, paddingRight: 14, paddingBottom: 12 }}>
                <Text style={{ marginBottom: 10, fontSize: 13, color: colors.textSoft, fontStyle: "italic" }}>"{post.postText}"</Text>
                <View style={{  gap: 16, alignItems: "center", flexDirection: "row" }}>
                {(post.saved) && (
                    <Pressable style={{ backgroundColor: "none", borderWidth: 0, alignItems: "center", gap: 5, padding: 0, marginLeft: "auto" }}>
                        <Svg width="15" height="15" viewBox="0 0 24 24" fill="black" stroke={colors.muted} strokeWidth={2}><Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></Svg>
                        <Text style={{ fontSize: 12, fontWeight: 500, color: colors.muted }}>Saved</Text>
                    </Pressable>       
                )}
                {(!post.saved) && (
                    <Pressable onPress={SaveRecipe} style={{ backgroundColor: "none", borderWidth: 0, alignItems: "center", gap: 5, padding: 0, marginLeft: "auto" }}>
                        <Svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={2}><Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></Svg>
                        <Text style={{ fontSize: 12, fontWeight: 500, color: colors.muted }}>Save</Text>
                    </Pressable>
                )}
                </View>
            </View>
        </ScrollView>
    )
}