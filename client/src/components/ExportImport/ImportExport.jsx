import React, { Component} from 'react';
import { CSVLink } from "react-csv";
import './ImportExport.css'
import { FileContext } from '../contexts/fileContext'
import CSVReader from "react-csv-reader";

const handleForce = (data, fileInfo) => console.log(data, fileInfo);



// set the CSV headers
const headers = [
  { label: "y", key: "y" },
  { label: "x", key: "x" },
  { label: "mode", key: "mode" },
];

//Implement the import/export class
class ImportExport extends Component {

  static contextType = FileContext

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.csvLinkEl = React.createRef();
  }

  // get the filter data from the unit circle
  getUserList = () => {
    return this.context.pointsList;
      }

  // download the csv file action
  downloadFilter = async () => {
    const data = await this.getUserList();
    this.setState({ data: data }, () => {
      setTimeout(() => {
        this.csvLinkEl.current.link.click();
      });
    });
  }
   
  papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
    complete: function(results, file) {
      this.setPointList(results.data)
    }
  };

  render() {
    const { data } = this.state;
    return (
      <div>

        <input 
        type="button" 
        value="Export Filter" 
        onClick={this.downloadFilter} 
        />

        <CSVLink
          headers={headers}
          filename="Filter.csv"
          data={data}
          ref={this.csvLinkEl}
        />

        <div className="container">
        <CSVReader
          cssClass="react-csv-input"
          label="Select Filter"
          onFileLoaded={handleForce}
          parserOptions={this.papaparseOptions}
        />
      </div>
      </div>      
    );
  }
}

export default ImportExport;