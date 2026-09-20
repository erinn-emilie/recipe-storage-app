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
    ParseRecipeFromUrl: (url: string) => void
}

const RecipesContext = createContext<Recipes>({
    allRecipes: [],
    setAllRecipes: () => {},
    newManualRecipe: {} as ManualRecipe,
    setNewManualRecipe: () => {},
    readyToAddManualRecipe: false,
    setReadyToAddManualRecipe: () => {},
    ParseRecipeFromUrl: (url: string) => {}
})

export function RecipesProvider({ children }: { children: React.ReactNode }) {
    const[allRecipes, setAllRecipes] = useState<Recipe[]>([])
    const[newManualRecipe, setNewManualRecipe] = useState<ManualRecipe>({} as ManualRecipe)
    const[readyToAddManualRecipe, setReadyToAddManualRecipe] = useState<boolean>(false)
    const[saveRecipeError, setSaveRecipeError] = useState<string>("")
    const[fetchedAllRecipes, setFetchedAllRecipes] = useState<boolean>(false)

    const apiUrl = "http://192.168.4.119:5000";

    const { loggedInStatus, username } = useAccount();


    const GetRecipeJsonStr = () => {
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


    const ParseRecipeFromUrl = async (url: string) => {
        var serverUrl = `${apiUrl}/parse-recipe-from-url`;
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url, username: username })
        })        
        .then(response => response.json())
        .then(data => {
          if(data["status"] == "SUCCESS") { 
            const recipeData = data["recipe"];
            const newRecipe: Recipe = {
                title: recipeData["title"],
                desc: recipeData["desc"],
                img: `http://192.168.4.119:5000/get_image/${recipeData["img"]}`,
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
                origUrl: recipeData["origUrl"]
            };
            setAllRecipes([...allRecipes, newRecipe]);
            if(!loggedInStatus){
                var highestId = 0;
                allRecipes.map((value) => {
                    if(highestId < value.recipeId){
                        highestId = value.recipeId;
                    }
                });
                const string = JSON.stringify(newRecipe);
                RecipeStorage.set(String(highestId + 1), string);
            }
          }
        })
        .catch(error => {
          console.log(error.message);
        })     
    }

    const AddManualEntryLocally = async () => {
        var highestId = 0;
        allRecipes.map((value) => {
            if(highestId < value.recipeId){
                highestId = value.recipeId;
            }
        });
        var imageData = "";
        if(newManualRecipe.img != ""){
            console.log(newManualRecipe.img)
            console.log("ADD IMaGE DATA")
            imageData = await RNFS.readFile(newManualRecipe.img, 'base64');
            console.log(imageData)
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
            origUrl: "personal"
        };
        console.log(recipe.img);
        const string = JSON.stringify(recipe);
        RecipeStorage.set(String(highestId + 1), string);
        console.log(highestId + 1)
    }


    const SendNewManualEntry = async () => {
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
                    img: recipeData.img
                };   
                if(newManualRecipe.img != "") {
                    const path = await SendImgFromManualEntry(recipeData.recipeId);
                    newRecipe.img =  `http://192.168.4.119:5000/get_image/${path}`;
                }
                setAllRecipes([...allRecipes, newRecipe])
            }
            else {
                setSaveRecipeError(data["msg"])
            }
        })
        .catch(error => {
            setSaveRecipeError(error.message)
        })
        setReadyToAddManualRecipe(false);
    }

    const SendImgFromManualEntry = async (recipeId: number) => {
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
                setSaveRecipeError(data["msg"])
            }
            else{
                return data["path"]
            }
        })
        .catch(error => {
            setSaveRecipeError(error.message)
        })
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
        const GetAllRecipes = async () => {
            if(loggedInStatus){
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
                            const recipePath = recipeData.img ? `http://192.168.4.119:5000/get_image/${recipeData.img}` : "";
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
                    setSaveRecipeError(error.message)
                })
            }
            else{
                const allKeys = RecipeStorage.getAllKeys();
                const newRecipes = await Promise.all(
                    allKeys.map(async (key) => {
                        const recipeStr = RecipeStorage.getString(key);
                        if (recipeStr != undefined) {
                            const recipeObj = JSON.parse(recipeStr);

                            console.log("image")
                            console.log(recipeObj.img)
                            if(recipeObj.img != null){
                                const tempImagePath = `${RNFS.TemporaryDirectoryPath}/image_${Date.now()}.jpg`;
                                await RNFS.writeFile(tempImagePath, recipeObj.img, 'base64');
                                
                                recipeObj.img = tempImagePath; 
                            }
                            return recipeObj;
                        }
                        return null; 
                    })
                )
                setAllRecipes(newRecipes);
            }
            setFetchedAllRecipes(true);
        }
        if(!fetchedAllRecipes) {
            GetAllRecipes();
        }
    }, [loggedInStatus])


    return (
        <RecipesContext.Provider value={{ allRecipes, setAllRecipes, newManualRecipe, setNewManualRecipe, readyToAddManualRecipe, setReadyToAddManualRecipe, ParseRecipeFromUrl }}>
            {children}
        </RecipesContext.Provider>
    );

}

export function useRecipes() {
  return useContext(RecipesContext);
}

