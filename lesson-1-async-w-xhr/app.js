(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        // long-form JS
        // const unsplashRequest = new XMLHttpRequest();
        // unsplashRequest.onload = addImage;
        // unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        // unsplashRequest.setRequestHeader('Authorization', 'Client-ID 90c3cc09b094ea3757aa32dd13b5b04ffe200c82ff98f7022b7d076c0e30e68d');
        // unsplashRequest.send();

        //short-form jQuery
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID 90c3cc09b094ea3757aa32dd13b5b04ffe200c82ff98f7022b7d076c0e30e68d'
            }
        }).done(addImage)
        .fail(function (err) {
            requestError(err, 'image');
        });

        // const articleRequest = new XMLHttpRequest();
        // articleRequest.onload = addArticles;
        // articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=554a744b61a14033b1ca2af755235da8`);
        // articleRequest.send();

        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=554a744b61a14033b1ca2af755235da8`
        }).done(addArticles)
        .fail(function (err) {
            requestError(err, 'articles');
        });;
    });

// short-form jQuery
    // function addImage(images) {
    //     const firstImage = images.results[0];
    
    //     responseContainer.insertAdjacentHTML('afterbegin', `<figure>
    //             <img src="${firstImage.urls.small}" alt="${searchedForText}">
    //             <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
    //         </figure>`
    //     );
    // }
    function addImage(data){
        let htmlContent = '';

        if(data && data.results && data.results.length>1) {
            const firstImage = data.results[0];
            htmlContent = `<figure><img src = "${firstImage.urls.regular}" alt="${searchedForText}">            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        } else {
            htmlContent = `<div class="error-no-image">No Images Available</div>`;
        }

        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }

    // long-form JS
    // function addImage(){
    //     let htmlContent = '';
    //     const data = JSON.parse(this.responseText);

    //    if(data && data.results && data.results[0]) {
    //         const firstImage = data.results[0];
    //         htmlContent = `<figure><img src = "${firstImage.urls.regular}" alt="${searchedForText}">            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
    //         </figure>`;
    //     } else {
    //         htmlContent = `<div class="error-no-image">No Images Available</div>`;
    //     }

    //     responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    // }

    function addArticles (articles) {
        let htmlContent = '';
        let allArticles = articles.response.docs;

            htmlContent = '<ul>'+allArticles.map(article => `<li class="article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2><p>${article.snippet}</p></li>`).join('')+'</ul>';

        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }

    // function addArticles () {
    //     let htmlContent = '';
    //     const data = JSON.parse(this.responseText);

    //     if(data.response && data.response.docs && data.response.docs.length>1) {
    //         htmlContent = '<ul>'+data.response.docs.map(article => `<li class="article"><h2><a href="${article.web_url}">${article.headline.main}</a></h2><p>${article.snippet}</p></li>`).join('')+'</ul>';
    //     } else {
    //         htmlContent = `<div class="error-no-article">No articles Available</div>`
    //     }
    //     responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    // }

})();
