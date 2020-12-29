import axios from 'axios';
import { key } from '../config';
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${key}`);
            this.title = res.data.title;
            this.author = res.data.sourceName;
            this.img = res.data.image;
            this.url = res.data.sourceUrl;
            this.ingredients = res.data.extendedIngredients;
            this.servings = res.data.servings;
        } catch (error) {
            console.log(error);
            alert('Something Went Wrong :(');
        }
    }

    calcTime() {
        //assuming that we need 15 min for each 3  ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    parseIngredients() {
        const newIngredients = this.ingredients.map(el => {
            let objIng;
            objIng = {
                count: el.amount,
                unit: el.unit,
                ingredient: el.name
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }
    updateServings(type) {
        //servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        //Ingredients
        this.ingredients.forEach(ing => {
            ing.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
}