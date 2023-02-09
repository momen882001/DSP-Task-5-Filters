import React, { Component} from 'react';
import { CSVLink } from "react-csv";
import './ImportExport.css'
import { FileContext } from '../contexts/fileContext'




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
   


  submit = () => {
  const file = this.context.csvFile;
  const reader = new FileReader();

  reader.onload = function(e) {
      const text = e.target.result;
      console.log(text);
      // this.processCSV(text)
  }
  reader.readAsText(file);
  }


  // processCSV = (str, delim=',') => {
  //   const headers = str.slice(0,str.indexOf('\n')).split(delim);
  //   const rows = str.slice(str.indexOf('\n')+1).split('\n');

  //   const newArray = rows.map( row => {
  //       const values = row.split(delim);
  //       const eachObject = headers.reduce((obj, header, i) => {
  //           obj[header] = values[i];
  //           return obj;
  //       }, {})
  //       return eachObject;
  //   })

  //   this.context.setCsvArray(newArray)
  //   console.log(newArray);
  //   }


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
            onChange={(e) => {
                this.context.setCsvFile(e.target.files[0])
                e.preventDefault()
                if(this.context.csvFile)this.submit()
            }}
        >
        </input>

      </div>      
    );
  }
}

export default ImportExport;