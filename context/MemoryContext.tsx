import { createMMKV } from 'react-native-mmkv';
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "./AccountContext";
import RNFS from 'react-native-fs';



export const MemoryStorage = createMMKV({
    id: "local-memory-storage"
});

const apiUrl = "http://192.168.4.26:5000";


export interface Memory {
  id: number;
  title: string;
  date: Date;
  chef: string;
  img: string;
  notes: string;
  rating: number;
  friendRatings: { name: string; rating: number }[];
}

export interface PosMemory {
    title: string;
    date: Date;
    chef: string;
    img: string;
    notes: string;
}

interface MemoryCtx {
    allMemories: Memory[],
    setAllMemories: (allMemories: Memory[]) => void
    newMemory: PosMemory | undefined,
    setNewMemory: (newMemory: PosMemory) => void
    setNewChangedMemory: (newMemory: Memory) => void;
};


const MemoryContext = createContext<MemoryCtx>({
    allMemories: [],
    setAllMemories: () => {},
    newMemory: undefined,
    setNewMemory: () => {},
    setNewChangedMemory: () => {}
});


export function MemoryProvider({ children } : { children: React.ReactNode }){
    const [allMemories, setAllMemories] = useState<Memory[]>([]);
    const [newMemory, setNewMemory] = useState<PosMemory | undefined>(); 
    const [fetchedAllMemories, setFetchedAllMemories] = useState<boolean>(false);
    const [newChangedMemory, setNewChangedMemory] = useState<Memory>();

    const { loggedInStatus, username } = useAccount();

    async function UpdateAllMemories(memory: Memory, memoryId: String) {
        const newMemories = await Promise.all(
            allMemories.map(async (curMemory) => {
                if (String(curMemory.id) === memoryId) {
                    if (memory.img != null && memory.img != "") {
                        const tempImagePath = `${RNFS.TemporaryDirectoryPath}/image_${Date.now()}.jpg`;
                        await RNFS.writeFile(tempImagePath, memory.img, 'base64');
                        memory.img = `file://${tempImagePath}`;
                    }
                    return memory;
                }
                return curMemory;
            })
        );
        setAllMemories(newMemories);
    }

    const SaveMemoryLocally = () => {
        var oldestId = allMemories.length > 0 ? allMemories[allMemories.length-1].id : 0;
        var newId = oldestId+1;
        const newFullMemory: Memory = {
            id: newId,
            title: newMemory?.title ?? "",
            chef: newMemory?.chef ?? "",
            notes: newMemory?.notes ?? "",
            img: newMemory?.img ?? "",
            rating: 5,
            friendRatings: [],
            date: newMemory?.date ?? new Date()
        };
        const memoryStr = JSON.stringify(newFullMemory);
        console.log(memoryStr)
        console.log(newId)
        MemoryStorage.set(`${newId}`, memoryStr);
        setAllMemories([...allMemories, newFullMemory]);
    }

    const SaveMemoryOnline = async () => {
        const url = `${apiUrl}/save-memory`
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({                 
                "username": username,
                "memory": newMemory
            })
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`Server Error: ${response.status}`);
            }
            return response.json()
        })
        .then(async (data) => {
            if(data["status"] == "SUCCESS"){
                const memoryData = data["memory"];
                const newFullMemory: Memory = {
                    id: memoryData["memoryId"],
                    title: newMemory?.title ?? "",
                    chef: newMemory?.chef ?? "",
                    notes: newMemory?.notes ?? "",
                    img: memoryData["img"],
                    rating: 5,
                    friendRatings: [],
                    date: newMemory?.date ?? new Date()
                }
                if(newMemory?.img != "") {
                    const path = await SendImgFromManualEntry(newFullMemory.id);
                    newFullMemory.img =  `http://192.168.4.26:5000/get_image_memory/${path}`;
                }
                setAllMemories([...allMemories, newFullMemory]);    
            }
            console.log(data["msg"])
        })  
        .catch(error => {
            console.log(error.message)
        })
    }

    async function SendImgFromManualEntry(memoryId: number) {
        const url = `${apiUrl}/add-img-to-memory`
        const base64 = await RNFS.readFile(newMemory?.img ?? "", 'base64');
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "memoryId": memoryId,
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


    function FetchAllMemories() {

    }

    async function FetchAllMemoriesLocally(){
        const allKeys = MemoryStorage.getAllKeys();
        const newMemories = await Promise.all(
            allKeys.map(async (key) => {
                const recipeStr = MemoryStorage.getString(key);
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
        setAllMemories(newMemories);
    }

    async function EditMemoryLocally() {
        if(newChangedMemory != undefined){
            if(newChangedMemory.img != ""){
                const imageData = await RNFS.readFile(newChangedMemory.img, 'base64');
                newChangedMemory.img = imageData;
            }
            const strMemoryId = String(newChangedMemory.id); 
            MemoryStorage.set(strMemoryId, JSON.stringify(newChangedMemory)); 
            UpdateAllMemories(newChangedMemory, strMemoryId); 
        }
    }

    useEffect(() => {
        if(newChangedMemory != undefined){
            if(loggedInStatus){
                EditMemoryLocally();
            }
        }
        setNewChangedMemory(undefined);
    }, [newChangedMemory])

    useEffect(() => {
        if(newMemory != undefined){
            if(loggedInStatus){
                SaveMemoryOnline();
            }
            else{
                SaveMemoryLocally(); 
            }
        }
        setNewMemory(undefined);
    }, [newMemory])

    useEffect(() => {
        if(!fetchedAllMemories) {
            if(loggedInStatus){
                FetchAllMemories(); 
            }
            else{
                FetchAllMemoriesLocally();
            }
            setFetchedAllMemories(true);
        }
    }, [loggedInStatus])

    return (
        <MemoryContext.Provider value={{ allMemories, setAllMemories, newMemory, setNewMemory, setNewChangedMemory}}>
            {children}
        </MemoryContext.Provider>
    )
};

export function useMemory() {
  return useContext(MemoryContext);
};

