export const newspapers = [
  {
    name: "Economic Times",
    address: "https://economictimes.indiatimes.com",
    selector: "a[href*='/news/'], a[href*='/markets/']",
    base: "https://economictimes.indiatimes.com"
  },
  {
    name: "Hindustan Times",
    address: "https://www.hindustantimes.com",
    selector: "a[href*='/india-news/'], a[href*='/world-news/']",
    base: "https://www.hindustantimes.com"
  },
  {
    name: "Times of India",
    address: "https://timesofindia.indiatimes.com",
    selector: "a[href*='/india/'], a[href*='/sports/'], a[href*='/world/']",
    base: "https://timesofindia.indiatimes.com"
  },
  {
    name: "The Hindu",
    address: "https://www.thehindu.com",
    selector: "a[href*='/news/']",
    base: "https://www.thehindu.com"
  },
  {
    name: "Indian Express",
    address: "https://indianexpress.com",
    selector: "a[href*='/article/']",
    base: "https://indianexpress.com"
  }
];

export default newspapers;