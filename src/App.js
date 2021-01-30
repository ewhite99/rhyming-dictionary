import React, { useEffect, useState } from 'react'
import './App.css';

function App() {

  const [rhymes,setRhymes] = useState([])
  const [search,setSearch] = useState('')
  const [word, setWord] = useState('love')

  useEffect(() => {
    getRhymes()
    // eslint-disable-next-line
  }, [word])

  const getRhymes = async () => {
    try{
      const response = await fetch(`https://api.datamuse.com/words?rel_rhy=${word}&max=15`)
      const data = await response.json()
      setRhymes(data)    
    } catch(err) {
      alert(err)
    }
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }
  
  const getSearch = e => {
    e.preventDefault();
    setWord(search)
  }

  return (
    <div className="App">
        <div className="container">
        <div className="container-form">
          <h1>Rhyming Dictionary</h1>
          <form className="search-form" onSubmit={getSearch}>
            <input 
              className='search-bar' 
              type='text' 
              placeholder='enter a word'
              value={search} 
              onChange={updateSearch}
              required
              />

            <button className="search-button" type="submit"><i class="fas fa-search"></i></button> 
          </form>
        </div>
        <div className="container-results">
          <h2>words that rhyme with: <span className="query-text">'{word}'</span></h2>
          {rhymes.map(results => {
            return <p className="result" key={results.word}>{results.word}</p>
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
