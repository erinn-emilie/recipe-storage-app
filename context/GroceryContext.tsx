import { createMMKV } from 'react-native-mmkv';
import { createContext, useContext, useEffect, useState } from "react";


export const GroceryStorage = createMMKV({
    id: "local-grocery-storage"
});


export interface GroceryItem {
  name: string,
  unit: string,
  amount: number
};

interface GroceryCtx {
    allGroceryItems: GroceryItem[],
    setAllGroceryItems: (allItems: GroceryItem[]) => void
};


const GroceryContext = createContext<GroceryCtx>({
    allGroceryItems: [],
    setAllGroceryItems: () => {}
});


export function GroceryProvider({ children } : { children: React.ReactNode }){
    const [allGroceryItems, setAllGroceryItems] = useState<GroceryItem[]>([]);


    const FetchItems = () => {
        const allKeys = GroceryStorage.getAllKeys();
        const items = allKeys.map((key) => {
            const itemStr = GroceryStorage.getString(key);
            if(itemStr != null) {
                const item = JSON.parse(itemStr);
                return item as GroceryItem;
            }
            return {} as GroceryItem;  
        });
        items.filter(item => item != null);
        setAllGroceryItems(items);
    }

    useEffect(() => {
        FetchItems();
    }, [])

    return (
        <GroceryContext.Provider value={{ allGroceryItems, setAllGroceryItems }}>
            {children}
        </GroceryContext.Provider>
    )
};

export function useGrocery() {
  return useContext(GroceryContext);
};
