import React, { Fragment } from 'react';
import { TextItem } from './information';

const final_note = (
    <Fragment>
        Looks like that's all the labels for today.
        To help ensure careful labelling of the data you have reached the maximum number of labels for today.
        You are welcome to return to the site on another day and label more data.
        However, if you loaded the website in a <i>private</i> window and/or cleared your browsers local storage (similar to cookies) you are asked to refrain from returning.
        This is because you may be asked to re-label the same document, which could harm the final results of the study.
        If you have any <b>further questions</b> please refer to the information provided below.
    </Fragment>
);

const Purpose = props => {
    const header = 'Overview of research:';
    const body = (
        <Fragment>
            The digitization of information now enables humans to have access to more information than at any other time in recorded history.
            Much of this information is unstructured human generated text from sources such as social media sites.
            Said text contains the past, present, and most importantly future thoughts and intentions of the writer. 
            By predicting or identifying the presence of abusive intent in text it could aid social media sites to better moderate and/or diffuse arguments. 
            This is increasingly necessary due to the social division and frequency of threatening comments on social media sites.
            In order to identify such text an approach was developed that allows a model to teach itself in a way that does not require labelled data. 
            However, to quantify the success of this technique a small subset of the data is being labelled by volunteers (such as yourself) to assess the accuracy of the predictions. 
            Said labels are being collected using this website, enabling participants to remotely label data anonymously.
        </Fragment>
    );

    return <TextItem header={ header } body={ body } />
};

const Warning = props => {
    const header = 'Additional information:';
    const body = (
        <Fragment>
            Thank you for participating! 
            As a reminder your labels for the text will be used for the research described above.
            The collected data (i.e. labels) doesn't contain information that can be used to personally identify you.
            However, your labels will be associated with one another using a random ID that was be generated along with a secure token when you started.
            The token is stored in your browser and used to prevent you from being asked to label the same document multiple times.
            The collected data (i.e. labels) will be used to quantify the accuracy of the approach developed in the research.
            The intention is to then publish these results in an academic journal and as part of a master's thesis.
            The anonymous data will be kept indefinitely and for a minimum of five years after the conclusion of this study for use in future research by members of the research community. 
            You are now unable to request your labels (i.e. data) be deleted since the submissions are anonymous.
            Please note that the Queen's General Research Ethics Board (GREB) may request access to study data to ensure that the researcher(s) have or are meeting their ethical obligations in conducting this research.
            As a final reminder, remember that your participation was entirely voluntary and you did not waive any legal rights by consenting to participate. <br/><br/>

            If you have any ethics concerns please contact the General Research Ethics Board (GREB) at 1-844-535-2988 (Toll free in North America) or email <a href='mailto:chair.GREB@queensu.ca'>chair.GREB@queensu.ca</a>.
            Call 1-613-533-2988 if outside North America. 
            If non-English speaking participants wish to contact the Chair for ethics concerns, translation assistance may be necessary, as the REB Chair communicates in English only. <br/>

            The research is being conducted by Professor David Skillicorn and Ben Simons from the <a href='https://www.cs.queensu.ca/'>School of Computing</a> at <a href='https://www.queensu.ca/'>Queen's University</a>.
            If you have any questions about the research, please contact Professor Skillicorn at <a href='mailto:skill@cs.queensu.ca'>skill@cs.queensu.ca</a> from the Department of Computing at Queen's University.
        </Fragment>
    );
    return <TextItem header={ header } body={ body } />;
};

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
