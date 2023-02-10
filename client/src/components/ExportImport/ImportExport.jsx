import React, { Component} from 'react';
import { CSVLink } from "react-csv";
import './ImportExport.css'
import { FileContext } from '../contexts/fileContext'
import * as XLSX from 'xlsx';



// set the CSV headers
const headers = [
  { label: "y", key: "y" },
  { label: "x", key: "x" },
  { label: "mode", key: "mode" },
];


//convert csv text to objects 
const processCSV = (str, delim=',') => {
  const headers = str.slice(0,str.indexOf('\n')).split(delim);
  const rows = str.slice(str.indexOf('\n')+1).split('\n');

  const newArray = rows.map( row => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
          obj[header] = values[i];
          return obj;
      }, {})
      return eachObject;
  })
  return newArray
 }



//Implement the import/export class
class ImportExport extends Component {

  static contextType = FileContext

  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
   
  handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log("gooooooo")
      console.log(data)
      const newdata =  processCSV(data);
      console.log("newdata1")
      console.log(newdata);
      console.log("oldpointlist")
      console.log(this.context.pointsList)
      this.context.setPointList(newdata);
      console.log("newpointlist")
      console.log(this.context.pointsList)
      console.log("finish")
    };
    reader.readAsBinaryString(file);
  }
 

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

        <input
            type='file'
            accept='.csv'
            id='csvFile'
            onChange={this.handleFileUpload}
        >
        </input>

      </div>      
    );
  }
}

export default ImportExport;