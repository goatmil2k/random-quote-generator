document.addEventListener('DOMContentLoaded', function() {
    console.log("script.js is loaded")


    function getAllQuotes() {
        return new Promise((resolve, reject) => {
            $.ajax ({
                headers: {
                    Accept: 'application/json'
                },
                url : 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
                success: function(response) {
                        let data = JSON.parse(response);
                        //console.log(data);
                        resolve(data);
                    },
                error: function(xhr, status, error) {
                    reject(new Error(`Request Failed: status ${status}, error: ${error}`));
                },
            });
        });
    }


    
    async function fetchQuotes() {
        try {
            const data = await getAllQuotes();
            return data;
        } catch(error) {
            console.error("Error: ", error)
        }
    }


    /*const allQuotes = fetchQuotes().then(data => {
        return data;
    }).catch(error => {
        console.error(error);
    });*/

    const getQuote = () => fetchQuotes().then(data => {
        return data.quotes[Math.floor(Math.random() * data.quotes.length)];
    }).then(data => {
        let currentQuote = data.quote;
        let currentAuthor = data.author;
        
        $('#text').text(currentQuote);
        $('#author').text(currentAuthor);

        $('#tweet-quote').attr(
            'href',
            'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
              encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
          );
        
        let currentColor = colors[Math.floor(Math.random() * colors.length)];
        console.log(currentColor);

        $('.bg-color').css("background-color", currentColor);

        $('.current-color').css('color', currentColor);

    }).catch(error => {
        console.error(error);
    });


    getQuote();

    $('.new-quote').on('click', getQuote);
});
/**/
var colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#BDBB99',
    '#77B1A9',
    '#73A857'
  ];

