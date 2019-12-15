import React, { Component } from 'react'
import styled from 'styled-components'
import * as Colors from '../constants/colors'


class WeatherTable extends Component {

    render() {
        const { type, weatherdata } = this.props
        return (
            <Conttiner>
                <Table border='1' width='100%' >
                    <tr>
                        <TableHeaderTh>Datetime</TableHeaderTh>
                        <TableHeaderTh>Min temp</TableHeaderTh>
                        <TableHeaderTh>Max temp</TableHeaderTh>
                        <TableHeaderTh>Wind speed</TableHeaderTh>
                    </tr>

                    {weatherdata && weatherdata.map((weather) => (
                        <TableDataRowTr key={weather.dt}>
                            <TableDataRow>{type === 'Api' ? weather.dt_txt : weather.dt}</TableDataRow>
                            <TableDataRow>{type === 'Api' ? weather.main.temp_min : weather.temp_min}</TableDataRow>
                            <TableDataRow>{type === 'Api' ? weather.main.temp_max : weather.temp_max}</TableDataRow>
                            <TableDataRow>{type === 'Api' ? weather.wind.speed : weather.w_speed}</TableDataRow>
                        </TableDataRowTr>
                    ))}
                </Table>
            </Conttiner>

        )
    }
}

const TableDataRowTr = styled.tr`
    border-left: 1px solid ${Colors.grey};
    border-right: 1px solid ${Colors.grey};
`;

const TableDataRow = styled.td`
    text-align: center;
    border-bottom: 1px solid ${Colors.grey};
`;

const Table = styled.table`
    width: 40%;
    border-spacing: 0;
    border-collapse: collapse;
    table-layout: fixed;
`;

const TableHeaderTh = styled.th`
    border-bottom: 1px solid ${Colors.grey};
    color: ${Colors.blue};
    padding-bottom: 8px;
`;

const Conttiner = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
`;

export default WeatherTable;