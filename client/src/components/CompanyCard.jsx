import '../App.css'
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const CompanyCard = () => {

    const [name, setName] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [foundedDate, setFoundedDate] = useState("")

    const [companyList, setCompanyList] = useState([])
    const [newName, setNewName] = useState("")
    const [newState, setNewState] = useState("")
    const [newCity, setNewCity] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [newFoundedDate, setNewFoundedDate] = useState("")

    const [showForm, setShowForm] = useState(false)
    const [open, setOpen] = useState(0)
    const [editMode, setEditMode] = useState(0)
    const [addFounderMode, setAddFounderMode] = useState(0)
    const [newFounder, setNewFounder] = useState("")
    const [founderPosition, setFounderPosition] = useState("")
    console.log('SHOWFORM', showForm)



    const handleClickOpen = (value) => {
        setOpen(value)
    }

    const handleClose = () => {
        setOpen(false);
    }

    // const resetStateToDefault = () => {
    //     setName("")
    //     setState("")
    //     setCity("")
    //     setFoundedDate("")
    //     setDescription("")
    // }

    const openEditMode = (value) => {
        setEditMode(value)
        console.log('VALUE', value)
        let editingItem = companyList.find(company => {
            console.log('COMPANY', company)
            return company.id === value;
        })
        console.log('EDITING ITEM', editingItem)

        setNewName(editingItem.name)
        setNewState(editingItem.state)
        setNewCity(editingItem.city)
        setNewFoundedDate(editingItem.foundedDate)
        setNewDescription(editingItem.description)
        setNewFounder(editingItem.newFounder)
        setFounderPosition(editingItem.founderPosition)
    }

    const closeEditMode = (value) => {
        setEditMode(0)
        setName("")
    }

    const openFounderTextField = (value) => {
        console.log('OPEN TEXT FIELD', value)
        setAddFounderMode(value)

    }

    const closeFounderTextField = () => {
        setAddFounderMode(0)
        setNewFounder("")
        setFounderPosition("")
    }

    const addCompany = () => {
        console.log('HELLO', { name, state, city, foundedDate, description })
        const defaultState = "";
        setShowForm(true);
        axios.post('http://localhost:3001/create', {
            name: name,
            state: state,
            city: city,
            foundedDate: foundedDate,
            description: description,
            newFounder: "",
            founderPosition: ""
        }).then((result) => {
            console.log('RESULT', result)
            setCompanyList([
                ...companyList,
                {

                    name: name,
                    state: state,
                    city: city,
                    foundedDate: foundedDate,
                    description: description
                },
            ])
            setName(defaultState)
            setState(defaultState)
            setCity(defaultState)
            setDescription(defaultState)
            setFoundedDate(defaultState)
        })
    }

    const addFounder = (id) => {
        console.log('ID', id)
        console.log('NEWFOUNDER', { newFounder, founderPosition })
        axios.put(`http://localhost:3001/addFounder`, { newFounder: newFounder, founderPosition: founderPosition, id: id }).then((response) => {
            console.log('RESPONSE', response)
            setCompanyList(
                companyList.map((val) => {

                    return val.id === id
                        ? {
                            id: val.id,
                            name: newName ? newName : val.name,
                            state: newState ? newState : val.state,
                            city: newCity ? newCity : val.city,
                            foundedDate: newFoundedDate ? newFoundedDate : val.foundedDate,
                            description: newDescription ? newDescription : val.description,
                            newFounder: newFounder ? newFounder : val.newFounder,
                            founderPosition: founderPosition ? founderPosition : val.founderPosition
                        }
                        : val;
                })
            )
        })
        setAddFounderMode(0)
        setOpen(false)
        console.log('COMPANY LIST', companyList)

    }

    const getCompanies = () => {
        axios.get('http://localhost:3001/companies').then((response) => {
            console.log('SUCCESS', response)
            setCompanyList(response.data)

        })
    }

    const updateCompany = (id) => { // Try and make it so you can update the whole card with this one function
        console.log('UPDATE COMPANY FUNCTION', id)
        console.log('STATE', { name, state, city, foundedDate, description })
        console.log('NEW STATE', { newName, newState, newCity, newFoundedDate, newDescription })
        axios.put('http://localhost:3001/update', { name: newName, state: newState, city: newCity, foundedDate: newFoundedDate, description: newDescription, newFounder: newFounder, founderPosition: founderPosition, id: id }).then((response) => {
            setCompanyList(
                companyList.map((val) => {
                    console.log('VAL UPDATE', val)
                    return val.id === id
                        ? {
                            id: val.id,
                            name: newName ? newName : val.name,
                            state: newState ? newState : val.state,
                            city: newCity ? newCity : val.city,
                            foundedDate: newFoundedDate ? newFoundedDate : val.foundedDate,
                            description: newDescription ? newDescription : val.description,
                            newFounder: newFounder ? newFounder : val.newFounder,
                            founderPosition: founderPosition ? founderPosition : val.founderPosition
                        }
                        : val;
                })
            )
            console.log('COMPANY LIST UPDATE COMPANY', companyList)
            setEditMode(0)
            setOpen(false)
            setNewName("")
            setNewState("")
            setNewCity("")
            setNewDescription("")
            setNewFoundedDate("")
        })
    }

    const deleteCompany = (id) => {
        console.log('ID', id)
        axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
            console.log('RESPONSE', response)
            setCompanyList(
                companyList.filter((val) => {
                    return val.id !== id;
                })
            )
        })
    }


    const renderCompanies = () => {
        return (
            <div className="App">
                {/* <CreateNewCompany /> */}

                <div className="companies" title="companies-card">
                    <Button variant="outlined" color="primary" onClick={getCompanies}>Get List of Companies</Button>
                    {companyList.map((val, key) => {
                        // console.log('VAL', val)
                        // console.log('KEY', key)
                        return (
                            <Card className="company" >
                                <div>
                                    <h3>Company Name: {val.name}</h3>
                                    <h3>City: {val.city}</h3>
                                    <h3>State: {val.state}</h3>
                                    <h3>Description: {val.description}</h3>
                                    {/* <h3>Founders: {val.founder ? val.founder :
                                        <div>
                                            <input type="text" onChange={(event) => {
                                                setFounder(event.target.value)
                                            }} />
                                            <Button variant="outlined" size="small" onClick={() => (addFounder(val.id))}>Add Founder</Button>
                                        </div>
                                    }</h3> */}

                                </div>
                                <Button onClick={() => handleClickOpen(val.id)}>More...</Button>
                                <Dialog
                                    open={open === val.id}
                                    onClose={() => handleClose(val.id)}
                                >
                                    <DialogTitle className="dialog-title">{val.name}</DialogTitle>
                                    <DialogContent>

                                        {editMode ? null : <div className="dialog-content">
                                            <div className="founding-date-location">
                                                <div className="founded-date">{val.foundedDate}</div> <div className="location"> {val.city}, {val.state}</div>
                                            </div>
                                            <div className="description">
                                                {val.description}
                                            </div>
                                            <div className="founder-container">Founder
                                            {val.newFounder === "" || newFounder === "" ? null
                                                    :
                                                    <div className="founders-section">
                                                        {val.newFounder}&nbsp;&nbsp;{val.founderPosition}
                                                    </div>
                                                }

                                            </div>
                                            {addFounderMode ? (
                                                <div>
                                                    <TextField variant="outlined" label="Founder" onChange={(event) => {
                                                        setNewFounder(event.target.value)
                                                    }}>Founder</TextField>
                                                    <TextField variant="outlined" label="Position" onChange={(event) => {
                                                        setFounderPosition(event.target.value)
                                                    }}>Position</TextField>
                                                    <Button variant='outlined' color="primary" size="medium" onClick={() => (addFounder(val.id))}>Save</Button>
                                                    <Button variant='outlined' color="primary" size="medium" onClick={() => (closeFounderTextField())}>Cancel</Button>
                                                </div>)
                                                :
                                                (<div>
                                                    <Button variant='outlined' color="primary" size="medium" onClick={() => (openFounderTextField(val.id))}>Add Founder</Button>
                                                </div>)

                                            }
                                            <div className="edit-delete-buttons">
                                                <Button variant="outlined" color="primary" size="small" onClick={() => (openEditMode(val.id))}>Edit</Button>
                                                <Button variant="contained" color="secondary" size="small" onClick={() => (deleteCompany(val.id))}>Delete</Button>
                                            </div>


                                        </div>}

                                        {editMode ? (<div className="dialog-content">
                                            <TextField className="title" variant="outlined" label="Company Name" defaultValue={val.name} onChange={(event) => {
                                                console.log('EVENT UPDATE', event.target.value);
                                                setNewName(event.target.value ? event.target.value : val.name)
                                            }} />
                                            <div className="founding-date-location">
                                                <TextField className="founded-date" variant="outlined" label="Founded Date" defaultValue={val.foundedDate} onChange={(event) => {
                                                    console.log('EVENT UPDATE', event.target.value);
                                                    setNewFoundedDate(event.target.value ? event.target.value : val.foundedDate)
                                                }} /> <TextField className="location" variant="outlined" label="State" defaultValue={val.state} onChange={(event) => {
                                                    console.log('EVENT UPDATE', event.target.value);
                                                    setNewState(event.target.value ? event.target.value : val.state)
                                                }} /> <TextField className="location" variant="outlined" label="City" defaultValue={val.city} onChange={(event) => {
                                                    console.log('EVENT UPDATE', event.target.value);
                                                    setNewCity(event.target.value ? event.target.value : val.city)
                                                }} />
                                            </div>
                                            <TextField className="description" variant="outlined" label="Description" defaultValue={val.description} fullWidth onChange={(event) => {
                                                console.log('EVENT UPDATE', event.target.value);
                                                setNewDescription(event.target.value ? event.target.value : val.description)
                                            }} />
                                            {val.newFounder === "" ? null
                                                : <div className="founder-founder-position">
                                                    <TextField variant="outlined" label="Founder" defaultValue={val.newFounder} onChange={(event) => {
                                                        setNewFounder(event.target.value ? event.target.value : val.newFounder)
                                                    }} />
                                                    <TextField variant="outlined" label="Position" defaultValue={val.founderPosition} onChange={(event) => {
                                                        setFounderPosition(event.target.value ? event.target.value : val.founderPosition)
                                                    }} />
                                                </div>
                                            }

                                            <div className="save-cancel-button">
                                                <Button variant="outlined" color="primary" size="small" onClick={() => (updateCompany(val.id))}>Save</Button>
                                                <Button variant="contained" color="secondary" size="small" onClick={() => (closeEditMode(val.id))}>Cancel</Button>
                                            </div>
                                        </div>

                                        ) : null}

                                    </DialogContent>
                                </Dialog>
                                {/* <div>
                                    {" "}
                                    <input type="text" onChange={(event) => {
                                        setNewName(event.target.value)
                                    }}
                                    />
                                    <Button variant="outlined" color="primary" size="small" onClick={() => (updateCompany(val.id))}>Edit</Button>

                                    <Button variant="contained" color="secondary" size="small" onClick={() => (deleteCompany(val.id))}>Delete</Button>
                                </div> */}
                            </Card>

                        )
                    })}
                </div>
                {
                    showForm ? null : (<Card className="new-company-container">
                        <form className="form">
                            <TextField label="Company Name" variant="outlined" fullWidth required onChange={(event) => {
                                console.log('EVENT', event.target.value)
                                setName(event.target.value);
                            }} />
                            <TextField label="State" variant="outlined" required onChange={(event) => {
                                setState(event.target.value);
                            }} />
                            <TextField label="City" variant="outlined" required onChange={(event) => {
                                setCity(event.target.value);
                            }} />
                            <TextField label="Founded Date" variant="outlined" onChange={(event) => {
                                setFoundedDate(event.target.value);
                            }} />
                            <TextField label="Company Description" variant="outlined" fullWidth multiLine required onChange={(event) => {
                                setDescription(event.target.value);
                            }} />

                            <Button variant="outlined" color="primary" onClick={addCompany}>Save Company</Button>
                        </form>
                    </Card>)
                }
                {
                    showForm ? <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>Add Company</Button>
                        :
                        <Button variant="contained" color="primary" onClick={() => setShowForm(!showForm)}>Cancel</Button>
                }

            </div>
        )
    }

    return (
        <div className="company-card">
            {renderCompanies()}
        </div>
    )
}

export default CompanyCard;