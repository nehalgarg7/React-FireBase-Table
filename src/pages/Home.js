import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDatabase, ref, onValue, child, get, set } from "firebase/database";
import { app } from "../firebase";
import "./Home.css"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const db = getDatabase(app);
const dbRef = ref(db);

// const tableref = ref(db, 'contacts');
// console.log(tableref);

function Home() {

    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        get(child(dbRef, 'contacts')).then((snapshot) => {
            if (snapshot.exists()) {
                setData({ ...snapshot.val() });
            } else {
                console.log("No data available");
                setData({});
            }
        }).catch((error) => {
            console.error(error);
        });


        return () => {
            setData({});
        };
    }, []);


    const onDelete = (id) => {
        if (window.confirm("Are you sure that you wanted to delete that record ? ")) {
            set(ref(db, `contacts/${id}`),{              
            }).then(() => {
                toast.success("Deleted Successfully");
            }).then(() => { navigate('/');}).catch((error) => {
                toast.error(error);
            });
        }
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Age</th>
                        <th style={{ textAlign: "center" }}>Gender</th>
                        <th style={{ textAlign: "center" }}>City</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map((id, index) => {
                        // console.log("Hi"+ id);
                        return (
                            <tr key={id}>
                                <th scope="row">{index + 1}</th>
                                <td>{data[id].name}</td>
                                <td>{data[id].email}</td>
                                <td>{data[id].age}</td>
                                <td>{data[id].gender}</td>
                                <td>{data[id].city}</td>
                                <td>
                                    <Link to={`/update/${id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={() => onDelete(id)} >Delete</button>
                                    <Link to={`/view/${id}`}>
                                        <button className='btn btn-view' >View</button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Home