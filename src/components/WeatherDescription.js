import React, { Component } from 'react'
import * as Colors from '../constants/colors'
import styled from 'styled-components'

// const green = "#28A745"
// const red = "#DC3545"
// const blue = "#007BFF"
// const yellow = "#FFC107"
// const grey = "#DEE2E6"
// const yellowHighlight = "#FFD045"
// const blueHighlight = "#3F9CFF"


class WeatherDescription extends Component {
    state = { items: [], text: '' };

    handleChange = (e) => {
        this.setState({ text: e.target.value });
    }

    

    render() {
        const { type, city, from, to, updated } = this.props
        return (
            <Conttiner>
                <TitleText>{city}</TitleText>
                <SecondaryText>
                    {type === 'Api' ?
                     `Period`
                    :
                    `Updated at: ${updated}`
                    }             
                </SecondaryText>
                {type === 'Api' ?
                    <div>
                        <DescriptionText>Start at: {from}</DescriptionText>
                        <DescriptionText>End at: {to}</DescriptionText>
                        <Button color={"#ffffff"} backgroundColor={Colors.green}
                            onClick={() => this.props.onSave()}
                        >Save forecast</Button>
                    </div>
                    :
                    null
                }

            </Conttiner>
        )
    }
}

const Button = styled.button`
  background: ${props => props.backgroundColor};
  border-radius: 3px;
  border: 2px solid ${props => props.backgroundColor};
  color: ${props => props.color};
  width:20%;
  padding:2px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const SecondaryText = styled.div`
	font-size: 15px;
	color: #000000;
    font-weight: bold;
    padding-bottom: 10px;
`;

const TitleText = styled.div`
	font-size: 20px;
	color: #000000;
    font-weight: bold;
    padding-bottom: 10px;
`;

const DescriptionText = styled.div`
	font-size: 10px;
	color: #000000;
    font-weight: normal;
    padding-bottom: 10px;
`;

const Conttiner = styled.div`
  display:flex;
  flex-direction:column;
  padding:10px;
  width:40%;
  border: 1px solid ${Colors.grey};
`;

export default WeatherDescription;