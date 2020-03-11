import React, { Fragment } from 'react';
import { Purpose, Warning, TextItem } from './information';

const final_note = (
    <Fragment>
        Looks like thats all the labels for today.
        To help ensure careful labelling of the data you have reached the maximum number of labels for today.
        If you would like to you can return to the site on another day and continue labelling more data.
        However, if you loaded the website in a <i>private</i> window and/or cleared your browsers local storage (similar to cookies) you are asked to refrain from returning.
        This is because you may be asked to re-label the same document, which could harm the final results of the study.
        If you have any <b>further questions</b> please refer to the overview and disclaimer below.
    </Fragment>
)

const ThankYou = props => (
    <div className='container'>
        <div className='login_fields'>
            <TextItem header="Thank you for participating, that's it!" body={ final_note } />
            <Purpose />
            <Warning />
        </div>
    </div>
);


export {
    ThankYou
}
