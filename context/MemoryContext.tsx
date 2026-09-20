import { createMMKV } from 'react-native-mmkv';
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "./AccountContext";


export const MemoryStorage = createMMKV({
    id: "local-memory-storage"
});

const apiUrl = "http://192.168.4.119:5000";


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
};


const MemoryContext = createContext<MemoryCtx>({
    allMemories: [],
    setAllMemories: () => {},
    newMemory: undefined,
    setNewMemory: () => {}
});


export function MemoryProvider({ children } : { children: React.ReactNode }){
    const [allMemories, setAllMemories] = useState<Memory[]>([]);
    const [newMemory, setNewMemory] = useState<PosMemory | undefined>(); 

    const { loggedInStatus, username } = useAccount();

    const SaveMemoryLocally = () => {
        var oldestId = allMemories[allMemories.length-1].id;
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
        MemoryStorage.set(`${oldestId+1}`, memoryStr);
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
                };
            }
        })  
        .catch(error => {
            console.log(error.message)
        })
    }

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

    return (
        <MemoryContext.Provider value={{ allMemories, setAllMemories, newMemory, setNewMemory}}>
            {children}
        </MemoryContext.Provider>
    )
};

export function useMemory() {
  return useContext(MemoryContext);
};

