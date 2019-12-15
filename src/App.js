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
  /* display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding-top:10px; */
`;

const ConttinerTopSearch = styled.div`
  display:flex;
  padding-top:10px;
  flex:1;
  width:100%;
  height:100%;
  justify-content:center;
`;

export default App;
