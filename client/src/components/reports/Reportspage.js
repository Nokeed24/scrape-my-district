import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUpdates } from "../../actions/updates";
import Select from "react-select";
import "react-select/dist/react-select.css";
import Button from "@material-ui/core/Button";
import Graph from "./Graph";
import { Checkbox } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import './Reports.css'

class Reports extends Component {
  state = {
    renderAll: false,
    renderSpecific: false,
    renderSpecificColumn: false,
    renderOptions: false
  };

  componentDidMount() {
    this.props.fetchUpdates();
  }

  renderAllUpdates = () => {
    const { updates } = this.props;
    return (
      <div>
        {updates.map((update, i) => (
          <div key={`${i} ${update.company}`}>
            <h1>{update.company}</h1>
            <h2>{update.timestamp}</h2>
            <h2>{update.columnName}</h2>
            <h2>{update.change}</h2>
          </div>
        ))}
      </div>
    );
  };

  renderSpecificUpdates = company => {
    let filteredByCompany = [];
    this.props.updates.forEach(update => {
      if (update.company === company) {
        filteredByCompany.push(update);
      }
    });
    this.setState({ filtered: filteredByCompany, renderSpecific: true });
    if (this.state.column && filteredByCompany.length > 0) {
      const filteredByColumn = filteredByCompany.filter(update => {
        return update.columnName === this.state.column;
      });
      this.setState({ filtered: filteredByColumn, renderSpecific: true });
    } else if (this.state.column) {
      const filteredByColumn = this.props.updates.filter(update => {
        return update.columnName === this.state.column;
      });
      this.setState({ filtered: filteredByColumn, renderSpecific: true });
    }
  };

  getSpecificUpdates = () => {
    const updates = this.props.updates;
    let companies = [];
    let columns = [];
    updates.map(update => {
      companies.push(update.company);
      columns.push(update.columnName);
    });
    const companiesWithoutDuplicates = Array.from(new Set(companies));
    const columnsWithoutDuplicates = Array.from(new Set(columns));

    this.setState({
      companies: companiesWithoutDuplicates,
      renderOptions: true,
      columns: columnsWithoutDuplicates,
      value: companiesWithoutDuplicates[0],
      plotGraph: false
    });
  };

  setRenderAll = () => {
    this.setState({ renderAll: true });
  };

  handleCompanyChange = e => {
    if (e) {
      const value = e.value;
      this.setState({ company: value });
    } else {
      this.setState({ company: "" });
    }
  };

  handleColumnChange = e => {
    if (e) {
      const value = e.value;
      this.setState({ column: value });
    } else {
      this.setState({ column: "" });
    }
  };

  handlePlotGraph = e => {
    e.preventDefault();
    if (!this.state.plotGraph) {
      this.setState({ plotGraph: true });
    } else {
      this.setState({ plotGraph: false });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.renderSpecificUpdates(this.state.company);
  };

  companyOptionsList = () => {
    let options = [];
    this.state.companies.forEach(company => {
      options.push({ value: company, label: company });
    });
    return options;
  };

  columnsOptionsList = () => {
    let options = [];
    this.state.columns.forEach(column => {
      options.push({ value: column, label: column });
    });
    return options;
  };

  render() {
    return (
      <div>
        <Button onClick={() => this.setRenderAll()}>Fetch all updates</Button>
        <Button onClick={() => this.getSpecificUpdates()}>
          Get specific updates
        </Button>
        <Button
          onClick={() =>
            this.setState({
              renderAll: false,
              renderSpecific: false,
              filtered: null
            })
          }
        >
          Clear search
        </Button>
        {this.state.renderOptions && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>Display reports on specific companies</label>
              <Select
                name="form-field-name"
                value={this.state.company}
                onChange={this.handleCompanyChange}
                options={this.companyOptionsList()}
              />
              <Select
                name="form-field-name"
                value={this.state.column}
                onChange={this.handleColumnChange}
                options={this.columnsOptionsList()}
              />
              <Checkbox
                name="form-field-name"
                value="Plot graph"
                onChange={this.handlePlotGraph}
                checked={this.state.plotGraph}
              /> Plot Graph
              <Button type="submit" value="Submit">Submit</Button>
            </form>
            <div>
              {this.state.renderSpecific && (
                <div>
                  {this.state.column && this.state.company && this.state.filtered.length > 0 && this.state.plotGraph &&
                    <Graph data={this.state.filtered} />
                  }
                  {this.state.filtered &&
                    this.state.filtered.map((update, i) => {
                      return (
                        <Card key={`${i} ${update.company}`} className='dataCard dataList' >
                          <h1>{update.company}</h1>
                          <div className='update-card'>
                            <span>{update.timestamp.slice(0, 10)}</span>
                            <span>{update.columnName}</span>
                            <span>{update.change}</span>
                          </div>
                        </Card>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        )}
        {this.state.renderAll && this.renderAllUpdates()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    updates: state.updates
  };
};

export default connect(
  mapStateToProps,
  { fetchUpdates }
)(Reports);
