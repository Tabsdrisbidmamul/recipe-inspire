import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAQEy21m-QIo8cD5HSEDxxvydIXP2ajGhs',
  authDomain: 'adv-dev-dotnet.firebaseapp.com',
  projectId: 'adv-dev-dotnet',
  storageBucket: 'adv-dev-dotnet.appspot.com',
  messagingSenderId: '141270716082',
  appId: '1:141270716082:web:21a2e028abec9f33bf03ab',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export async function writeToFirestore(collection: string, document: string, payload: {} | {}[]) {
  try {
    await setDoc(doc(db, collection, document), payload);
  } catch (e) {
    console.log('ERROR: writeToFirestore() could not write to firestore');
  }
}

export async function readFirestore(collection: string, document: string) {
  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
}

export async function createUser(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    console.error('ERROR: createUser() could not create user ', e.message);
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (e: any) {
    console.error('ERROR: signinUser() could not sign in user ', e.message);
  }
}

export const obj = {
  vegetarian: false,
  vegan: false,
  glutenFree: true,
  dairyFree: false,
  veryHealthy: false,
  cheap: false,
  veryPopular: false,
  sustainable: false,
  lowFodmap: false,
  weightWatcherSmartPoints: 8,
  gaps: 'no',
  preparationMinutes: -1,
  cookingMinutes: -1,
  aggregateLikes: 1,
  healthScore: 21,
  creditsText: 'Foodista.com – The Cooking Encyclopedia Everyone Can Edit',
  license: 'CC BY 3.0',
  sourceName: 'Foodista',
  pricePerServing: 131.68,
  extendedIngredients: [
    {
      id: 1041009,
      aisle: 'Cheese',
      image: 'cheddar-cheese.png',
      consistency: 'SOLID',
      name: 'cheese',
      nameClean: 'cheese',
      original: 'Cheese--about (4 oz)',
      originalName: 'Cheese--about',
      amount: 4.0,
      unit: 'oz',
      meta: [],
      measures: {
        us: {
          amount: 4.0,
          unitShort: 'oz',
          unitLong: 'ounces',
        },
        metric: {
          amount: 113.398,
          unitShort: 'g',
          unitLong: 'grams',
        },
      },
    },
    {
      id: 11209,
      aisle: 'Produce',
      image: 'eggplant.png',
      consistency: 'SOLID',
      name: 'eggplants',
      nameClean: 'eggplant',
      original: '2-3 small to medium eggplants',
      originalName: 'to medium eggplants',
      amount: 2.0,
      unit: '',
      meta: ['small to medium'],
      measures: {
        us: {
          amount: 2.0,
          unitShort: '',
          unitLong: '',
        },
        metric: {
          amount: 2.0,
          unitShort: '',
          unitLong: '',
        },
      },
    },
    {
      id: 2044,
      aisle: 'Produce',
      image: 'fresh-basil.jpg',
      consistency: 'SOLID',
      name: 'fresh basil',
      nameClean: 'fresh basil',
      original: 'Fresh basil (about 1/2 cup)',
      originalName: 'Fresh basil (about',
      amount: 0.5,
      unit: 'cup',
      meta: ['fresh'],
      measures: {
        us: {
          amount: 0.5,
          unitShort: 'cups',
          unitLong: 'cups',
        },
        metric: {
          amount: 118.294,
          unitShort: 'ml',
          unitLong: 'milliliters',
        },
      },
    },
    {
      id: 1036,
      aisle: 'Cheese',
      image: 'ricotta.png',
      consistency: 'SOLID',
      name: 'ricotta',
      nameClean: 'ricotta cheese',
      original: '1 15 ounce container of ricotta (I used part skim)',
      originalName: 'ricotta (I used part skim)',
      amount: 15.0,
      unit: 'ounce',
      meta: ['(I used part skim)'],
      measures: {
        us: {
          amount: 15.0,
          unitShort: 'oz',
          unitLong: 'ounces',
        },
        metric: {
          amount: 425.243,
          unitShort: 'g',
          unitLong: 'grams',
        },
      },
    },
    {
      id: 2047,
      aisle: 'Spices and Seasonings',
      image: 'salt.jpg',
      consistency: 'SOLID',
      name: 'salt',
      nameClean: 'table salt',
      original: '1/2 teaspoon salt',
      originalName: 'salt',
      amount: 0.5,
      unit: 'teaspoon',
      meta: [],
      measures: {
        us: {
          amount: 0.5,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
        metric: {
          amount: 0.5,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
      },
    },
    {
      id: 10011457,
      aisle: 'Produce',
      image: 'spinach.jpg',
      consistency: 'SOLID',
      name: 'spinach',
      nameClean: 'spinach',
      original: '2 cups of fresh spinach (I used baby spinach)',
      originalName: 'fresh spinach (I used baby spinach)',
      amount: 2.0,
      unit: 'cups',
      meta: ['fresh', '(I used baby spinach)'],
      measures: {
        us: {
          amount: 2.0,
          unitShort: 'cups',
          unitLong: 'cups',
        },
        metric: {
          amount: 473.176,
          unitShort: 'ml',
          unitLong: 'milliliters',
        },
      },
    },
    {
      id: 11887,
      aisle: 'Pasta and Rice',
      image: 'tomato-paste.jpg',
      consistency: 'SOLID',
      name: 'tomato paste',
      nameClean: 'tomato paste',
      original: '6 ounces Can tomato paste',
      originalName: 'tomato paste',
      amount: 6.0,
      unit: 'ounces',
      meta: [],
      measures: {
        us: {
          amount: 6.0,
          unitShort: 'oz',
          unitLong: 'ounces',
        },
        metric: {
          amount: 170.097,
          unitShort: 'g',
          unitLong: 'grams',
        },
      },
    },
  ],
  id: 653238,
  title: 'Noodle Free Eggplant and Spinach Lasagna',
  readyInMinutes: 45,
  servings: 6,
  sourceUrl: 'http://www.foodista.com/recipe/6BJ767ZG/noodle-free-eggplant-and-spinach-lasagna',
  image: 'https://spoonacular.com/recipeImages/653238-556x370.jpg',
  imageType: 'jpg',
  summary:
    'The recipe Noodle Free Eggplant and Spinach Lasagna could satisfy your Mediterranean craving in roughly <b>45 minutes</b>. One serving contains <b>264 calories</b>, <b>16g of protein</b>, and <b>16g of fat</b>. This recipe serves 6 and costs $1.32 per serving. This recipe is liked by 1 foodies and cooks. Head to the store and pick up spinach, eggplants, basil, and a few other things to make it today. It works well as an affordable main course. It is a good option if you\'re following a <b>gluten free and primal</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 67%</b>. This score is good. Try <a href="https://spoonacular.com/recipes/no-noodle-eggplant-lasagna-618304">NO NOODLE EGGPLANT LASAGNA</a>, <a href="https://spoonacular.com/recipes/noodle-less-eggplant-lasagna-170932">Noodle-less Eggplant Lasagna</a>, and <a href="https://spoonacular.com/recipes/spinach-zucchini-noodle-lasagna-563983">Spinach Zucchini Noodle Lasagna</a> for similar recipes.',
  cuisines: ['Mediterranean', 'Italian', 'European'],
  dishTypes: ['lunch', 'main course', 'main dish', 'dinner'],
  diets: ['gluten free', 'primal'],
  occasions: [],
  winePairing: {},
  instructions:
    '<ol><li>Wash and dry eggplant. Slice eggplant the long way. Sprinkle with salt and leave for a while. The longer the better 20 to 30 minutes is great. Do not rinse.</li><li>Preheat oven to 425. Roast eggplant for about 10 minutes per side.</li><li>Mix ricotta with chopped basil and oregano. Reserve about 1/3 for garnish.</li><li>Spread about 1/3 of the tomato paste in a square dish. Top with eggplant and 1/2 the ricotta mixture. Top with spinach.  Add more ricotta. Add another layer of eggplant. Top with remaining tomato paste. Bake at 375 uncovered about 15 minutes.</li><li>Cover with foil. Cook another 15 minutes.</li><li>Top with shredded cheese. Cook about 3-5 minutes till cheese melts. Garnish with remaining basil and cook a few more minutes.</li></ol>',
  analyzedInstructions: [
    {
      name: '',
      steps: [
        {
          number: 1,
          step: 'Wash and dry eggplant. Slice eggplant the long way.',
          ingredients: [
            {
              id: 11209,
              name: 'eggplant',
              localizedName: 'eggplant',
              image: 'eggplant.png',
            },
          ],
          equipment: [],
        },
        {
          number: 2,
          step: 'Sprinkle with salt and leave for a while. The longer the better 20 to 30 minutes is great. Do not rinse.Preheat oven to 42',
          ingredients: [
            {
              id: 2047,
              name: 'salt',
              localizedName: 'salt',
              image: 'salt.jpg',
            },
          ],
          equipment: [
            {
              id: 404784,
              name: 'oven',
              localizedName: 'oven',
              image: 'oven.jpg',
            },
          ],
          length: {
            number: 20,
            unit: 'minutes',
          },
        },
        {
          number: 3,
          step: 'Roast eggplant for about 10 minutes per side.',
          ingredients: [
            {
              id: 11209,
              name: 'eggplant',
              localizedName: 'eggplant',
              image: 'eggplant.png',
            },
          ],
          equipment: [],
          length: {
            number: 10,
            unit: 'minutes',
          },
        },
        {
          number: 4,
          step: 'Mix ricotta with chopped basil and oregano. Reserve about 1/3 for garnish.',
          ingredients: [
            {
              id: 2027,
              name: 'oregano',
              localizedName: 'oregano',
              image: 'oregano.jpg',
            },
            {
              id: 1036,
              name: 'ricotta cheese',
              localizedName: 'ricotta cheese',
              image: 'ricotta.png',
            },
            {
              id: 2044,
              name: 'basil',
              localizedName: 'basil',
              image: 'basil.jpg',
            },
          ],
          equipment: [],
        },
        {
          number: 5,
          step: 'Spread about 1/3 of the tomato paste in a square dish. Top with eggplant and 1/2 the ricotta mixture. Top with spinach.',
          ingredients: [
            {
              id: 11887,
              name: 'tomato paste',
              localizedName: 'tomato paste',
              image: 'tomato-paste.jpg',
            },
            {
              id: 11209,
              name: 'eggplant',
              localizedName: 'eggplant',
              image: 'eggplant.png',
            },
            {
              id: 1036,
              name: 'ricotta cheese',
              localizedName: 'ricotta cheese',
              image: 'ricotta.png',
            },
            {
              id: 10011457,
              name: 'spinach',
              localizedName: 'spinach',
              image: 'spinach.jpg',
            },
            {
              id: 0,
              name: 'spread',
              localizedName: 'spread',
              image: '',
            },
          ],
          equipment: [],
        },
        {
          number: 6,
          step: 'Add more ricotta.',
          ingredients: [
            {
              id: 1036,
              name: 'ricotta cheese',
              localizedName: 'ricotta cheese',
              image: 'ricotta.png',
            },
          ],
          equipment: [],
        },
        {
          number: 7,
          step: 'Add another layer of eggplant. Top with remaining tomato paste.',
          ingredients: [
            {
              id: 11887,
              name: 'tomato paste',
              localizedName: 'tomato paste',
              image: 'tomato-paste.jpg',
            },
            {
              id: 11209,
              name: 'eggplant',
              localizedName: 'eggplant',
              image: 'eggplant.png',
            },
          ],
          equipment: [],
        },
        {
          number: 8,
          step: 'Bake at 375 uncovered about 15 minutes.Cover with foil. Cook another 15 minutes.Top with shredded cheese. Cook about 3-5 minutes till cheese melts.',
          ingredients: [
            {
              id: 1011026,
              name: 'shredded cheese',
              localizedName: 'shredded cheese',
              image: 'cheddar-cheese.png',
            },
            {
              id: 1041009,
              name: 'cheese',
              localizedName: 'cheese',
              image: 'cheddar-cheese.png',
            },
          ],
          equipment: [
            {
              id: 404784,
              name: 'oven',
              localizedName: 'oven',
              image: 'oven.jpg',
            },
            {
              id: 404765,
              name: 'aluminum foil',
              localizedName: 'aluminum foil',
              image: 'aluminum-foil.png',
            },
          ],
          length: {
            number: 35,
            unit: 'minutes',
          },
        },
        {
          number: 9,
          step: 'Garnish with remaining basil and cook a few more minutes.',
          ingredients: [
            {
              id: 2044,
              name: 'basil',
              localizedName: 'basil',
              image: 'basil.jpg',
            },
          ],
          equipment: [],
        },
      ],
    },
  ],
  originalId: null,
  spoonacularSourceUrl: 'https://spoonacular.com/noodle-free-eggplant-and-spinach-lasagna-653238',
};
