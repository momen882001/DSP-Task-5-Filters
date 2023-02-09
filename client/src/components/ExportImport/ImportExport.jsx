import React, { Component} from 'react';
import { CSVLink } from "react-csv";
import './ImportExport.css'
import { FileContext } from '../contexts/fileContext'
// import CSVReader from "react-csv-reader";

// const handleForce = (data, fileInfo) => console.log(data, fileInfo);



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
   
    processCSV = (str, delim=',') => {
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

    this.context.setCsvArray(newArray)
    }

    submit = () => {
    const file = this.context.csvFile;
    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        console.log(text);
    }

    reader.readAsText(file);
    }
  // papaparseOptions = {
  //   header: true,
  //   dynamicTyping: true,
  //   skipEmptyLines: true,
  //   transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
  //   complete: function(results, file) {
  //     this.setPointList(results.data)
  //   }
  // };

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


        <form id='csv-form'>
        <input
            type='file'
            accept='.csv'
            id='csvFile'
            onChange={(e) => {
                this.context.setCsvFile(e.target.files[0])
            }}
        >
        </input>
        <br/>
        <button
            onClick={(e) => {
                e.preventDefault()
                if(this.context.csvFile)this.submit()
            }}
        >
            Submit
        </button>
        <br/>
        <br/>
        {(this.context.csvArray).length>0 ? 
        <>
            <table>
                <thead>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Rank</th>
                </thead>
                <tbody>
                    {
                        this.context.csvArray.map((item, i) => (
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.rank}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </> : null}
      </form>

      </div>      
    );
  }
}

export default ImportExport;