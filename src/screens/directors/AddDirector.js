import React, { useState, useEffect } from "react";
import AddForm from "../../components/Form";
import { useParams } from "react-router-dom";
import axios from "axios";
import icons from "../../constants/icons";
import PersonModel from "../../services/PersonModel";
import DirectorModel from "../../services/DirectorModel";
import { useNavigate } from "react-router-dom";
import API from "../../constants/API";


function AddDirector() {
    const navigate = useNavigate();
    const { option } = useParams();
    const [directors, setDirectors] = useState([])
    const [persons, setPersons] = useState([])
    const [personQuantity, setPersonQuantity] = useState([]);
    const [newDirector, setNewDirector] = useState([{ id: 0, personID: '' }])
    useEffect(() => {
        PersonModel.getListPerson().then((res) => {
            if (res.data.error == 1) {
                setPersons(res.data.data)
            }
        })
        DirectorModel.getListDirector().then((res) => {
            if (res.data.error == 1) {
                setDirectors(res.data.data)
            }
        })
    }, [])
    const onChange = (e) => {
        let [id, personID] = e.target.name.split('-')
        let newDirectorTemp = [...newDirector]
        let item = newDirector.find(person => person.personID == e.target.value)
        if (item == undefined) {
            newDirectorTemp.map((director, index) => {
                if (director.id == id) {
                    newDirectorTemp[index].personID = parseInt(e.target.value)
                    setNewDirector(newDirectorTemp)
                }
            })
        }
    }
    const onDeletePerson = (e) => {
        let data = parseInt(e.target.getAttribute('dataname'))
        let newDirectorTemp = [...newDirector]
        newDirectorTemp.map((director, index) => {
            if (director.id == data) {
                newDirectorTemp.splice(index, 1)
                setNewDirector(newDirectorTemp)
            }
        })
    }
    const handleAdd = (e) => {
        if (
            newDirector.find(director => director.personID == '') != undefined
        ) {
            alert('Vui lòng chọn đạo diễn')
        } else {
            let data = []
            newDirector.map((director, index) => {
                data.push({ personID: director.personID })
            })
            DirectorModel.addDirector(data).then((res) => {
                if (res.data.error == 1) {
                    alert('Thêm thành công')
                    navigate('/admin/directors')
                } else {
                    alert('Thêm thất bại')
                }
            })
        }
    }
    return (
        option === "person" ?
            <div>
                <div className="title my-2">
                    <div className="categories my-2">
                        <div className="title my-2 primary-text-color text-center fw-bold text-uppercase secondary-bg-color p-1 rounded-2 w-25">
                            Thêm đạo diễn
                        </div>
                        <div>
                            <div className="form-group col row row-cols-md-2 row-cols-lg-3 my-1">
                                {
                                    newDirector.map((director, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="d-flex my-2"
                                            >
                                                <select
                                                    className="form-control"
                                                    name={director.id + "-" + director.personID}
                                                    onChange={onChange}
                                                    value={
                                                        newDirector[index] ? newDirector[index].personID : ''
                                                    }
                                                >
                                                    <option value={''}>Chọn người</option>
                                                    {
                                                        persons.map((person, index) => {
                                                            return (
                                                                directors.find(director => director.id == person.id) == undefined ? <option key={index} value={person.id}>{person.fname} {person.lname}</option> : ""
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {
                                                    newDirector.length > 1 && index != 0 ?
                                                        <button
                                                            className="position-relative 
                                                            btn btn-danger 
                                                            rounded-circle 
                                                            d-flex 
                                                            mx-2
                                                            justify-content-center 
                                                            align-items-center"
                                                            type="button"
                                                            onClick={onDeletePerson}
                                                            style={{
                                                                width: "30px",
                                                                height: "30px",
                                                            }}
                                                        >
                                                            <img
                                                                dataname={director.id}
                                                                src={icons.Close}
                                                                alt="icon-close"
                                                                width={30}
                                                                height={30}
                                                            />
                                                        </button>
                                                        : ""
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setNewDirector([...newDirector, { id: newDirector[newDirector.length - 1].id + 1, personID: '' }])
                                }}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className="title my-2">
                    <div className="form-group">

                    </div>
                </div>
                <div className="group-button my-2">
                    <button onClick={handleAdd} className="btn btn-primary">Thêm</button>
                </div>
            </div>
            : <AddForm.FAddPerson content={"directors"} />
    )
}

export default AddDirector;