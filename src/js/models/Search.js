import axios from 'axios';
import { key } from '../config';
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResult() {
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${this.query}&number=30`);
            this.result = res.data.results;
        } catch (error) {
            alert(error);
        }
    }
}