import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import "./AddEdit.css";
// import fireDb from "../firebase";
import { app } from "../firebase";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";

//RealTime - Database Connection
const db = getDatabase(app);
const dbRef = ref(db);


const initialState = {
    name: "",
    email: "",
    age: "",
    gender: "",
    city: ""
}





function AddEdit() {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const { name, email, age, gender, city } = state;

    //check here
    const navigate = useNavigate();

    const { id } = useParams();
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
    }, [id]);

    useEffect(() => {
        if (id) {
            setState({ ...data[id] })
        }
        else {
            setState({ ...initialState })
        }

        return () => {
            setState({ ...initialState })
        }

    }, [id, data])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // set(ref(db, 'contacts/nehal'),{
        //     id: 1,
        //     name: "Piyush",
        //     age: 21,
        //   });

        console.log("Data Saved");
        if (!name || !email || !age || !gender || !city) {
            toast.error("Please provide value in each input field")
        }
        else {
            if (!id) {
                const newid = nanoid();
                set(ref(db, `contacts/${newid}`), {
                    name: name,
                    email: email,
                    age: age,
                    gender: gender,
                    city: city

                }).then(() => {
                    toast.success("Added Successfully");
                }).catch((error) => {
                    toast.error(error);
                });
            } else {
                
                set(ref(db, `contacts/${id}`), {
                    name: name,
                    email: email,
                    age: age,
                    gender: gender,
                    city: city

                }).then(() => {
                    toast.success("Updated Successfully");
                }).catch((error) => {
                    toast.error(error);
                });
            }

            setTimeout(() => navigate("/"), 500);

        }
    };


    return (
        <div style={{ marginTop: "100px" }}>
            <form action="" style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name' placeholder='Your Name' value={name || ""} onChange={handleInputChange} />

                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' placeholder='xyz@gmail.com' value={email || ""} onChange={handleInputChange} />

                <label htmlFor="age">Age</label>
                <input type='number' id='age' name='age' placeholder='Enter Your Age' value={age || ""} onChange={handleInputChange} />

                {/* Use Radio Button Here */}
                <label htmlFor="gender">Gender</label>
                <input type='text' id='gender' name='gender' placeholder='Enter Your Gender' value={gender || ""} onChange={handleInputChange} />

                {/* Use Select-Option here */}
                <label htmlFor="city">City</label>
                <input type='text' id='city' name='city' placeholder='Enter Your City' value={city || ""} onChange={handleInputChange} />

                <input type="Submit" value={id ? "Update" : "Save"} />
            </form>
        </div>
    )
}

export default AddEdit