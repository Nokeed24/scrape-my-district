import React, {Component} from 'react'
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryBar, VictoryScatter } from 'victory'
import Paper from "@material-ui/core/Paper"
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

const data1 = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
]

const data2 = [
  {
    id: 1,
    company: 'Microsoft',
    timestamp: '2018-06-25T10:50:00.634Z',
    columnName: 'fte',
    change: '10'
  },
  {
    id: 2,
    company: 'Microsoft',
    timestamp: '2018-06-25T10:50:00.634Z',
    columnName: 'fte',
    change: '15'
  },
  {
    id: 3,
    company: 'Microsoft',
    timestamp: '2018-06-25T10:50:00.634Z',
    columnName: 'fte',
    change: '40'
  },
  {
    id: 6,
    company: 'Apple',
    timestamp: '2018-06-25T10:50:00.634Z',
    columnName: 'fte',
    change: '10'
  },
  {
    id: 7,
    company: 'Apple',
    timestamp: '2018-06-25T10:50:00.634Z',
    columnName: 'fte',
    change: '20'
  },
  {
    id: 8,
    company: 'Apple',
    timestamp: '2018-06-25T10:50:00.634Z',
    columnName: 'fte',
    change: '40'
  }
]

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


class Graph extends Component {

  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state
    const { data } = this.props
    let sortedData = data.sort((a,b) => a.id - b.id)
    sortedData.map(el => {
      el.change = parseInt(el.change)
    })
    return (
      <div>
        <Paper style={{width:'55em', margin:'0 auto', height:'33em'}}>
        <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Line Graph" />
            <Tab label="Bar Graph" />
            <Tab label="Scatter Graph" />
          </Tabs>
          {value === 0 && <TabContainer><VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
              width={600}
              height={300}
            >
              <VictoryAxis
                  dependentAxis
                  label={data.columnName && data[0].columnName}
                  style={{tickLabels: {padding: 25}}}
                />
              <VictoryAxis
                crossAxis
                label="Date"
                style={{axisLabel :{padding: 30}, tickLabels: {fontSize: 8}}}
                tickFormat={(x) => (x.substring(0,10))}
              />
              <VictoryLine
                interpolation="natural"
                data={sortedData}
                x="timestamp"
                y="change"
              />
            </VictoryChart></TabContainer>}
          {value === 1 && <TabContainer><VictoryChart
              domainPadding={25}
              theme={VictoryTheme.material}
              width={600}
              height={300}
            >
              <VictoryAxis
                  dependentAxis
                  label={data.columnName && data[0].columnName}
                  style={{tickLabels: {padding: 25}}}
                />
              <VictoryAxis
                crossAxis
                label="Date"
                style={{axisLabel :{padding: 30}, tickLabels: {fontSize: 8}}}
                tickFormat={(x) => (x.substring(0,10))}
              />
              <VictoryBar
                interpolation="natural"
                data={sortedData}
                x="timestamp"
                y="change"
              />
            </VictoryChart></TabContainer>}
          {value === 2 && <TabContainer><VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
              width={600}
              height={300}
            >
              <VictoryAxis
                  dependentAxis
                  label={data.columnName && data[0].columnName}
                  style={{tickLabels: {padding: 25}}}
                />
              <VictoryAxis
                crossAxis
                label="Date"
                style={{axisLabel :{padding: 30}, tickLabels: {fontSize: 8}}}
                tickFormat={(x) => (x.substring(0,10))}
              />
              <VictoryScatter
                interpolation="natural"
                data={sortedData}
                x="timestamp"
                y="change"
              />
            </VictoryChart></TabContainer>}

        </Paper>
      </div>
    )
  }
}
export default Graph