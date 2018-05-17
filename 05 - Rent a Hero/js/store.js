var heroesList = [];

function prepareCreateHeroData(heroForm) {
    var textarea = document.querySelector("#heroCreate-form textarea");
    return {
        name: heroForm.name.value,
        price: heroForm.price.value,
        img: heroForm.photo.value,
        desc: heroForm.textarea.value
    };
}

function prepareEditHeroData(heroForm) {
    var textarea = document.querySelector("#heroEdit-form textarea");
    return {
        name: heroForm.hero.value,
        price: heroForm.price.value,
        img: heroForm.photo.value,
        desc: heroForm.textarea.value
    }
}

function addHero(hero) {
    heroesList.push(hero);

    saveToLocalStorage();
}

function editHero(heroName, heroPrice, heroPicture, heroDescription) {

    heroesList.forEach(function(hero) {
        if (heroName === hero.name) {
            if (!heroPrice) {
                return hero.price;
            }
            if (heroPrice !== hero.price) {
                hero.price = heroPrice;
            }
            if (!heroPicture) {
                return hero.img;
            }
            if (heroPicture !== hero.img) {
                hero.img = heroPicture;
            }
            if (!heroDescription) {
                return hero.img;
            }
            if (heroDescription !== hero.desc) {
                hero.desc = heroDescription;
            }
        }
    });

    saveToLocalStorage();
    clearRegions();
    showHeroListView();
}

function removeHero(heroName) {
    var newHeroesList = [];

    heroesList.forEach(function(hero) {
        if (heroName !== hero.name) {
            newHeroesList.push(hero);
        }
    });

    heroesList = newHeroesList;

    saveToLocalStorage();
    clearRegions();
    showHeroListView();
}

function loadMockHeroes(event) {
    var mockHeroesList = [
        {
            name: "Batman",
            price: 5000,
            img: 'batman.jpg',
            desc: "He's Batman, what more do you need to know?"
        },
        {
            name: "Joker",
            price: 5100,
            img: 'joker.jpg',
            desc: 'Supervillain who wants to spread the Chaos'
        },
        {
            name: "Punisher",
            price: 4900,
            img: 'punisher.jpg',
            desc: 'He employs murder, kidnapping, extortion, coercion, threats of violence, and torture in his campaign against crime.'
        },
        {
            name: "Superman",
            price: 5200,
            img: 'superman.jpg',
            desc: "In the original Siegel and Shuster stories, Superman's personality is rough and aggressive."
        },
        {
            name: "Thor",
            price: 5300,
            img: 'thor.jpg',
            desc: 'Thor is a hammer-wielding god associated with thunder, lightning, storms, oak trees, strength and the protection of mankind..'
        },
        {
            name: "Robo Cop",
            price: 4800,
            img: 'robocop.jpg',
            desc: "Alex Murphy who is murdered by a gang of criminals and subsequently revived by the megacorporation Omni Consumer Products (OCP) as a superhuman cyborg law enforcer known as RoboCop."
        },
        {
            name: "Lobo",
            price: 5400,
            img: 'lobo.jpg',
            desc: "Lobo is an alien born on the utopian planet of Czarnia, and works as an interstellar mercenary and bounty hunter."
        },
        {
            name: "Spiderman",
            price: 4700,
            img: 'spiderman.jpg',
            desc: "Peter Parker had been bitten by a radioactive spider and that gave him spider-related power and abilities, such as the ability to cling to most surfaces, shoot spider-webs using wrist-mounted devices of his own invention, which he calls web-shooters, and react to danger quickly with his spider-sense."
        },
        {
            name: "Captain America",
            price: 4600,
            img: 'captain_america.jpg',
            desc: "Captain America is the alter ego of Steve Rogers, a frail young man enhanced to the peak of human perfection by an experimental serum to aid the United States government's efforts in World War II."
        },
        {
            name: "Motoko Kusanagi",
            price: 5700,
            img: 'kusanagi.jpg',
            desc: "Motoko Kusanagi is a synthetic full-body prosthesis augmented-cybernetic human employed as the field commander of Public Security Section 9, a law-enforcement division of the Japanese National Public Safety Commission. Being strong-willed, physically powerful, and highly intelligent, she is well known for her skills in deduction, hacking and military tactics."
        },
        {
            name: "Geralt of Rivia",
            price: 5600,
            img: 'witcher.jpg',
            desc: "Geralt, one of few remaining witchers on the Continent, is a travelling monster slayer for hire, mutated and trained from an early age to slay deadly beasts for coin."
        },
        {
            name: "Jedi Grand Master Yoda",
            price: 5500,
            img: 'yoda.jpg',
            desc: "Yoda is amongst the oldest, stoic and most powerful known Jedi Masters in the Star Wars universe."
        }
    ];

    heroesList = heroesList.concat(mockHeroesList);
    saveToLocalStorage();
    // event.preventDefault();     // <- here added prevent default
    clearRegions();
    showHeroListView();
}

function clearHeroesList() {
    heroesList = [];
    saveToLocalStorage();
    clearRegions();
    showHeroListView();
}

// local storage functions

function saveToLocalStorage() {
    var listToObject = {data: heroesList},
        heroesString = JSON.stringify(listToObject);

    localStorage.setItem("heroesList", heroesString)
}

function loadFromLocalStorage() {
    var localStorageData = localStorage.getItem("heroesList"),
        parsedLocalStorageData;

    if (!localStorageData) {
        parsedLocalStorageData = {data: []}
    } else {
        parsedLocalStorageData = JSON.parse(localStorageData);
    }

    heroesList = parsedLocalStorageData.data;
}