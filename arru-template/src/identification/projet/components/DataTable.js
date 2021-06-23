import React, { Component } from 'react';
import ReactDatatable from '@ashvin27/react-datatable';
import records from './data.json';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                key: "name",
                text: "Name",
                className: "name",
                sortable: true
            },
            {
                key: "address",
                text: "Address",
                sortable: true
            },
            {
                key: "postcode",
                text: "Postcode",
                className: "postcode",
                sortable: true
            },
            {
                key: "rating",
                text: "Rating",
                className: "rating",
                sortable: true
            },
            {
                key: "type_of_food",
                text: "Type of Food",
                className: "type_of_food",
                sortable: true
            },
            {
                key: "action",
                text: "Action",
                cell: (record, index) => {
                    return (
                        <React.Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={this.editRecord.bind(this, record, index)}
                                style={{marginRight: '5px'}}>
                                    Edit
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={this.deleteRecord.bind(this, record, index)}>
                                    Delete
                            </button>
                        </React.Fragment>
                    );
                }
            }
        ];
        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            filename: "restaurents",
            button: {
                excel: true,
                print: true,
                csv: true
            }
        }
        this.state = {
            records: records
        }
    }

    editRecord = (record, index) => {
        console.log("Edit record", index, record);
    }

    deleteRecord = (record, index) => {
        console.log("Delete record", index, record);
    }

    render() {
        return (
            <ReactDatatable
                config={this.config}
                records={this.state.records}
                columns={this.columns}/>
        );
    }
}

export default DataTable;