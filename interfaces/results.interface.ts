export interface Us {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Metric {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Measures {
  us: Us;
  metric: Metric;
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: Measures;
}

export interface Ingredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface Temperature {
  number: number;
  unit: string;
}

export interface Equipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
  temperature: Temperature;
}

export interface Length {
  number: number;
  unit: string;
}

export interface Step {
  number: number;
  step: string;
  ingredients: Ingredient[];
  equipment: Equipment[];
  length: Length;
}

export interface AnalyzedInstruction {
  name: string;
  steps: Step[];
}

export interface MissedIngredient {
  id: number;
  amount: number;
  unit: string;
  unitLong: string;
  unitShort: string;
  aisle: string;
  name: string;
  original: string;
  originalName: string;
  meta: string[];
  image: string;
  extendedName: string;
}

export interface Result {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  analyzedInstructions: AnalyzedInstruction[];
  spoonacularSourceUrl: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  missedIngredients: MissedIngredient[];
  likes: number;
  usedIngredients: any[];
  unusedIngredients: any[];
}

export interface RandomRecipes {
  recipes: Result[];
}

export interface RecommendResult {
  id: number;
  imageType: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  source: string;
  image: string;
}

export interface SearchResults {
  results: Result[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface Image {
  content: string;
}

export interface Feature {
  maxResults: number;
  type: string;
  model?: string;
}

export interface Request {
  image: Image;
  features: Feature[];
}

export interface VisionRequest {
  requests: Request[];
}
