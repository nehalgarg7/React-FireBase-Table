import React, { useState, useEffect } from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';
import { app } from '../context/Firebase';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '../css/View.css';

//RealTime - Database Connection
const db = getDatabase(app);
const dbRef = ref(db);

let uid = "";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
    } else {
    }
});


function View() {

    const [user, setUser] = useState({});

    const { uuid, id } = useParams();

    useEffect(() => {
        get(child(dbRef, `content/${uid}/` + id)).then((snapshot) => {
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
        <>
            <Header></Header>
            <div style={{ marginTop: "150px" }}>
                <div className="card">
                    <div className="card-header">
                        <p>User Contact Detail</p>
                    </div>
                    <div className="container">
                        <table className='table-view'>
                            <tr className='row-view'>
                                <td className='strong'><strong>ID:</strong></td>
                                <td className='data'>{id}</td>
                            </tr>
                            <tr>
                                <td className='strong'><strong>Name:</strong></td>
                                <td className='data'>{user.name}</td>
                            </tr>
                            <tr>
                                <td className='strong'> <strong>Email:</strong></td>
                                <td className='data'>{user.email}</td>
                            </tr>
                            <tr>
                                <td className='strong'><strong>Age:</strong></td>
                                <td className='data'>{user.age}</td>
                            </tr>
                            <tr>
                                <td className='strong'><strong>Gender:</strong></td>
                                <td className='data'>{user.gender}</td>
                            </tr>
                            <tr>
                                <td className='strong'><strong>City:</strong></td>
                                <td className='data'>{user.city}</td>
                            </tr>
                        </table>
                        <Link to="/">
                            <button className='btn btn-edit'>Go Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View;