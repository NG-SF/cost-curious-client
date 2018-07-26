import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import './Home.css';
import Footer from '../Footer/Footer';
import Dashboard from '../Dashboard/Dashboard';
import {login} from '../../actions/auth';

export class Home extends Component {
    constructor () {
    super()
    this.state = {
      selected: false
    }
  }

  onClick() {
   this.setState(() => ({
    selected: true}));
    this.props.login('demo', 'demo123');
  }

  render(){

  return (
    <div className="App">
      <div className='img1'>
        <h1 className='firstQuestion'>Do you know how much your coffee habit is costing you?</h1>
        <button className='demo' onClick={() => this.onClick()}>Check out demo account</button>
      </div>   

    {this.props.username && this.state.selected && <Dashboard />}

      <section className='home1'>
        <div className='home1-flex1'>
          <h2>About</h2>
          <p> The statistics about how Americans are handling their personal finances are troubling. According to <a target="_blank" rel="noopener noreferrer" href="http://www.usfinancialcapability.org/results.php?region=US#managing-financial-products">FINRA’s National Financial Capability Study</a> almost 33% of Americans pay the minimum due on their credit card each month.</p>
          <p>Two-thirds of Americans would struggle to come up with $1,000 for an emergency, according to  <a target="_blank" rel="noopener noreferrer" href="http://www.apnorc.org/news-media/Pages/News+Media/Poll-Two-thirds-of-US-would-struggle-to-cover-$1,000-crisis.aspx">The Associated Press-NORC Center for Public Affairs Research</a>   
          </p>

          <p>Many articles exist about personal finance and spending habits. One of the popular topics of such articles is coffee. Particularly, buying coffee vs making it at home. Does that really can make a difference? </p>
        </div>
        <div className='home1-flex1'>
        <p>One of the articles from Business insider argues it can make a difference:</p>
        <h3 className='quote'>"Here's how much money you could save by making coffee at home"</h3>
        <h4 className='left'>by Gabrielle Moss, Bustle</h4>
          <blockquote cite="http://www.businessinsider.com/heres-how-much-money-you-could-save-by-making-coffee-at-home-2015-10">
            <p>...if you opt to buy coffee at a cafe, you're spending between $5 and $25 a week — and thus, $20 to $100 a month, and between $240 and $1,200 a year — on coffee (while someone who brews at home is spending around $45 a year on coffee).</p>
            <p>Yes, the difference between $45 and $1,200 is pretty stark, so obviously, making your own coffee is an opportunity to save some money.</p>
            <footer> <a target="_blank" rel="noopener noreferrer" href="http://www.businessinsider.com/heres-how-much-money-you-could-save-by-making-coffee-at-home-2015-10" >read more...</a></footer>
          </blockquote>
        </div>
      </section>

      <div className='img2'>
        <div className='box'>
          <h2 className='question'>Start learning about your spending today</h2>
          <div className='home-signup-btn'><NavLink to='/register' exact={true}>Sign up ></NavLink></div>
        </div>
      </div> 
      
    <section className='home2'>
      <div className='home2-flex2'>
        <div className='home2-flex2-box'>
        <div>
          <p>Check out these articles for the motivation to get your expenses in order.</p>
          <p>Better yet, <NavLink to='/register' exact={true}>sign up</NavLink> today and start collecting data about your spending patterns.</p>
          <p>Use <NavLink to='/login' exact={true}>demo account</NavLink> to see app in action.</p>
        </div>
        <img  className='curious-img' src="./images/curious.jpg" alt="questions" />
        </div>
      </div>
      <div className='home2-flex2'>
        <h3 className='articles-title'>Articles on coffee and savings:</h3> 
        <ol className='articles'>
            <li><a href="https://www.iwillteachyoutoberich.com/blog/save-on-coffee/" target="_blank" rel="noopener noreferrer">The psychology of cutting back on lattes</a></li>
            <li><a href="http://www.businessinsider.com/heres-how-much-money-you-could-save-by-making-coffee-at-home-2015-10" target="_blank" rel="noopener noreferrer">Here's how much money you could save by making coffee at home</a></li>
            <li><a href="http://college.usatoday.com/2016/10/10/money-101-starbucks-coffee-7-tips-to-save/" target="_blank" rel="noopener noreferrer">Money 101: How much is your Starbucks habit costing you? 7 tips to save on coffee</a></li>
            <li><a href="https://moneyish.com/splurge/1-in-3-young-americans-spent-more-on-coffee-last-year-than-they-invested/" rel="noopener noreferrer">1-in-3 Young americans spent more on coffee last year than they invested</a></li>
            <li><a href="https://www.theguardian.com/money/2018/jan/29/can-you-really-save-for-a-deposit-by-ditching-coffee-and-avocado-toast-i-tried-to-find-out" rel="noopener noreferrer">Can you really save for a deposit by ditching coffee and avocado toast? I tried to find out</a></li>
        </ol>
      </div>
    </section>
    <Footer />
    </div>
  );

  }
}

const mapStateToProps = state => ({
  userId: state.auth.currentUser && state.auth.currentUser.id,
  username: state.auth.currentUser && state.auth.currentUser.username
  });

const mapDispatchToProps = (dispatch) => ({
    login: (username, password) => dispatch(login(username, password))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
