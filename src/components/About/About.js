import React from 'react';

const About = () => {
  return (
    <div>          
      <section id='about'> 
      <h1>About</h1>
      <p>There are many articles that try to teach us how to manage our finanses better, with many tips and recommendations of changing our spending habits: 'buy this, not that' or 'do not buy that at all'. </p>
      <p>One of the popular topics of such articles is coffee. Buying coffee vs making it at home. Does that really can make a difference? One of the articles argues it can:</p>
      <blockquote cite="http://www.businessinsider.com/heres-how-much-money-you-could-save-by-making-coffee-at-home-2015-10">
        <p>...if you opt to buy coffee at a cafe, you're spending between $5 and $25 a week — and thus, $20 to $100 a month, and between $240 and $1,200 a year — on coffee (while someone who brews at home is spending around $45 a year on coffee).</p>
        <p>Yes, the difference between $45 and $1,200 is pretty stark, so obviously, making your own coffee is an opportunity to save some money.</p>
        <footer>— <a href="http://www.businessinsider.com/heres-how-much-money-you-could-save-by-making-coffee-at-home-2015-10" target="_blank" rel="noopener noreferrer">read more...</a></footer>
      </blockquote>
      <p>These articles got me curious to know how much I spend on coffee and other smaller puchases. So I made this app to help me track the expenses of select items and see the results in nice charts.</p>
      <p>This app can also be used to keep track of savings.</p>
      <img src="./images/piggy.png" alt="savings clipart"/>
      <h3>Articles on coffee and savings:</h3> 
      <ol className='articles'>
          <li><a href="https://www.iwillteachyoutoberich.com/blog/save-on-coffee/" target="_blank" rel="noopener noreferrer">The psychology of cutting back on lattes</a></li>
          <li><a href="http://www.businessinsider.com/heres-how-much-money-you-could-save-by-making-coffee-at-home-2015-10" target="_blank" rel="noopener noreferrer">Here's how much money you could save by making coffee at home</a></li>
          <li><a href="http://college.usatoday.com/2016/10/10/money-101-starbucks-coffee-7-tips-to-save/" target="_blank" rel="noopener noreferrer">Money 101: How much is your Starbucks habit costing you? 7 tips to save on coffee</a></li>
          <li><a href="https://moneyish.com/splurge/1-in-3-young-americans-spent-more-on-coffee-last-year-than-they-invested/">1-in-3 Young americans spent more on coffee last year than they invested</a></li>
          <li><a href="https://www.theguardian.com/money/2018/jan/29/can-you-really-save-for-a-deposit-by-ditching-coffee-and-avocado-toast-i-tried-to-find-out">Can you really save for a deposit by ditching coffee and avocado toast? I tried to find out</a></li>
      </ol>
    </section>
  </div>
  );
};

export default About;
