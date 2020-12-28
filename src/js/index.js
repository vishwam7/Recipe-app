// Global app controller
import Search from './models/search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';
/** Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -liked object
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async() => {
    //1.get query from view
    const query = searchView.getInput();

    if (query) {
        //2.New search object and add to state
        state.search = new Search(query);

        //3.prepare UI for results
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);

        try {
            //4.Search for recipes
            await state.search.getResult();

            //5. render results on UI
            clearLoader();
            searchView.renderResult(state.search.result);
        } catch (err) {
            alert('Something wrong with the search ...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});
//3eb4ec9f1c004d868452a7d1cef9cc05
//https://api.spoonacular.com/recipes/complexSearch

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResult(state.search.result, goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async() => {
    // Get ID from URL
    const id = window.location.hash.replace('#', '');
    console.log(id);
    if (id) {
        //prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        //create new Recipe object
        state.recipe = new Recipe(id);

        //highlight selected search item
        if (state.search) searchView.highLightSelected(id);

        try {
            //get Recipe Data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            console.log(state.recipe.ingredients);

            //calculate time and servings
            state.recipe.calcTime();

            //render Recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (err) {
            alert('Error processing recipe!');
        }
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


//handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        //decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        //increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);
});