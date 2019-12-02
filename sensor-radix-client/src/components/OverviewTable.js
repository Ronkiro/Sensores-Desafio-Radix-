import React, { Component, forwardRef } from 'react'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import lodash from 'lodash';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class OverviewTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: [],
        }
        const API_URL = process.env.REACT_APP_API_URL.endsWith('/') ? 
                        process.env.REACT_APP_API_URL.substring(0, process.env.REACT_APP_API_URL.length-1) : 
                        process.env.REACT_APP_API_URL 
        const API_PORT = process.env.REACT_APP_API_PORT
        const API_SUFFIX = process.env.REACT_APP_API_SUFFIX ? process.env.REACT_APP_API_SUFFIX : ""
        this.API_URL = API_URL + ':' + API_PORT + '/' + API_SUFFIX
    }

    fetchData = () => {
        const param = process.env.NODE_ENV === "production" ? '' : 'data';
        let myData = {}

        fetch(this.API_URL + param )
            .then(response => response.json())
            .then(data => {
              let groupedData = lodash.groupBy(data, 'tag') // { "brasil.sudeste.sensor01": <data> }
              Object.keys(groupedData).forEach((key, index) => {
                  let keyArr = key.split('.') // separando em [país, região, sensor]
                  keyArr.pop()
                  let regionKey = keyArr.join('.')
                  keyArr.pop()
                  let countryKey = keyArr
                  myData = {
                      ...myData,
                      [key]: groupedData[key].length,
                      [regionKey]: myData.hasOwnProperty(regionKey) ? myData.regionKey + groupedData[key].length || myData[countryKey] : groupedData[key].length || 0,
                      [countryKey]: myData.hasOwnProperty(countryKey) ? myData[countryKey] + groupedData[key].length || myData[countryKey] : groupedData[key].length || 0
                  } 
              });

              // Formatando dados para caberem na tabela.
              let tableData = []
              Object.keys(myData).forEach((key, index) => {
                    let sensorGroup = { regiao: key, qtd: myData[key]}
                    tableData.push(sensorGroup)
              })
              this.setState({ data: tableData }) // Add na tabela.
            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetchData()
        this.interval = setInterval(() => this.fetchData(), 1 * 1000)
        this.setState({ isLoading: false })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
      const { data, isLoading } = this.state
      return (
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: "Região", field: "regiao" },
              { title: "Quantidade de Eventos", field: "qtd", type: "numeric"},
            ]}
            title="Overview dos Eventos"
            options={{
                exportButton: true
            }}
            data={ data }
            isLoading={ isLoading }
          />
        </div>
      );
    }
}

export default OverviewTable;