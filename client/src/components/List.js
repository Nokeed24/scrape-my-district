import React from "react";
import { connect } from "react-redux";
import HotTable from "react-handsontable";
import { changeCell, fetchAllData, updateData } from "../actions/list";
import { changes } from "../lib/functions";
import FileSelector from "./FileSelector";
import {fetchUpdates} from '../actions/updates'

export class List extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAllData();
    this.props.fetchUpdates()
  }

  render() {
    const { listRed, databases, csv, changes } = this.props;
    let dbArray = [];
    if (databases) dbArray = Object.keys(databases).map(i => databases[i]);
    // console.log(dbArray, "DATABASE ARRAY");
    let columnNames = [];
    if (dbArray[0]) columnNames = Object.keys(dbArray[0]).map(i => i);
    // console.log(columnNames, "COLUMNS");
    let data = [];
    let values = [];
    if (dbArray) {
      values = dbArray.map(entry => {
        return Object.values(entry).map(i => i);
      });
      const newNames = columnNames.map(name => {
        const ArrayOfStrings = name.split("_");
        // console.log(ArrayOfStrings, "ARRAY OF STRINGS")
        return ArrayOfStrings.join(" ");
      });
      // console.log(newNames, "NEW NAMES")
      data.push(newNames);
      values.map(entry => data.push(entry));
    }
    // console.log(data, "DATA");

    return (
      <div id="example-component">
        <FileSelector />
        <HotTable
          root="hot"
          settings={{
            data: data,
            colHeaders: true,
            rowHeaders: true,
            onAfterChange: (listRed, source) => {
              if (source !== "loadData") {
                let payload = {
                  id: listRed.length,
                  row: listRed[0][0],
                  column: listRed[0][1],
                  oldValue: listRed[0][2],
                  newValue: listRed[0][3]
                };
                const name = columnNames[payload.column];
                const value = payload.newValue;
                const newPayload = { [name]: value };
                this.props.changeCell(payload.row + 1, newPayload);
                // console.log(payload.row + 1, "ID");
                // console.log(newPayload, "Payload");
              }
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ listRed, databases, csv }) => ({
  listRed: fetchAllData(),
  databases,
  csv,
  changes: changes(databases, csv)
});

export default connect(
  mapStateToProps,
  { changeCell, fetchAllData, fetchUpdates }
)(List);
