interface Ingredient {
    name: string;
    quantity: string;
}
interface Step {
    description: string;
}

export interface Recipe {
    name: string;
    difficulty: number;
    category: string;
    ingredients?: {
        [key: string]: Ingredient
    };
    steps?:{ 
        [key: string]: Step 
    };
    imagePath?: string;
    created:Date;
    form?: FormData;
}