function attachMenuListeners() {
    var addHeroButton = document.getElementById("addHero-button"),
        loadMockHeroesButton = document.getElementById("loadMockHeroes-button"),
        clearHeroesListButton = document.getElementById("clearHeroesList-button"),
        removeHeroButton = document.getElementById("removeHero-button"),
        editHeroButton = document.getElementById("editHero-button");

    addHeroButton.addEventListener("click", showHeroCreateView);
    loadMockHeroesButton.addEventListener("click", loadMockHeroes);
    clearHeroesListButton.addEventListener("click", clearHeroesList);
    removeHeroButton.addEventListener("click", showHeroRemoveView);
    editHeroButton.addEventListener("click", showHeroEditView);
}