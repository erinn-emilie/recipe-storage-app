export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  rating: number;
  folder: string;
  tags: string[];
  ingredients: Ingredient[];
  steps: string[];
  notes: string;
  parsedFrom?: string;
  author?: string;
  createdAt: string;
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Moroccan Lamb Tagine",
    description: "Slow-braised lamb with preserved lemons, olives, and warming spices. A dish that fills the kitchen with deep, complex aromas.",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=500&fit=crop&auto=format",
    prepTime: 25,
    cookTime: 150,
    servings: 6,
    rating: 5,
    folder: "Slow Cooks",
    tags: ["lamb", "moroccan", "winter"],
    ingredients: [
      { name: "bone-in lamb shoulder", amount: "2", unit: "kg" },
      { name: "preserved lemon", amount: "2", unit: "whole" },
      { name: "green olives", amount: "200", unit: "g" },
      { name: "onions", amount: "2", unit: "large" },
      { name: "garlic cloves", amount: "6", unit: "" },
      { name: "fresh ginger", amount: "2", unit: "tbsp" },
      { name: "ground cumin", amount: "2", unit: "tsp" },
      { name: "ground coriander", amount: "2", unit: "tsp" },
      { name: "cinnamon stick", amount: "1", unit: "" },
      { name: "saffron threads", amount: "1", unit: "pinch" },
      { name: "chicken stock", amount: "400", unit: "ml" },
      { name: "fresh cilantro", amount: "1", unit: "bunch" },
    ],
    steps: [
      "Season lamb generously with salt, pepper, cumin, and coriander. Let rest 30 minutes at room temp.",
      "Heat a heavy tagine or Dutch oven over medium-high. Sear lamb in batches until deeply browned on all sides, about 12 minutes per batch. Set aside.",
      "Reduce heat to medium. Sauté onions until soft and golden, 10 minutes. Add garlic and ginger, cook 2 minutes more.",
      "Bloom saffron in 2 tbsp warm water for 5 minutes. Add to pot along with cinnamon stick and remaining spices.",
      "Return lamb to pot. Add stock, preserved lemon quarters, and olives. Liquid should reach halfway up the lamb.",
      "Cover tightly and braise on lowest heat for 2–2.5 hours until lamb is falling off the bone.",
      "Taste and adjust seasoning. Serve scattered with fresh cilantro and crusty bread.",
    ],
    notes: "Use bone-in shoulder for the richest sauce. The fat from the bone makes the sauce incredibly silky. Great made the day before — the flavors deepen overnight.",
    createdAt: "2024-11-03",
  },
  {
    id: "2",
    title: "Smashed Cucumber Salad",
    description: "Crisp, cool, and deeply savory. A Chinese-inspired preparation where smashing the cucumbers creates jagged surfaces that drink up the dressing.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop&auto=format",
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    rating: 4,
    folder: "Quick",
    tags: ["salad", "vegan", "summer"],
    ingredients: [
      { name: "English cucumbers", amount: "3", unit: "medium" },
      { name: "kosher salt", amount: "1.5", unit: "tsp" },
      { name: "rice vinegar", amount: "3", unit: "tbsp" },
      { name: "soy sauce", amount: "2", unit: "tbsp" },
      { name: "sesame oil", amount: "1", unit: "tbsp" },
      { name: "chili crisp", amount: "2", unit: "tbsp" },
      { name: "garlic cloves", amount: "3", unit: "" },
      { name: "scallions", amount: "3", unit: "" },
      { name: "toasted sesame seeds", amount: "2", unit: "tbsp" },
    ],
    steps: [
      "Cut cucumbers in half lengthwise, then into thirds. Place cut-side down and smash firmly with the flat of a knife or a rolling pin until they crack and split.",
      "Tear into rough 2-inch pieces. Toss with salt and let drain in a colander for 15 minutes.",
      "While cucumbers drain, whisk vinegar, soy sauce, sesame oil, and chili crisp. Grate garlic directly in.",
      "Pat cucumbers dry. Toss with dressing and let sit 5 minutes.",
      "Top with sliced scallions and sesame seeds. Serve immediately.",
    ],
    notes: "The salt-and-drain step is non-negotiable — it removes excess water and improves texture dramatically. Add chili crisp to taste; the Lao Gan Ma brand is exceptional here.",
    createdAt: "2024-10-18",
  },
  {
    id: "3",
    title: "Brown Butter Chocolate Chip Cookies",
    description: "Nutty, toffee-scented dough with bittersweet chocolate and flaky sea salt. Rest the dough 24 hours for depth that a quick bake never achieves.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=500&fit=crop&auto=format",
    prepTime: 20,
    cookTime: 12,
    servings: 24,
    rating: 5,
    folder: "Baking",
    tags: ["cookies", "dessert", "baking"],
    ingredients: [
      { name: "unsalted butter", amount: "225", unit: "g" },
      { name: "dark brown sugar", amount: "200", unit: "g" },
      { name: "granulated sugar", amount: "100", unit: "g" },
      { name: "eggs", amount: "2", unit: "large" },
      { name: "egg yolk", amount: "1", unit: "" },
      { name: "vanilla extract", amount: "2", unit: "tsp" },
      { name: "all-purpose flour", amount: "280", unit: "g" },
      { name: "baking soda", amount: "1", unit: "tsp" },
      { name: "fine salt", amount: "1", unit: "tsp" },
      { name: "bittersweet chocolate", amount: "340", unit: "g" },
      { name: "flaky sea salt", amount: "1", unit: "tsp" },
    ],
    steps: [
      "Brown the butter: melt in a light-colored pan over medium heat, stirring, until it smells nutty and solids turn golden, 6–8 minutes. Pour into a large bowl and cool 10 minutes.",
      "Whisk both sugars into brown butter. Add eggs, yolk, and vanilla. Whisk vigorously for 2 minutes until mixture is ribbony and slightly lightened.",
      "Fold in flour, baking soda, and salt until just combined. Chop chocolate into rough shards and fold in.",
      "Cover bowl and refrigerate at least 24 hours (up to 72 for deeper flavor).",
      "Preheat oven to 190°C / 375°F. Scoop 60g balls onto parchment-lined sheets, 4 per sheet. Bake 10–12 minutes until edges are set but centers look underdone.",
      "Immediately press a few extra chocolate pieces onto hot cookies. Sprinkle with flaky salt. Cool on pan 5 minutes before transferring.",
    ],
    notes: "Do not skip the rest. 24h is good; 48h is better. The flavor deepens noticeably. If baking from frozen, add 2-3 minutes.",
    parsedFrom: "https://www.seriouseats.com/the-food-labs-perfect-chocolate-chip-cookies",
    createdAt: "2024-09-22",
  },
  {
    id: "4",
    title: "Miso Butter Roasted Carrots",
    description: "Lacquered, sweet, and umami-rich. These are a centerpiece vegetable dish, not a side.",
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=800&h=500&fit=crop&auto=format",
    prepTime: 10,
    cookTime: 35,
    servings: 4,
    rating: 4,
    folder: "Vegetables",
    tags: ["vegan", "vegetables", "roasted"],
    ingredients: [
      { name: "large carrots", amount: "700", unit: "g" },
      { name: "white miso paste", amount: "3", unit: "tbsp" },
      { name: "unsalted butter", amount: "30", unit: "g" },
      { name: "honey", amount: "1", unit: "tbsp" },
      { name: "rice vinegar", amount: "1", unit: "tbsp" },
      { name: "sesame seeds", amount: "1", unit: "tbsp" },
      { name: "scallions", amount: "2", unit: "" },
    ],
    steps: [
      "Preheat oven to 220°C / 425°F. Peel carrots and halve lengthwise.",
      "Melt butter and whisk in miso, honey, and vinegar until smooth.",
      "Toss carrots in miso butter. Spread on a sheet pan, cut-side down. Roast 20 minutes.",
      "Flip, brush with remaining glaze, roast another 12–15 minutes until caramelized and tender.",
      "Top with sesame seeds and sliced scallions. Serve hot or at room temperature.",
    ],
    notes: "Works with parsnips and beets too. The glaze also doubles as a marinade for salmon.",
    createdAt: "2024-08-14",
  },
];

export const folders = ["All", "Slow Cooks", "Quick", "Baking", "Vegetables", "Pasta", "Soups"];
