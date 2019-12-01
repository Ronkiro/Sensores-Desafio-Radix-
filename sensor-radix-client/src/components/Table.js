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
import moment from 'moment';

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

class Table extends Component {
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
        this.API_URL = API_URL + ':' + API_PORT + '/'
    }

    fetchData = () => {
        const param = 'data'
        
        fetch(this.API_URL + param )
            .then(response => response.json())
            .then(data => {
              data.map(e => e.timestamp = moment(e.timestamp).toDate() )
              this.setState({ data: data }) 
            })
            .catch(err => {
                console.log(err)
            } )
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
              { title: "ID", field: "id", type: "numeric"},
              { title: "Tag", field: "tag" },
              { title: "Valor", field: "valor", type: "numeric"},
              { title: "Estado", field: "status" },
              { title: "Horário", field: "timestamp", type: "datetime" },
            ]}
            title="Eventos"
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

export default Table;