import React, { useState, useEffect } from 'react'
import { getDatabase, ref, onValue, child, get, set } from "firebase/database";
import {app} from "../firebase.js"
import { useNavigate, useParams, Link } from 'react-router-dom';
import "./View.css"

const db = getDatabase(app);
const dbRef = ref(db);

function View() {

    const [user, setUser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        get(child(dbRef, 'contacts/' + id)).then((snapshot) => {
            if (snapshot.exists()) {
                setUser({ ...snapshot.val() })
            } else {
                setUser({});
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [id])

    console.log("user", user);

    return (
        <div style={{ marginTop: "150px" }}>
            <div className="card">
                <div className="card-header">
                    <p>User Contact Detail</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Name:</strong>
                    <span>{user.name}</span>
                    <br />
                    <br />
                    <strong>Email:</strong>
                    <span>{user.email}</span>
                    <br />
                    <br />
                    <strong>Age:</strong>
                    <span>{user.age}</span>
                    <br />
                    <br />
                    <strong>Gender:</strong>
                    <span>{user.gender}</span>
                    <br />
                    <br />
                    <strong>City:</strong>
                    <span>{user.city}</span>
                    <br />
                    <br />
                    <Link to="/">
                        <button className='btn btn-edit'>Go Back</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default View