import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1 className="App-title">Cost Curious</h1>

          <p>Have you ever thought about how much money do you spend on some items, say in one month? It is easy to know how much money is spent on large purchases and items, because,well, they are large and not frequent. For example, let's take rent expenses, quite painful topic here in San Francisco. You know exactly how much you pay for the rent in a month, and it is easy to calculate how much you pay for rent in a year. </p>
          <p>It is quite different story with smaller purchases, like coffee. </p>

          <h3>Articles on saving:</h3>
          
          <ol className='articles'>
            <li><a href="https://www.iwillteachyoutoberich.com/blog/save-on-coffee/" target="_blank" rel="noopener noreferrer">The psychology of cutting back on lattes</a></li>
            <li><a href="http://www.businessinsider.com/heres-how-much-money-you-could-save-by-making-coffee-at-home-2015-10" target="_blank" rel="noopener noreferrer">Here's how much money you could save by making coffee at home</a></li>
            <li><a href="http://college.usatoday.com/2016/10/10/money-101-starbucks-coffee-7-tips-to-save/" target="_blank" rel="noopener noreferrer">Money 101: How much is your Starbucks habit costing you? 7 tips to save on coffee</a></li>
          </ol>
          
    </div>
    );
  }
}

export default App;
