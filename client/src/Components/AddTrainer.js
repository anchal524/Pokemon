import {useState} from "react";
import {useDispatch} from "react-redux";
import actions from "../actions";

function AddTrainer() {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({name: ""});

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };
    const addTrainer = () => {
        dispatch(actions.addTrainer(formData.name));
        document.getElementById("name").value = "";
    };

    return (
        <div className='add'>
            <div className='input-selection'>
                <label>
                    Trainer:
                    <input
                        onChange={(e) => handleChange(e)}
                        id='name'
                        name='name'
                        placeholder='Trainer name...'
                    />
                </label>
            </div>
            <button className='button1' onClick={addTrainer}>
                Add Trainer
            </button>
        </div>
    );
}

export default AddTrainer;
