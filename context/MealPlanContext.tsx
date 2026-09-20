import { createMMKV } from 'react-native-mmkv';
import { createContext, useContext, useState, useEffect } from "react";
import { Recipe } from "./RecipeContext";


export const MealPlanStorage = createMMKV({
    id: "local-meal-plan-storage"
});


export const DAYS = ["Sunday", "Monday", "Tuesday", "Desert", "Thursday", "Friday", "Saturday"];
export const MEALS = ["Breakfast", "Lunch", "Dinner", "Desert"];



interface MealPlanCtx {
    mealPlan: Record<string, Record<string, Recipe>>,
    setMealPlan: (allItems: Record<string, Record<string, Recipe>>) => void,
    AddToMealPlan: (dayToAdd: string, mealToAdd: string, recipeToAdd: Recipe) => void
};


const MealPlanContext = createContext<MealPlanCtx>({
    mealPlan: {},
    setMealPlan: () => {},
    AddToMealPlan: () => {}
});

export function MealPlanProvider({ children }: { children: React.ReactNode }) {
    const [mealPlan, setMealPlan] = useState<Record<string, Record<string, Recipe>>>({});

    const AddToMealPlan = (day: string, meal: string, recipe: Recipe | undefined) => {
        const newMealPlan = JSON.parse(JSON.stringify(mealPlan));
        newMealPlan[day][meal] = recipe; 
        setMealPlan(newMealPlan);

        const key = `${day}-${meal}`;
        const updatedPlanItem = { day, meal, recipe };
        MealPlanStorage.set(key, JSON.stringify(updatedPlanItem)); 
    };

    const BuildMealPlan = () => {
        const mealsDict: Record<string, Recipe> = {};
        MEALS.map((meal) => {
            mealsDict[meal] = {} as Recipe;
        });
        
        const mealPlan: Record<string, Record<string, Recipe>> = {};
        DAYS.map((day) => {
            mealPlan[day] = { ...mealsDict };
        });
        
        return mealPlan;
    };

    const PopulateMealPlan = () => {
        const mealPlan = BuildMealPlan();
        const allKeys = MealPlanStorage.getAllKeys();

        allKeys.forEach((key) => {
            const planItemStr = MealPlanStorage.getString(key);
            if (planItemStr != undefined) {
                const planItem = JSON.parse(planItemStr);
                const { day, meal, recipe } = planItem;
                if (mealPlan[day] && meal) {
                    mealPlan[day][meal] = recipe;
                }
            }
        });
        
        setMealPlan(mealPlan);
    };

    useEffect(() => {
        PopulateMealPlan();
    }, []);

    return (
        <MealPlanContext.Provider value={{ mealPlan, setMealPlan, AddToMealPlan }}>
            {children}
        </MealPlanContext.Provider>
    );
}

export function useMealPlan() {
  return useContext(MealPlanContext);
};
