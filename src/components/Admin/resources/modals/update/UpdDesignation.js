import React,{ useEffect, useState } from 'react'
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField'
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import InputAdornment from '@material-ui/core/InputAdornment'
import { useSelector, useDispatch } from 'react-redux'
import { getPositionRequest } from '../../../../../redux/GetPosition/getPositionActions'
import { updatePosition } from '../../../../../redux/UpdatePosition/updatePositionActions'

function UpdDesignation({update, setUpdate, data}) {

    const dispatch = useDispatch()

    const positions = useSelector((state) => state.getPositionReducer.positions)

    const institute_id = Number(localStorage.getItem('institute_id'))

    const [position, setPosition] = useState({
        position_name: data[1],
        institute_id
    })

    useEffect(()=>{
        if(institute_id > 0){
            dispatch(getPositionRequest(institute_id))
        }
    },[institute_id])

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, .7)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
        },
    };

    const submitHandler = (e) => {
        e.preventDefault()

        console.log(position)
        for(let i of positions){
            if(i.position_id === data[0]){
                dispatch(updatePosition(i.position_id, position.position_name))
            }
        }

        setUpdate(false)
    }

    return (
        <div>
            <Modal
                className='modal-content'
                style={customStyles}
                isOpen={update}
                onRequestClose={() => setUpdate(false)}>
                <div className='center flexbox-container-y'>
                    <h2 style={{ color: "#115868", fontSize: 20 }}>Update Designation</h2>
                    <form onSubmit={submitHandler}>
                        <TextField required autoFocus value={position.position_name} 
                            onChange={(e) => setPosition({ ...position, position_name: e.target.value })}
                            style={{ margin: '3px' }} size='small' variant="outlined" type='text' placeholder='Designation Name' InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <MilitaryTechIcon style={{ height: '20px' }} color="action" />
                                    </InputAdornment>
                                )
                        }} />
                        <div className='center flexbox-container-y'>
                            <button style={{ marginTop: '1rem' }} type='submit' className='modal-btn'>Update</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default UpdDesignation