import React, { useState, useEffect } from "react";
import AddForm from "../../components/Form";
import { useParams, useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import PersonModel from "../../services/PersonModel";
import ActorModel from "../../services/ActorModel";


function AddActor() {
    const { option } = useParams();
    const navigate = useNavigate();
    const [actors, setActors] = useState([])
    const [persons, setPersons] = useState([])
    const [personQuantity, setPersonQuantity] = useState([]);
    const [newActor, setNewActor] = useState([{ id: 0, personID: '' }])
    useEffect(() => {
        PersonModel.getListPerson().then((res) => {
            if (res.data.error == 1) {
                setPersons(res.data.data)
            }
        })
        ActorModel.getListActor().then((res) => {
            if (res.data.error == 1) {
                setActors(res.data.data)
            }
        })
    }, [])
    const onChange = (e) => {
        let [id, personID] = e.target.name.split('-')
        let newActorTemp = [...newActor]
        let item = newActor.find(person => person.personID == e.target.value)
        if (item == undefined) {
            newActorTemp.map((actor, index) => {
                if (actor.id == id) {
                    newActorTemp[index].personID = parseInt(e.target.value)
                    setNewActor(newActorTemp)
                }
            })
        }
    }
    const onDeletePerson = (e) => {
        let data = parseInt(e.target.getAttribute('dataname'))
        let newActorTemp = [...newActor]
        newActorTemp.map((actor, index) => {
            if (actor.id == data) {
                newActorTemp.splice(index, 1)
                setNewActor(newActorTemp)
            }
        })
    }
    const handleAdd = (e) => {
        if (
            newActor.find(actor => actor.personID == '') != undefined
        ) {
            alert('Vui lòng chọn đạo diễn')
        } else {
            let data = []
            newActor.map((actor, index) => {
                data.push({ personID: actor.personID })
            })
            ActorModel.addActor(data).then((res) => {
                if (res.data.error == 1) {
                    alert('Thêm thành công')
                    navigate('/admin/actors')
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
                            Thêm diễn viên
                        </div>
                        <div>
                            <div className="form-group col row row-cols-md-2 row-cols-lg-3 my-1">
                                {
                                    newActor.map((actor, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="d-flex my-2"
                                            >
                                                <select
                                                    className="form-control"
                                                    name={actor.id + "-" + actor.personID}
                                                    onChange={onChange}
                                                    value={
                                                        newActor[index] ? newActor[index].personID : ''
                                                    }
                                                >
                                                    <option value={''}>Chọn người</option>
                                                    {
                                                        persons.map((person, index) => {
                                                            return (
                                                                actors.find(actor => actor.personID == person.id) == undefined ? <option key={index} value={person.id}>{person.fname} {person.lname}</option> : ""
                                                            )
                                                        })
                                                    }
                                                </select>
                                                {
                                                    newActor.length > 1 && index != 0 ?
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
                                                                dataname={actor.id}
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
                                    setNewActor([...newActor, { id: newActor[newActor.length - 1].id + 1, personID: '' }])
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
            : <AddForm.FAddPerson content={"actors"} />
    )
}

export default AddActor;