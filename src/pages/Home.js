import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { app } from "../context/Firebase";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useFirebase } from '../context/Firebase.jsx';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import { onAuthStateChanged } from "firebase/auth";
import '../css/Home.css';

const db = getDatabase(app);
const dbRef = ref(db);

var uid = "";
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;

    } else {
    }
});


function Home() {

    const [data, setData] = useState({});
    const navigate = useNavigate();
    const firebase = useFirebase();
    const auth = getAuth();

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [firebase, navigate])

    useEffect(() => {
        get(child(dbRef, `content/${uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                setData({ ...snapshot.val() });
                console.log(data);
            } else {
                console.log("No data available");
                setData({});
            }
        }).catch((error) => {
            console.error(error);
        },[]);


        return () => {
            setData({});
        };
    }, []);

    const onDelete = async (id) => {
        if (window.confirm("Are you sure that you wanted to delete that record ? ")) {
            set(ref(db, `content/${uid}/${id}`), {
            }).then(() => {
                toast.success("Deleted Successfully!");
                navigate("/login");
            }).catch((error) => {
                toast.error(error);
            });
        }
    }

    const handleLogOut = () => {
        signOut(auth).then(() => {
            navigate('/login')
        }).catch((error) => {
        })
    }

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/');
        }
    }, [firebase, navigate])

    return (
        <>

            <Header></Header>
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

                            return (
                                <tr key={id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data[id].name}</td>
                                    <td>{data[id].email}</td>
                                    <td>{data[id].age}</td>
                                    <td>{data[id].gender}</td>
                                    <td>{data[id].city}</td>
                                    <td id="options">
                                        <Link to={`/update/${uid}/${id}`}>
                                            <button className='btn btn-edit'>Edit</button>
                                        </Link>
                                        <button className='btn btn-delete' onClick={() => onDelete(id)} >Delete</button>
                                        <Link to={`/view/${uid}/${id}`}>
                                            <button className='btn btn-view' >View</button>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="btn-logout">
                    <Button onClick={handleLogOut} className='button-logout'>LogOut</Button>
                </div>
            </div>
        </>
    )
}

export default Home