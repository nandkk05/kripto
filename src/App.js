import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Coins from './Coins';

function App() {

  const [coins, setCoins] = useState([])

  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false').then(res => {
      setCoins(res.data);

    }).catch(error => console.log(error))
  })

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}></input>
        </form>
      </div>
        {filteredCoins.map(coin => {
          return (
            <Coins key={coins.id} name={coin.name} image={coin.image} symbol={coin.symbol} volume={coin.market_cap} price={coin.current_price} priceChange={coin.price_change_percentage_24h} marketcap={coin.total_volume}/>
          )
        })}
    </div>
  );
}

export default App;
