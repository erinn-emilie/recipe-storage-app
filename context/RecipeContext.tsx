import RNFS from 'react-native-fs';
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "./AccountContext";
import { createMMKV } from 'react-native-mmkv';


export const RecipeStorage = createMMKV({
    id: "local-recipe-storage"
});



export interface Recipe {
    recipeId: number;
    title: string;
    desc: string;
    img: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    rating: string;
    tags: string;
    ingredients: string[];
    instructions: string[];
    notes: string;
    author: string;
    dateAdded: string;
    origUrl: string;
    dateCreated: string;
    uploaded: number;
}

export interface ManualRecipe {
    title: string;
    desc: string;
    img: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    rating: string;
    tags: string;
    ingredients: string;
    instructions: string;
    notes: string;
}



interface Recipes {
    allRecipes: Recipe[];
    setAllRecipes: (allRecipes: Recipe[]) => void;
    newManualRecipe: ManualRecipe;
    setNewManualRecipe: (newManualRecipe: ManualRecipe) => void;
    readyToAddManualRecipe: boolean;
    setReadyToAddManualRecipe: (readyToAddManualRecipe: boolean) => void;
    ParseRecipeFromUrl: (url: string) => void;
    setReadyToEditRecipe: (status: boolean) => void;
    setNewChangedRecipe: (newChangedRecipe: Recipe) => void
    DeleteRecipe: (recipeId: number) => void;
    SaveRecipeFromPost: (recipe: Recipe, postId: number) => void;
}

const RecipesContext = createContext<Recipes>({
    allRecipes: [],
    setAllRecipes: () => {},
    newManualRecipe: {} as ManualRecipe,
    setNewManualRecipe: () => {},
    readyToAddManualRecipe: false,
    setReadyToAddManualRecipe: () => {},
    ParseRecipeFromUrl: () => {},
    setReadyToEditRecipe: () => {},
    setNewChangedRecipe: () => {},
    DeleteRecipe: () => {},
    SaveRecipeFromPost: () => {}
})

export function RecipesProvider({ children }: { children: React.ReactNode }) {
    const[allRecipes, setAllRecipes] = useState<Recipe[]>([])
    const[newManualRecipe, setNewManualRecipe] = useState<ManualRecipe>({} as ManualRecipe)
    const[readyToAddManualRecipe, setReadyToAddManualRecipe] = useState<boolean>(false)
    const[fetchedAllRecipes, setFetchedAllRecipes] = useState<boolean>(false)
    const[readyToEditRecipe, setReadyToEditRecipe] = useState<boolean>(false)
    const[newChangedRecipe, setNewChangedRecipe] = useState<Recipe>({} as Recipe);

    const apiUrl = "http://192.168.4.26:5000";

    const { loggedInStatus, username, accountId } = useAccount();


    function SaveRecipeFromPost(recipe: Recipe, postId: number){
        const url = `${apiUrl}/save-recipe-from-post`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "userId": accountId, "recipeId": recipe.recipeId, "postId": postId })
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.json()
        })
        .then(async (data) => {
            const status = data["status"];
            if (status != "FAILURE") {          
                const newRecipe = data["recipe"] as Recipe;
                newRecipe.img = `http://192.168.4.26:5000/get_image/${newRecipe.img}`,
                setAllRecipes([...allRecipes, newRecipe])
            }
            else {
                console.log(data["msg"]);
            }
        })
        .catch(error => {
            console.log(error.message); 
        })
    }

    function DeleteRecipe(recipeId: number){
        if(!loggedInStatus){
            RecipeStorage.remove(String(recipeId)); 
            setAllRecipes([])
            FetchAllRecipesLocally();
        }
        else{
            const url = `${apiUrl}/delete-recipe`
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "userId": accountId, "recipeId": recipeId })
            })
            setAllRecipes([])
            FetchAllRecipes();
        }
    }

    function GetRecipeJsonStr() {
        const string = JSON.stringify({                 
            "username": username,
            "title": newManualRecipe.title,
            "desc": newManualRecipe.desc,
            "prepTime": newManualRecipe.prepTime, 
            "cookTime": newManualRecipe.cookTime,
            "servings": newManualRecipe.servings,
            "rating": newManualRecipe.rating ,
            "tags": newManualRecipe.tags,
            "ingredients": newManualRecipe.ingredients,
            "instructions": newManualRecipe.instructions, 
            "notes": newManualRecipe.notes,
            "img": newManualRecipe.img
        })
        return string; 
    }


    async function UpdateAllRecipes(recipe: Recipe, recipeId: String) {
        const newRecipes = await Promise.all(
            allRecipes.map(async (curRecipe) => {
                if (String(curRecipe.recipeId) === recipeId) {
                    if (recipe.img != null && recipe.img != "") {
                        const tempImagePath = `${RNFS.TemporaryDirectoryPath}/image_${Date.now()}.jpg`;
                        await RNFS.writeFile(tempImagePath, recipe.img, 'base64');
                        recipe.img = `file://${tempImagePath}`;
                    }
                    return recipe;
                }
                return curRecipe;
            })
        );
        setAllRecipes(newRecipes);
    }

    async function SendRecipeEdits(){
        var serverUrl = `${apiUrl}/edit-recipe`;
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ recipe: newChangedRecipe })
        })        
        .then(response => response.json())
        .then(data => {
            if(data["status"] == "SUCCESS") { 
                const recipeId = newChangedRecipe.recipeId;
                UpdateAllRecipes(newChangedRecipe, String(recipeId)); 
            }
            else{
                console.log("ERROR")
            }
        })
    }


    async function EditRecipeLocally() {
        if(newChangedRecipe.img != ""){
            const imageData = await RNFS.readFile(newChangedRecipe.img, 'base64');
            newChangedRecipe.img = imageData;
        }
        const strRecipeId = String(newChangedRecipe.recipeId); 
        RecipeStorage.set(strRecipeId, JSON.stringify(newChangedRecipe)); 
        UpdateAllRecipes(newChangedRecipe, strRecipeId); 
    }


    async function ParseRecipeFromUrl(url: string) {
        console.log("parse")
        var serverUrl = `${apiUrl}/parse-recipe-from-url`;
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url, username: username })
        })        
        .then(response => response.json())
        .then(async data => {
          if(data["status"] == "SUCCESS") { 
            const recipeData = data["recipe"];
            console.log(recipeData)
            const newRecipe: Recipe = {
                title: recipeData["title"],
                desc: recipeData["desc"],
                img: `http://192.168.4.26:5000/get_image/${recipeData["img"]}`,
                prepTime: recipeData["prepTime"],
                cookTime: recipeData["cookTime"],
                servings: recipeData["servings"],
                rating: recipeData["rating"],
                tags: recipeData["tags"],
                ingredients: recipeData["ingredients"],
                instructions: recipeData["instructions"],
                notes: recipeData["notes"],
                recipeId: recipeData["recipeId"],
                author: recipeData["author"],
                dateAdded: recipeData["dateAdded"],
                dateCreated: recipeData["dateCreated"],
                origUrl: recipeData["origUrl"],
                uploaded: 0
            };
            console.log(newRecipe);
            // if(!loggedInStatus){
            //     var highestId = 0;
            //     allRecipes.map((value) => {
            //         if(highestId < value.recipeId){
            //             highestId = value.recipeId;
            //         }
            //     });
            //     if(recipeData["img"]!= ""){
            //         const tempImagePath = `${RNFS.TemporaryDirectoryPath}/image_${Date.now()}.jpg`;
            //         await RNFS.writeFile(tempImagePath, recipeData["img"].img, 'base64');
            //         newRecipe.img = tempImagePath;
            //     }
            //     const string = JSON.stringify(newRecipe);
            //     RecipeStorage.set(String(highestId + 1), string);
            // }
            setAllRecipes([...allRecipes, newRecipe]);
          }
          else{
            console.log(data["msg"])
          }
        })   
    }

    async function AddManualEntryLocally() {
        var highestId = 0;
        allRecipes.map((value) => {
            if(highestId < value.recipeId){
                highestId = value.recipeId;
            }
        });
        var imageData = "";
        if(newManualRecipe.img != ""){
            imageData = await RNFS.readFile(newManualRecipe.img, 'base64');
        }
        
        const recipe: Recipe = {
            recipeId: (highestId + 1),
            title: newManualRecipe.title,
            desc: newManualRecipe.desc,
            img: imageData,
            prepTime: newManualRecipe.prepTime,
            cookTime: newManualRecipe.cookTime,
            servings: newManualRecipe.servings,
            rating: newManualRecipe.rating,
            tags: newManualRecipe.tags,
            ingredients: newManualRecipe.ingredients.split("\n"),
            instructions: newManualRecipe.instructions.split("\n"),
            notes: newManualRecipe.notes,
            author: "personal",
            dateAdded: Date.now().toString(),
            dateCreated: Date.now().toString(),
            origUrl: "personal",
            uploaded: 0
        };
        const string = JSON.stringify(recipe);
        RecipeStorage.set(String(highestId + 1), string);
        if(recipe.img != null){
            const tempImagePath = `${RNFS.TemporaryDirectoryPath}/image_${Date.now()}.jpg`;
            await RNFS.writeFile(tempImagePath, recipe.img, 'base64');
            
            recipe.img = `file://${tempImagePath}`; 
        }
        setAllRecipes([...allRecipes, recipe]);
    }


    async function SendNewManualEntry() {
        const url = `${apiUrl}/save-user-created-recipe`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: GetRecipeJsonStr()
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.json()
        })
        .then(async (data) => {
            const status = data["status"];
            if (status != "FAILURE") {
                const recipeData = data["recipeData"];
                const newRecipe: Recipe = {
                    title: recipeData["title"],
                    desc: recipeData.desc,
                    prepTime: recipeData.prepTime, 
                    cookTime: recipeData.cookTime,
                    servings: recipeData.servings,
                    rating: recipeData.rating ,
                    tags: recipeData.tags,
                    ingredients: recipeData.ingredients,
                    instructions: recipeData.instructions, 
                    notes: recipeData.notes,
                    recipeId: recipeData.recipeId,
                    author: recipeData.author,
                    dateAdded: recipeData.dateAdded,
                    dateCreated: recipeData.dateCreated,
                    origUrl: recipeData.origUrl,
                    img: recipeData.img,
                    uploaded: recipeData.uploaded
                };   
                if(newManualRecipe.img != "") {
                    const path = await SendImgFromManualEntry(recipeData.recipeId);
                    newRecipe.img =  `http://192.168.4.26:5000/get_image/${path}`;
                }
                setAllRecipes([...allRecipes, newRecipe])
            }
            else {
                console.log(data["msg"]);
            }
        })
        .catch(error => {
            console.log(error.message); 
        })
        setReadyToAddManualRecipe(false);
    }

    async function SendImgFromManualEntry(recipeId: number) {
        const url = `${apiUrl}/add-img-to-recipe`
        const base64 = await RNFS.readFile(newManualRecipe.img, 'base64');
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "recipeId": recipeId,
                "img": base64
            })
        })
         .then(response => {
            if(!response.ok){
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            const status = data["status"];
            if (status == "FAILURE") {
                console.log(data["msg"]);
            }
            else{
                return data["path"]
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    async function FetchAllRecipes() {
        const url = `${apiUrl}/get-all-recipes-for-user`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({                 
                "username": username
            })
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            const status = data["status"];
            if (status != "FAILURE") {
                const newRecipes = data["recipesList"].map((recipeData: Recipe) => {
                    const recipePath = recipeData.img ? `http://192.168.4.26:5000/get_image/${recipeData.img}` : "";
                    return {
                        title: recipeData["title"],
                        desc: recipeData.desc,
                        prepTime: recipeData.prepTime, 
                        cookTime: recipeData.cookTime,
                        servings: recipeData.servings,
                        rating: recipeData.rating,
                        tags: recipeData.tags,
                        ingredients: recipeData.ingredients,
                        instructions: recipeData.instructions, 
                        notes: recipeData.notes,
                        recipeId: recipeData.recipeId,
                        author: recipeData.author,
                        dateAdded: recipeData.dateAdded,
                        dateCreated: recipeData.dateCreated,
                        origUrl: recipeData.origUrl,
                        img: recipePath                    
                    } as Recipe;
                });
                setAllRecipes(newRecipes);
            }
        })
        .catch(error => {
            console.log(error.message)
        })
    }

    async function FetchAllRecipesLocally() {
        const allKeys = RecipeStorage.getAllKeys();
        const newRecipes = await Promise.all(
            allKeys.map(async (key) => {
                const recipeStr = RecipeStorage.getString(key);
                if (recipeStr != undefined) {
                    const recipeObj = JSON.parse(recipeStr);

                    if(recipeObj.img != null){
                        const tempImagePath = `${RNFS.TemporaryDirectoryPath}/image_${Date.now()}.jpg`;
                        await RNFS.writeFile(tempImagePath, recipeObj.img, 'base64');
                        
                        recipeObj.img = `file://${tempImagePath}`; 
                    }
                    return recipeObj;
                }
                return null; 
            })
        )
        setAllRecipes(newRecipes);
    }


    useEffect(() => {
        if(readyToAddManualRecipe) {
            if(loggedInStatus){
                SendNewManualEntry();
            }
            else{
                AddManualEntryLocally();
            }
            setReadyToAddManualRecipe(false); 
        }
    }, [readyToAddManualRecipe])


    useEffect(() => {
        setAllRecipes([])
        if(loggedInStatus){
            FetchAllRecipes(); 
            console.log("fetch")
        }
        else{
            console.log("fetch locally")
            FetchAllRecipesLocally();
        }
    }, [loggedInStatus])

    useEffect(() => {
        if(readyToEditRecipe){
            if(loggedInStatus){
                SendRecipeEdits(); 
            }
            else{
                EditRecipeLocally(); 
            }
            setReadyToEditRecipe(false);
        }
    }, [readyToEditRecipe])


    return (
        <RecipesContext.Provider value={{ allRecipes, setAllRecipes, newManualRecipe, setNewManualRecipe, readyToAddManualRecipe, setReadyToAddManualRecipe, ParseRecipeFromUrl, setReadyToEditRecipe, setNewChangedRecipe, DeleteRecipe, SaveRecipeFromPost }}>
            {children}
        </RecipesContext.Provider>
    );

}

export function useRecipes() {
  return useContext(RecipesContext);
}

