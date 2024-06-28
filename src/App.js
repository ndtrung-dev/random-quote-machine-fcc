import "./App.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const quotesUrl =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];

function getRandom(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

const App = () => {
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [currentColor, setCurrentColor] = useState("rgb(24, 26, 43)");

  useEffect(() => {
    fetchRandomQuote(quotesUrl);
  }, []);

  async function fetchRandomQuote(url) {
    try {
      await fetch(url)
        .then((res) => res.json())
        .then((quotes) => {
          setQuote({ ...getRandom(quotes.quotes) });
          setCurrentColor(getRandom(colors));
        });
    } catch (error) {
      console.error(error);
    }
  }

  function handleNewQuote(event) {
    event.preventDefault();
    fetchRandomQuote(quotesUrl);
  }

  return (
    <div className="App" style={{ backgroundColor: currentColor }}>
      <div id="quote-box">
        <div id="text" style={{ color: currentColor }}>
          {quote.quote}
        </div>
        <div id="author" style={{ color: currentColor }}>
          {quote.author}
        </div>
        <div className="container container_h" id="btns-wrapper">
          <a
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
              '"' + quote.quote + '" ' + quote.author
            )}`}
            id="tweet-quote"
            className="container icon-wrapper"
            title="Tweet this quote"
            style={{ backgroundColor: currentColor }}
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faTwitter}
              className="icon"
              color={`white`}
              class="icon"
            />
          </a>
          <button
            id="new-quote"
            style={{ backgroundColor: currentColor }}
            onClick={handleNewQuote}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
