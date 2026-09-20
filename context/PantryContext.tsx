import { createMMKV } from 'react-native-mmkv';
import { createContext, useContext, useEffect, useState } from "react";


export const PantryStorage = createMMKV({
    id: "local-pantry-storage"
});


export interface PantryItem {
  id: number,
  name: string,
  unit: string,
  amount: number,
  category: string,
  lowThreshold: number
};

export interface PosPantryItem {
    name: string,
    unit: string,
    amount: string,
    category: string
}

interface PantryCtx {
    allItems: PantryItem[],
    setAllItems: (allItems: PantryItem[]) => void,
    newItem: PosPantryItem | undefined,
    setNewItem: (newItem: PosPantryItem | undefined) => void,
    removeItem: (itemId: number) => void
};


const PantryContext = createContext<PantryCtx>({
    allItems: [],
    setAllItems: () => {},
    newItem: undefined,
    setNewItem: () => {},
    removeItem: () => {}
});

export const PantryCategories = [
    "All",
    "Dry Goods",
    "Meat",
    "Dairy",
    "Vegetables",
    "Fruits",
    "Spices",
    "Condiments & Oils"
]

export function PantryProvider({ children } : { children: React.ReactNode }){
    const [allItems, setAllItems] = useState<PantryItem[]>([]);
    const [newItem, setNewItem] = useState<PosPantryItem>();

    const removeItem = (itemId: number) => {
        const idStr = String(itemId);
        if(PantryStorage.contains(idStr)){
            PantryStorage.remove(idStr);
        }
        const newAllItems = allItems.map((item) => {
            if(item.id != itemId){
                return item;
            }
            return {} as PantryItem;
        })
        newAllItems.filter(item => item != null);
        setAllItems(newAllItems);
    }

    const FetchItems = () => {
        const allKeys = PantryStorage.getAllKeys();
        const items = allKeys.map((key) => {
            const itemStr = PantryStorage.getString(key);
            if(itemStr != null) {
                const item = JSON.parse(itemStr);
                return item as PantryItem;
            }
            return {} as PantryItem;  
        });
        items.filter(item => item != null);
        setAllItems(items);
    }

    const AddNewItem = () => {
        const newName = newItem?.name;
        if(newName != null){
            if(PantryStorage.contains(newName)){
                const oldItemStr = PantryStorage.getString(newName);
                if(oldItemStr != null){
                    const oldItem = JSON.parse(oldItemStr);
                    oldItem.amount += newItem?.amount;
                    PantryStorage.set(newName, JSON.stringify(oldItem));
                }
            }
            else {
                const newId = PantryStorage.length;
                const newAmount = Number(newItem?.amount)
                const newLowThreshhold = 0.10 * newAmount; 
                const item: PantryItem = {
                    id: newId,
                    name: newName,
                    unit: newItem?.unit ?? "",
                    amount: newAmount,
                    category: newItem?.category ?? "",
                    lowThreshold: newLowThreshhold
                }
                PantryStorage.set(newName, JSON.stringify(item));
                setAllItems([...allItems, item])
            }
        }
        setNewItem(undefined);
    }

    useEffect(() => {
        FetchItems();
    }, [])

    useEffect(() => {
        if(newItem != undefined){
            AddNewItem();
        }
    }, [newItem])

    return (
        <PantryContext.Provider value={{ allItems, setAllItems, newItem, setNewItem, removeItem }}>
            {children}
        </PantryContext.Provider>
    )
};

export function usePantry() {
  return useContext(PantryContext);
};
