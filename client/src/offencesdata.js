import { useState, useEffect } from 'react';
import React from 'react';
import ReactTable from 'react-table'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import 'react-table/react-table.css'
import './App.css'
import {
    fetchOffences
} from './fetchoffences'

export function OffencesPage() {
    const [offences, setOffences] = useState([""])

    useEffect(() => {
        fetchOffences(setOffences)
    }, []);

    const data = []
    offences.map((offence) => {
        data.push({ o: offence })
    })

    return (
        
        <div className="OffencesPage">

            <Row>
                <Col>
                    <h1>Browse Offences</h1>
                    <br/>
                </Col>
            </Row>

            <ReactTable
                data={data}
                noDataText="No entries found."
                columns={[
                            {
                                Header: "Offences",
                                accessor: 'o'
                            }
                        ] 
                }
                defaultPageSize={10}
                className="-striped -highlight"
            />
            <br />
        </div>
    )
}