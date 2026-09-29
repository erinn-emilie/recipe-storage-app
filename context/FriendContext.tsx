
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "./AccountContext";
import { Recipe } from "./RecipeContext";

export interface Friend{
    username: string; 
    firstName: string;
    lastName: string;
    code: string;
}

export interface FriendRequest {
    username: string,
    name: string,
    date: string,
    requesterId: number
}

export interface RecipePost {
    postId: number,
    username: string, 
    recipe: Recipe,
    postText: string,
    saves: number,
    date: string,
    saved: boolean
}

interface FriendCtx{
    allFriends: Friend[];
    setAllFriends: (allFriends: Friend[]) => void;
    allFriendRequests: FriendRequest[];
    setAllFriendRequests: (allFriendRequests: FriendRequest[]) => void;
    FetchAllFriendRequests: () => void;
    allPosts: RecipePost[];
    setAllPosts: (allPosts: RecipePost[]) =>  void;
    FetchAllPosts: () => void;
    SendFriendRequest: (friendCode: string) => void;
    AcceptFriendRequest: (requesterId: number) => void;
    DeclineFriendRequest: (requesterId: number) => void;
    FetchAllFriends: () => void;
    PostRecipe: (recipeId: number) => void; 
}

const FriendContext = createContext<FriendCtx>({
    allFriends: [],
    setAllFriends: () => {},
    allFriendRequests: [],
    setAllFriendRequests: () => {},
    FetchAllFriendRequests: () => {},
    allPosts: [],
    setAllPosts: () => {},
    FetchAllPosts: () => {},
    SendFriendRequest: () => {},
    AcceptFriendRequest: () => {},
    DeclineFriendRequest: () => {},
    FetchAllFriends: () => {},
    PostRecipe: () => {}
})

export function FriendProvider({ children }: { children: React.ReactNode }){
    const[allFriends, setAllFriends] = useState<Friend[]>([]);
    const[allFriendRequests, setAllFriendRequests] = useState<FriendRequest[]>([]);
    const[allPosts, setAllPosts] = useState<RecipePost[]>([]);

    const { loggedInStatus, accountId } = useAccount();

    const apiUrl = "http://192.168.4.26:5000";

    function PostRecipe(recipeId: number){
        var serverUrl = `${apiUrl}/post-recipe`;
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "userId": accountId, "recipeId": recipeId })
        })          
    }

    function FetchAllFriends(){
        var serverUrl = `${apiUrl}/fetch-friends`;
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "userId": accountId })
        })        
        .then(response => response.json())
        .then(data => {
            if(data["status"] == "SUCCESS") { 
                const newFriends = data["friends"].map((friend: Friend) => {
                    return friend;
                })
                setAllFriends(newFriends); 
            }
            else{
                console.log("ERROR")
            }
        })
    }

    function FetchAllPosts(){
        var serverUrl = `${apiUrl}/fetch-friends-posts`;
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "userId": accountId })
        })        
        .then(response => response.json())
        .then(data => {
            if(data["status"] == "SUCCESS") { 
                const newPosts = data["posts"].map((post: RecipePost) => {
                    const recipe = post.recipe as Recipe;
                    recipe.img = recipe.img ? `http://192.168.4.26:5000/get_image/${recipe.img}` : "";
                    post.recipe = recipe;
                    return post;
                })
                console.log(newPosts)
                setAllPosts(newPosts); 
            }
            else{
                console.log("ERROR")
            }
        })
    }

    function AcceptFriendRequest(requesterId: number) {
        var serverUrl = `${apiUrl}/accept-friend-request`;
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "requesteeId": accountId, "requesterId": requesterId })
        })      
    }

    function DeclineFriendRequest(requesterId: number) {
        var serverUrl = `${apiUrl}/decline-friend-request`;
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "requesteeId": accountId, "requesterId": requesterId })
        })      
    }

    function FetchAllFriendRequests(){
        var serverUrl = `${apiUrl}/fetch-friend-requests`;
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "userId": accountId })
        })        
        .then(response => response.json())
        .then(data => {
            if(data["status"] == "SUCCESS") { 
                const newRequests = data["requests"].map((request: FriendRequest) => {
                    return request;
                })
                setAllFriendRequests(newRequests); 
            }
            else{
                console.log("ERROR")
            }
        })      
    }

    function SendFriendRequest(friendCode: string){
        var serverUrl = `${apiUrl}/send-friend-request`;
        console.log(accountId)
        console.log("trying to send friend request")
        fetch(serverUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "userId": accountId, "friendCode": friendCode })
        })        
    }

    useEffect(() => {
        if(loggedInStatus){
            FetchAllFriends(); 
        }
    }, [loggedInStatus])

    return(
        <FriendContext.Provider value={{ allFriends, setAllFriends, allFriendRequests, setAllFriendRequests, FetchAllFriendRequests, allPosts, setAllPosts, FetchAllPosts, SendFriendRequest, AcceptFriendRequest, DeclineFriendRequest, FetchAllFriends, PostRecipe }}>
            {children}
        </FriendContext.Provider>
    )
}


export function useFriends() {
  return useContext(FriendContext);
}
