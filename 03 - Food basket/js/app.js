var loaderIcon = document.getElementById("toggle"),
    inputContent = document.getElementById("checkBasketContent");

attachEventListeners();

function getText(text) {
    var resultArea = document.getElementById("seeBasketContent");
    resultArea.innerText = text;
}

function randomNumberFrom1To10() {
     return Math.round((Math.random() * 9) + 1);
}

function correctWordFormBanana(number) {
     if (number === 1) return "a";
     if (number > 1 && number < 5) return "y";
     return "ów";
}
function correctWordFormApple(number) {
    if (number === 1) return "o";
    if (number > 1 && number < 5) return "a";
    return "ek";
}
function correctWordFormMandarin(number) {
    if (number === 1) return "kę";
    if (number > 1 && number < 5) return "ki";
    return "ek";
}
function correctWordFormMelon(number) {
    if (number === 1) return "a";
    if (number > 1 && number < 5) return "y";
    return "ów";
}
function correctWordFormOld(number) {
    if (number === 1) return "ego";
    if (number > 1 && number < 5) return "e";
    return "ych";
}
function chooseCorrectWord(word, number) {
    if (word === "Banan") return correctWordFormBanana(number);
    if (word === "Jabłko") return correctWordFormApple(number);
    if (word === "Mandarynkę") return correctWordFormMandarin(number);
    if (word === "Melona") return correctWordFormMelon(number);
}

function doIHaveVegetableInTheBasket() {
    var vegetables = inputContent.value,
        text;
    switch(vegetables) {
        case "Ziemniaka":
        case "Marchewkę":
        case "Kartofle":
        case "Szpinak":
        case "Buraka":
        case "Kalafiora":
        case "Kapustę":
        case "Cukinię":
        case "Ogórka":
        case "Grzyby shiitake":
            text = "Podałeś, że masz w koszyku " + vegetables + " a możesz mieć tylko owoce!";
        break;
        default:
            text = vegetables + "?! Nie wiem o czym mówisz...";
    }
    return text;
}

function doIHaveFruitInTheBasket(number) {
    var fruits = inputContent.value,
        text;
    if (!fruits) {
        return getText("Wpisz coś!");
    }
    switch (fruits) {
        case "Banan":
            text = "Tak, masz w koszyku " + number + " Banan" + chooseCorrectWord(fruits, number);
            break;
        case "Jabłko":
            text = "Tak, masz w koszyku " + number + " Jabłk" + chooseCorrectWord(fruits, number);
            break;
        case "Mandarynkę":
            text = "Tak, masz w koszyku " + number + " Mandaryn" + chooseCorrectWord(fruits, number);
            break;
        case "Melona":
            text = "Tak, masz w koszyku " + number +  " Melon" + chooseCorrectWord(fruits, number) + ", ale star" + correctWordFormOld(number);
            break;
        default:
            text = doIHaveVegetableInTheBasket();
    }
    getText(text);
}

function fakeLoader(trigger) {
    if (trigger === "start") {
        loaderIcon.classList.add("loader");
    }
    if (trigger === "end") {
        loaderIcon.classList.remove("loader");
    }
}

function attachEventListeners() {
    var basketButton = document.getElementById("checkBasketButton");

    basketButton.addEventListener("click", function() {
        fakeLoader("start");
    });
    basketButton.addEventListener("animationend", function () {
        fakeLoader("end");
        doIHaveFruitInTheBasket(randomNumberFrom1To10());
    });
}