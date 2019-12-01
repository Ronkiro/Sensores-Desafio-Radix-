import React from 'react'
import { VictoryLine, 
         VictoryChart, 
         VictoryTheme,
         VictoryZoomContainer,
         VictoryLegend,
        } from 'victory'
import moment from 'moment'

class Chart extends React.Component {
    // Sensor: Cor
    // Data: x
    // Valor: y
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
            groupedData: {}, // { 'local.sensorxx': { ...dadosSensores } }
        }
        const API_URL = process.env.REACT_APP_API_URL.endsWith('/') ? 
                        process.env.REACT_APP_API_URL.substring(0, process.env.REACT_APP_API_URL.length-1) : 
                        process.env.REACT_APP_API_URL 
        const API_PORT = process.env.REACT_APP_API_PORT
        this.API_URL = API_URL + ':' + API_PORT + '/'
    }

    mapGroups = () => {
        let groupedData = this.state.data.reduce((r, a) => {
                                                r[a.tag] = r[a.tag] || [];
                                                r[a.tag].push(a);
                                                return r;
                                            }, Object.create(null));
        // Iterando chaves do objeto para corrigir o timestamp
        Object.keys(groupedData).forEach(function(sensor,index) {
            groupedData[sensor].map(e => {
                return(e.timestamp = moment(e.timestamp).toDate())
            })
        });
        Object.keys(groupedData).forEach((sensor, index) => groupedData[sensor]['color']=this.getRandomColor())
        this.setState({ groupedData })
    }

    fetchData = () => {
        const param = process.env.NODE_ENV == "production" ? '' : 'data'
        
        fetch(this.API_URL + param )
            .then(response => response.json())
            .then(data => {
                this.setState({ data: data });
                this.mapGroups()
            })
            .catch(err => {
                console.log(err)
            } )
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

    buildLegend(group) {
        return { name: group, symbol: { fill: this.state.groupedData[group].color }}
    }

    createLines(group) {
        return (
            <VictoryLine 
                        data={ this.state.groupedData[group] }
                        x="timestamp"
                        y="valor"
                        style={{
                            data: {
                              fill: "transparent",
                              opacity: 1,
                              stroke: this.state.groupedData[group].color,
                              strokeWidth: 2
                            }
                        }}
            />
        );
    }

    componentDidMount() {
        this.fetchData()
    }

    render(){
        let legendData = []
        Object.keys(this.state.groupedData).forEach((key, index) => {
            legendData.push(this.buildLegend(key))
        })
        return(
            <main style={{ "display": "flex", "justify-content": "center"}}>
                <div style={{ "display" : "inline-flex" }}>
                    <VictoryChart 
                        theme={ VictoryTheme.material } 
                        style={{ parent: { maxWidth: "70%" } }}
                        containerComponent={<VictoryZoomContainer/>}
                    >
                        { Object.keys(this.state.groupedData).map(group => this.createLines(group) ) }
                    </VictoryChart>
                    <VictoryLegend x={0} y={75}
                            title="Legenda"
                            centerTitle
                            orientation="vertical"
                            gutter={2}
                            style={{ border: { stroke: "black" }, 
                                    title: {fontSize: 10 },
                                }}
                            data={ legendData }
                        /> 
                </div>
            </main>
        )
    }
}

export default Chart;