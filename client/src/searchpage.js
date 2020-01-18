import Button from 'react-bootstrap/Button'
import React, { useState, useEffect } from 'react';
import { 
    fetchOffences, 
    fetchAges, 
    fetchAreas, 
    fetchGenders, 
    fetchYears, 
    searchButton
} from './fetchoffences'
import './App.css'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ReactTable from 'react-table'
import GoogleMapReact from 'google-map-react';
import {BarChart, Bar, Tooltip, XAxis, YAxis} from 'recharts'
import 'react-table/react-table.css'

export function SearchPage() {
    const [offences, setOffences] = useState([""])
    const [areas, setAreas] = useState([""])
    const [ages, setAges] = useState([""])
    const [years, setYears] = useState([""])
    const [genders, setGenders] = useState([""])
    const [searchOffence, setSearchOffence] = useState("")
    const [searchArea, setSearchArea] = useState("")
    const [searchAge, setSearchAge] = useState("")
    const [searchYear, setSearchYear] = useState("")
    const [searchGender, setSearchGender] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        fetchOffences(setOffences)
        fetchAreas(setAreas)
        fetchAges(setAges)
        fetchYears(setYears)
        fetchGenders(setGenders)
    }, []);

    let lats = []
    let lngs = []
    let totals = []
    let names = []
    let markers = [];

    useEffect(() => {
        for (let i = 0; i < data.length; i++){
            lats.push(data[i].lat)
            lngs.push(data[i].lng)
            totals.push(data[i].total)
            names.push(data[i].LGA)
        }
        makeMarkers();
        console.log(data)
    }, [data]);

    const Marker = ({ text }) => (
        <div style={{
            color: 'white',
            background: 'grey',
            padding: '20px 20px',
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)'
        }}>
            {text}
        </div>
    );

      var defaultProps = {
        center: {
            lat: -27.492509,
            lng: 153
        },
        zoom: 5
    };

    function makeMarkers(){
        for (let i = 0; i < data.length; i++){
            markers.push( <Marker
                name={names[i]}
                total={totals[i]}
                lat={lats[i]}
                lng={lngs[i]}
                text={data[i].LGA
                    + '\n'
                    + 'Total: ' + totals[i]
                    + '\n'
                    + 'LAT: ' + lats[i]
                    + '\n' 
                    + 'LNG: ' + lngs[i]
                }
            />)
        }
    }

    return (
        <div className="SearchPage">

            <>
                <style type="text/css">
                    {`
            .btn-flat{
                background-color: #1D2731;
                color: white;
            }
            `}
                </style>
            </>
                <Row>
                    <Col>
                    <h1>Search API Records</h1>
                    <p>
                        Select offences from the dropdowns then click search to return results.
                        <br />
                        Click the button to reset your search parameter!
                    </p>
                    </Col>
                </Row>
            <Row>
                    <Col xs={{ span: 2}}>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="flat" onClick={() => {
                            setSearchOffence('')
                        }}>Offence</Button>
                        <Dropdown.Toggle split variant="flat" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            {offences.map((offence, key) => (
                                <Dropdown.Item key={key} onSelect={() => {
                                    setSearchOffence(offences[key])
                                }}>{offence}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            
                <Col xs={{ span: 2 }}>
                        <Dropdown as={ButtonGroup}>
                        <Button variant="flat" onClick={() => {
                            setSearchArea('')
                        }}>Area</Button>
                            <Dropdown.Toggle split variant="flat" id="dropdown-split-basic" />
                            <Dropdown.Menu>
                                {areas.map((area, key) => (
                                    <Dropdown.Item key={key} onSelect={() => {
                                        setSearchArea(areas[key])
                                    }}>{area}</Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                <Col xs={{ span: 2 }}>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="flat" onClick={() => {
                            setSearchAge('')
                        }}>Age</Button>
                        <Dropdown.Toggle split variant="flat" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            {ages.map((age, key) => (
                                <Dropdown.Item key={key} onSelect={() => {
                                    setSearchAge(ages[key])
                                }}>{age}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col xs={{ span: 2 }}>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="flat" onClick={() => {
                            setSearchYear('')
                        }}>Year</Button>
                        <Dropdown.Toggle split variant="flat" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            {years.map((year, key) => (
                                <Dropdown.Item key={key} onSelect={() => {
                                    setSearchYear(years[key])
                                }}>{year}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col xs={{ span: 2 }}>
                    <Dropdown as={ButtonGroup}>
                        <Button variant="flat" onClick={() => {
                            setSearchGender('')
                        }}>Gender</Button>
                        <Dropdown.Toggle split variant="flat" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                            {genders.map((gender, key) => (
                                <Dropdown.Item key={key} onSelect={() => {
                                    setSearchGender(genders[key])
                                }}>{gender}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>

                <Col xs={{ span: 2 }}>
                    <Button active drop="down" variant="flat" size="lg" onClick={() => {
                        searchButton(searchOffence, searchArea, searchAge, searchYear, searchGender, setData)
                    }}>Search</Button>
                </Col>
                
            </Row>
            <br/>
            <h3>
                Returning Results For: {searchOffence}
                <br />
                <br />
                In: {searchArea}
                <br />
                <br />
                Of Age: {searchAge} 
                <br />
                <br />
                In: {searchYear}     
                <br />
                <br />
                By A: {searchGender} 
            </h3>

            <ReactTable
                data={data}
                noDataText="No entries found."
                columns={[
                    {
                        Header: "Area",
                        accessor: 'LGA'
                    },
                    {
                        Header: "Total",
                        accessor: 'total'
                    },
                    {
                        Header: "Latitude",
                        accessor: 'lat'
                    },                    
                    {
                        Header: "Longitude",
                        accessor: 'lng'
                    },
                ]
                }
                defaultPageSize={10}
                className="-striped -highlight"
            />
            <br />
            <h1>Offences Mapping</h1>
            <h5>Search to map locations.</h5>
            <br />
                
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBnNrFXOpm47qui_hp7RStdmB0d10KllVY"}}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >

                {markers}

                </GoogleMapReact>
            </div>

            <br />
            <h1>Offences Graphing</h1>
            <h5>Search to graph totals.</h5>
            <h5>Hover over bars to reveal more information!</h5>
            <br />

            <h5>Offence Searched: {searchOffence}</h5>

                <Col xs={{span: 1}}>
            <BarChart width={1500} height={400} data={data}>
                <XAxis dataKey="name" stroke="WHITE" color="WHITE"/>
                <YAxis stroke="WHITE"/>
                <Tooltip />
                <Bar dataKey="LGA" fill="#8884d8"/>
                <Bar dataKey="total" fill="#82ca9d" />
                <Bar dataKey="year" fill="#89ca9d" />
            </BarChart>
            </Col>

            </div>
)}