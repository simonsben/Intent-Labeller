import React, { Fragment } from 'react';
import { TextItem, Purpose } from '../components/information';
import '../style/login.scss';


const completion_statement = (<Fragment>
    Thank you for your interest in supporting this research.
    The labelling has been completed, so you will no longer be able to help out.
    Below is a short description of the research if you are still curious.
    The results of this labelling and the work of automating this labelling should be released in late 2020.
    Until then, why not read some other research to keep you busy. <br/><br/>

    Stay safe.
</Fragment>)

const Complete = () => (
    <div className='container'>
        <h2>Abusive intent detection in social media posts</h2>

        <div className='login_fields'>
            <TextItem header='The labelling is done!' body={ completion_statement } />
            <Purpose />
        </div>
    </div>
);

export default Complete;
