const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector('#quote')
const authorName = document.querySelector('#author')
const twitterButton = document.querySelector('#twitter-button')
const NextQuoteButton = document.querySelector('#next-button')
const loader = document.getElementById('loader')

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoader() {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

async function  getQuote() {
    loading()
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
    
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        if(data.quoteAuthor === "") {
            authorName.innerText = 'Unknown';
        } else {
            authorName.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 100) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        // Hide loader and show quote
        hideLoader()
    } catch (erro) {
        getQuote()
        console.log('Whoops, no quote', erro)
    }
}

function tweetQuote() {
    const quote = quoteText.innerHTML;
    const author = authorName.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank');
}


getQuote()
NextQuoteButton.addEventListener('click', getQuote)
twitterButton.addEventListener('click', tweetQuote)