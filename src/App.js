import React, { useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';
import PopUp from './components/PopUp';

function App() {
  const apiURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=c36459f1';
  const [state, setState] = useState({
    s: '',
    results: [],
    selected: {}
  });

  const search = e => { 
    if (e.key === 'Enter') { 
      axios(apiURL + "&s=" + state.s).then(({data}) => { 
        let results = data.Search;
        setState(prevState => { 
          return { ...prevState, results: results}
        });
      })
    }
  }


  const handleInput = e => {
    let s = e.target.value;
    setState(prevState => { 
      return { ...prevState, s: s}
    });
  }

  const openPopup = id => { 
    console.log('here');
    axios(apiURL + "&id=" + id ).then(({data}) => { 
      let result = data;
      setState(prevState => { 
        return { ...prevState, selected: result}
      })
    });
  }

  const closePopup = () => { 
    setState(prevState => { 
      return { ...prevState, selected: {}}
    });
  }
  return (
    <div>
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput = {handleInput} search = { search } />
        <Results results = {state.results} openPopup = {openPopup} />

        {( typeof state.selected.Title != "undefined") ? <PopUp selected = {state.selected} closePopup = {closePopup}/> : false}
      </main>
    </div>
  );
}

export default App;
