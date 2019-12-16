import React from 'react';
import './App.css';
import styled from 'styled-components'
import WeatherPage from './pages/WeatherPage'

function App() {
  return (
    <Conttiner>
      <WeatherPage></WeatherPage>    
    </Conttiner>
  );
}


const Conttiner = styled.div`
  flex:1;
`;

export default App;
