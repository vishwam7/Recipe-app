// Global app controller
import Search from './models/search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
/** Global state of the app
 * -Search object
 * -Current recipe object
 * -Shopping list object
 * -liked object
 */
const state = {};

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

        //4.Search for recipes
        await state.search.getResult();

        //5. render results on UI
        clearLoader();
        searchView.renderResult(state.search.result);
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