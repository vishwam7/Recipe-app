import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }
    async getResult() {
        const key = '3eb4ec9f1c004d868452a7d1cef9cc05';
        try {
            const res = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${key}&query=${this.query}&number=30`);
            this.result = res.data.results;
            console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}