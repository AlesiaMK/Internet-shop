const items = [{
        title: "Гостиная пальма",
        description: "Подойдет для Вашего интерьера",
        tags: [],
        price: 78,
        img: "./img/Palm.jpeg",
        rating: 4.4,
    },
    {
        title: "Сансевиерия",
        description: "Лучшее комнатное растение для очистки воздуха",
        tags: [],
        price: 72,
        img: "./img/Sansev.jpeg",
        rating: 3.1,
    },
    {
        title: "Замиокулькас",
        description: "Маленькая Африка у Вас дома!",
        tags: [],
        price: 98,
        img: "./img/Zamiok.jpeg",
        rating: 5.0,
    },
    {
        title: "Ховея пастериана",
        description: "Стильное декоративно-лиственное растение. ",
        tags: [],
        price: 92,
        img: "./img/Hoveya.jpeg",
        rating: 4.7,
    },
    {
        title: "Пахира водная",
        description: "Теперь «ореховое дерево» и в Вашем доме! ",
        tags: [],
        price: 72,
        img: "./img/Pahira.jpeg",
        rating: 4.9,
    },
    {
        title: "Аспидистра элатиор",
        description: "Стильное, простое в уходе декоративно-лиственное растение.",
        tags: [],
        price: 69,
        img: "./img/Aspidiastra.jpeg",
        rating: 3.2,
    },
    {
        title: "Монстера минима",
        description: "Стильное тропическое декоративно-лиственное растение.",
        tags: [],
        price: 55,
        img: "./img/Monstera.jpeg",
        rating: 2.9,
    },
    {
        title: "Калатея орбифолия",
        description: "Яркое декоративно-лиственное растение.",
        tags: [],
        price: 58,
        img: "./img/Kalateria.jpeg",
        rating: 3.4,
    },
    {
        title: "Асплениум осака",
        description: "Стильное достаточно неприхотливое растение.",
        tags: [],
        price: 77,
        img: "./img/Asplenium.jpeg",
        rating: 4.8,
    },
    {
        title: "Фикус лирата",
        description: "Фикус Лирата Бамбино 12 - это стильное декоративно-лиственное растение. ",
        tags: [],
        price: 71,
        img: "./img/Fikus.jpeg",
        rating: 3.2,
    },
    {
        title: "Рипсалис",
        description: "Уникальное ампельное суккулентное растение.",
        tags: [],
        price: 80,
        img: "./img/Ripsalis.jpeg",
        rating: 3.7,
    },
    {
        title: "Бегония макулата",
        description: "Стильное редкое декоративно-лиственное растение.",
        tags: [],
        price: 63,
        img: "./img/Begonia.jpeg",
        rating: 4.1,
    },

];

let currentState = [...items];

const itemsContainer = document.querySelector("#shop-items");
const itemTemplate = document.querySelector("#item-template");
const nothingFound = document.querySelector("#nothing-found");

function renderItems(arr) {
    nothingFound.textContent = "";
    itemsContainer.innerHTML = "";
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено"
        ж
    }
}

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);

    item.querySelector("h1").textContent = title;
    item.querySelector("p").textContent = description;
    item.querySelector("img").src = img;
    item.querySelector(".price").textContent = `${price}$`;

    const ratingContainer = item.querySelector(".rating");

    for (let i = 0; i < rating; i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector(".tags");

    tags.forEach((tag) => {
        const element = document.createElement("span");
        element.textContent = tag;
        element.classList.add("tag");
        tagsHolder.append(element);
    });

    return item;

};

const sortControl = document.querySelector("#sort");

sortControl.addEventListener("change", (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});

const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-btn");

searchButton.addEventListener("click", applySearch);
searchInput.addEventListener("search", applySearch);

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString));

    currentState.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;
    renderItems(currentState);
}