import React, { Component } from 'react'
import styled from 'styled-components'
import * as Colors from '../constants/colors'

class WeatherSelection extends Component {
    state = { items: [], text: '' };

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    }

    handleSaveData = (type) => {
        const {text} = this.state
       // e.preventDefault();
       console.log("type : ",type)
        if (!text.length) {
          return;
        }
        const newItem = {
          text: text,
          id: Date.now()
        };
        this.setState(state => ({
          items: state.items.concat(newItem),
          //text: ''
        }))
        this.props.onSearch(type,text)
        
      }

    render() {
        const {text} = this.state
        return (
            <Conttiner>
                <input
                    id="new-todo"
                    onChange={this.handleChange}
                    value={text}
                />
                <Button color={"#ffffff"} backgroundColor={Colors.blue} onClick={() => this.handleSaveData('Api')}>
                        Get from API
                </Button>
                <Button color={"#000000"} backgroundColor={Colors.yellow} onClick={() => this.handleSaveData('Db')}>
                        Get from DB
                </Button>
            </Conttiner>
            
        )
    }
}

const Button = styled.button`
  background: ${props => props.backgroundColor};
  border-radius: 3px;
  border: 2px solid ${props => props.backgroundColor};
  color: ${props => props.color};
  margin: 0 1em;
  padding: 0.25em 4em;
  display: flex;
`

const Conttiner = styled.div`
  justify-content:center;
  display:flex;
  flex-direction:row;
  width:40%;
  padding:10px;
  border-bottom: 1px solid ${Colors.grey};
`;

export default WeatherSelection;