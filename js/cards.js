const cardsList = document.querySelector('.cards_list');

const getCards = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();

        data.forEach(item => {
            cardsList.innerHTML += `
                <div class="card_item">
                    <img src="https://picsum.photos/300/200?random=${item.id}" alt="image">
                    <div class="card_body">
                        <h3>${item.title}</h3>
                        <p>${item.body}</p>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
};

getCards();