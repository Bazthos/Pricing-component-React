import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function priceCalc(value, price, year) {
  if (value === '0'){
    price = 8.00;
  }else if(value === '25'){
    price = 12.00;
  }else if(value === '50'){
    price = 16.00;
  }else if(value === '75'){
    price = 24.00;
  }else{
    price = 32.00;
  }



  if(year === true){
    price = (price*0.75).toString();
    return price;
  }
  return price.toString();
}

function viewsCalc(value, pageviews) {
  if (value === '0'){
    pageviews = '10K'
  }else if(value === '25'){
    pageviews = '50K'
  }else if(value === '50'){
    pageviews = '100K'
  }else if(value === '75'){
    pageviews = '500K'
  }else{
    pageviews = '1M'
  }

  return pageviews;
}

function Intro() {
    return(
      <div className='intro'>
          <h2 className=''>Simple, traffic-based pricing</h2>
          <p className='grey-text'>Sign-up for our 30-day trial. No credit card required.</p>
      </div>
    )
}

class PrincingRange extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: '50',
      price: '16',
      year: false,
      pageviews: '100K'
    }
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleRangeChange(e){
    let target = e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;

    this.setState({
      value: val,
      price: priceCalc(val, this.state.price, this.state.year).toString(),
      pageviews: viewsCalc(val, this.state.pageviews)
    });
    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%';
  }

  handleClick(){
    this.setState({
      year: !this.state.year,
      price: (priceCalc(this.state.value, this.state.price, !this.state.year)).toString()
    })
  }

  render() {

    return(
      <div className='pricing-interactive'>
          <h2 className='pageviews grey-text'>{this.state.pageviews} PAGEVIEWS</h2>
          <input type={'range'} value={this.state.value} min={'0'} max={'100'} step={'25'} onChange={this.handleRangeChange}></input>
          <div className='price-resume'>
            <p className='price-dynamic'>$<span>{this.state.price}</span>.00</p>
            <p className='grey-text'>/ month</p>
          </div>
          <div className='toggle'>
            <p className='grey-text'>Monthly Billing</p>
            <label className='toggle-btn'>
              <input type={'checkbox'} onClick={this.handleClick}></input>
              <span className='slider'></span>
            </label>
            <p className='grey-text'>Yearly Billing <span className='mobile-o badge-discount'>-25%</span>
            <span className='desktop-o badge-discount'>25% discount</span></p>
          </div>
      </div>
    )
  }
}

function SubmitTrial() {
    return(
      <div className='submit-part'>
        <div className='submit-resume'>
          <span className='icon-check'></span>
          <p className='grey-text'>Unlimited websites</p>
        </div>
        <div className='submit-resume'>
          <span className='icon-check'></span>
          <p className='grey-text'>100% data ownership</p>
        </div>
        <div className='submit-resume'>
          <span className='icon-check'></span>
          <p className='grey-text'>Email reports</p>
        </div>
        <input className='submit-btn' type={'button'} value={'Start my trial'}></input>
      </div>
    )
}

function PricingInteractive() {
    return(
      <main>
        <div className='main-content'>
          <Intro></Intro>
          <div className='pricing-content'>
            <PrincingRange></PrincingRange>
            <SubmitTrial></SubmitTrial>
          </div>
        </div>
      </main>
    )
  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PricingInteractive />
  </React.StrictMode>
);