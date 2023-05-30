import Trainer from "./Trainer";
import AddTrainer from "./AddTrainer";
import {useState} from "react";
import {useSelector} from "react-redux";
function TrainerList() {
    const [addBtnToggle, setBtnToggle] = useState(false);
    const allTrainers = useSelector((state) => state.trainers);
    console.log("allTrainers", allTrainers);
    return (
        <div className='trainer-wrapper'>
            <button
                className='button1'
                onClick={() => setBtnToggle(!addBtnToggle)}
            >
                Add New Trainer
            </button>
            <br />
            <br />
            <br />
            {addBtnToggle && <AddTrainer />}
            <br />
            {allTrainers.map((trainer) => {
                console.log(trainer);
                return <Trainer key={trainer.id} trainer={trainer} />;
            })}
        </div>
    );
}

export default TrainerList;
