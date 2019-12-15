import React, { Component } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import WeatherSelection from '../components/WeatherSelection'
import WeatherDescription from '../components/WeatherDescription'
import WeatherTable from '../components/WeatherTable';

import * as Colors from '../constants/colors'

const KEY = ''

class WeatherPage extends Component {
    state = { items: [], selected: 'Api', selectedCity: '', data: [], from: '', to: '', updated: '',color: '#000000' };

    setSelectedType = (type, city) => {
        this.setState({
            selected: type,
            selectedCity: city,
            data: []
        });
        console.log("type & city", type, city)
        this.fetchDataFromUrl(city, type)
    }

    saveDataInDb = () => {
        const { selectedCity, data } = this.state
        console.log("saveDataInDb ::: ")

        let dataToSave = data && data.list && data.list[0]

        axios.post(`http://127.0.0.1:8080/api/weather.php?city="${selectedCity}"&dt="${dataToSave.dt_txt}"
        &minTemp="${dataToSave.main.temp_min}"&maxTemp="${dataToSave.main.temp_max}"&windSpeed="${dataToSave.wind.speed}"`
        )
            .then(res => {
                let responseData = res.data
                console.log("data : ", responseData)
            })

    }

    fetchDataFromUrl = (city, type) => {
        let url
        type === 'Api' ?
            url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${KEY}`
            :
            url = `http://localhost:8080/api/weather.php?city="${city}"`

        axios.get(url)
            .then(data => {
                this.checkCodeFromResponseApi(data.data, data.data.cod + '', type)
            });
    }

    checkCodeFromResponseApi = (data, code, type) => {
        console.log("data", code, data)
        if (code === '200') {
            type === 'Api' ?
                this.setState({ data, from: data && data.list[0].dt_txt, to: data.list[data.list.length - 1].dt_txt, color:this.findColorJacket(data,type) })
                :
                this.setState({ data: [data], updated: data.updated_at ,color: this.findColorJacket(data,type)})
        }
        else {
            this.setState({ data: [], from: '', to: '' }, () => console.log("gggg"))
        }
    }

    findColorJacket = (data,selected) => {
        let d = selected && data && data.length > 0 
        if (!d || d.length === 0) {
            return "#000000"
        }
        d = selected === 'Api' ? data.list : data
        if (selected !== 'Api') {
            if (d[0].temp_max < 15) {
                return Colors.blue
            }
            return Colors.red
        }

        if ( d[0].main.temp_max >= 15) {
            return Colors.blue
        }

        return Colors.red
    }

    render() {
        const { selected, selectedCity, data, from, to, updated, color } = this.state

        return (
            <Conttiner>
                <ConttinerHeder>
                    <TextJacket color={color}> Jacket </TextJacket>
                    <h2>  or no    </h2>
                    <TextJacket color={color} > Jacket</TextJacket>
                </ConttinerHeder>
                <ConttinerTopSearch >
                    <WeatherSelection
                        onSearch={this.setSelectedType}
                    />
                </ConttinerTopSearch>



                {(!data || data.length === 0)
                    ?
                    null
                    :
                    <div>
                        <ConttinerTopSearch>
                            <WeatherDescription
                                onSave={this.saveDataInDb}
                                type={selected}
                                city={selectedCity}
                                from={from} to={to}
                                updated={updated}
                            />
                        </ConttinerTopSearch>
                        <WeatherTable
                            weatherdata={selected === 'Api' ? data.list : data}
                            type={selected} />
                    </div>
                }
            </Conttiner>

        )
    }
}

const ConttinerHeder = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:center;
  align-items:center;
  padding-top:10px;
`;

const TextJacket = styled.h2`
  padding-right:10px;
  padding-left:10px;
  color: ${props => props.color};
`;

const Conttiner = styled.div`
  flex:1;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding-top:10px;
`;

const ConttinerTopSearch = styled.div`
  display:flex;
  padding-top:10px;
  flex:1;
  width:100%;
  height:100%;
  justify-content:center;
`;

export default WeatherPage;