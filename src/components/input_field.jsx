import React from 'react';
import '../App.scss';

const InputField = ({ name, value, on_change, input_type='text' }) => {
    return (
        <div className='input_item'>
            <div className='input_title'>{ name }:</div>
            <input 
                type={ input_type }
                value={ value }
                onChange={ on_change }
                placeholder={ 'Enter ' + name + ' here.' }
                />
        </div>
    )
}

export default InputField;
