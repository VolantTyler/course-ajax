(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID 90c3cc09b094ea3757aa32dd13b5b04ffe200c82ff98f7022b7d076c0e30e68d'
            }
        }).then(response => response.json())
        .then(addImage)
        .catch(e => requestError(e,'image'));

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=554a744b61a14033b1ca2af755235da8`
        ).then(response => response.json())
        .then(addArticles)
        .catch(e => requestError(e, 'article'));

        function addImage(data) {
            let htmlContent = '';
            const firstImage = data.results[0];
        
            if (firstImage) {
                htmlContent = `<figure>
                    <img src="${firstImage.urls.small}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`;
            } else {
                htmlContent = 'Unfortunately, no image was returned for your search.'
            }
        
            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        function addArticles(data) {
            let htmlContent = '';
            let allArticles = data.response.docs;

            if(allArticles.length > 1) {
                htmlContent = '<ul>'+allArticles.map(article => `<li class="article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2><p>${article.snippet}</p></li>`).join('')+'</ul>';
            } else {
                htmlContent = `<div class="error-no-article">No articles Available</div>`
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);

        }

        function requestError(e, part) {
            console.log(e);
            responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
        }


    });
})();
