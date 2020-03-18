import { generate_label } from '../components/label';
import React, { Fragment } from 'react';
import '../style/label.scss';

const TextItem = props => (
    <div className='input_item vertical'>
        <h3>{ props.header }</h3>
        <div className='long_text'>{ props.body }</div>
        { props.custom }
    </div>
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
            However, to quantify the success of this technique a small subset of the data will be labelled by volunteers (you) to assess the accuracy of the predictions. 
            Said labels will be collected using a website, enabling participants to remotely label data anonymously.
        </Fragment>
    );

    return <TextItem header={ header } body={ body } />
};

const Warning = props => {
    const header = 'Please be aware:';
    const body = (
        <Fragment>
            The goal of this research is to be able to identify intent, specifically abusive intent in text. 
            As a result, some of the text may contains things like profanities or hate speech. 
            If you would prefer not to label a specific document, you can click on the text (see example below) and it will skip that document. 
            Please understand that you are free to stop at any time if you feel uncomfortable. <br/>

            The collected data doesn't contain information that can be used to personally identify you.
            However, your labels will be associated with one another using a random ID that will be generated along with a secure token if you choose to continue.
            The token will then be stored in your browser and used to prevent you from being asked to label the same document multiple times.
            As explained above, the collected data (labels) will be used to quantify the accuracy of the approach developed in the research.
            The intention is to then publish these results in an academic journal and as part of a master's thesis.
            The anonymous data will be kept indefinitely and for a minimum of five years after the conclusion of this study for use in future research by members of the research community. 
            Should you stop before labelling all given documents some of the labels may be saved and used.
            After starting the labelling, you will be unable to request your labels (i.e. data) be deleted since the submissions are anonymous.
            Please note that the Queen's General Research Ethics Board (GREB) may request access to study data to ensure that the researcher(s) have or are meeting their ethical obligations in conducting this research.
            Please understand that your participation in the study is entirely voluntary and you would not waive any legal rights by consenting to participate. <br/><br/>

            If you have any ethics concerns please contact the General Research Ethics Board (GREB) at 1-844-535-2988 (Toll free in North America) or email <a href='mailto:chair.GREB@queensu.ca'>chair.GREB@queensu.ca</a>.
            Call 1-613-533-2988 if outside North America. 
            If non-English speaking participants wish to contact the Chair for ethics concerns, translation assistance may be necessary, as the REB Chair communicates in English only. <br/>

            The research is being conducted by Professor David Skillicorn and Ben Simons from the <a href='https://www.cs.queensu.ca/'>School of Computing</a> at <a href='https://www.queensu.ca/'>Queen's University</a>.
            If you have any questions about the research, please contact Professor Skillicorn at <a href='mailto:skill@cs.queensu.ca'>skill@cs.queensu.ca</a> from the Department of Computing at Queen's University.
            By clicking submit you are consenting to the possibility of reading offensive text and acknowledge that you can stop at any time. 
        </Fragment>
    );
    return <TextItem header={ header } body={ body } />;
};

const Instructions = props => {
    const header = 'Instructions:';
    const body = (
        <Fragment>
            Thank you for your interest in helping to label data, the process should take you no longer than 20 minutes and you are free to stop at any time.
            As said above, the purpose of this is to identify text that contains intent and/or abuse. 
            In the study, abusive language is defined as an insult or hate speech. 
            Intent can be thought of as text where the author expresses an intention or desire to do something <b>in the future</b>. 
            For example, if the document was "Damn, my TV broke today so I'm going to have to go buy a new one tomorrow", then this would not be abusive (since the profanity is not directed at anyone or any group) but it would be considered to contain intent (i.e. the intention to buy a new TV). 
            Some other examples of intentful language are:

            <ul>
                <li>"I am going to #### ..." (since theyre going to do something) </li>
                <li>"I want to ##### ..." (since they want something to happen) </li>
                <li>"I'd love to see some ..." (since they want to see something) </li>
            </ul>

            Some examples of documents that don't contain intent are:

            <ul>
                <li>"I don't want to go to the zoo tomorrow" (since they don't want ...) </li>
                <li>"hello I have not received an activation email thanks" (since the author is not expressing a desire/intention) </li>
                <li>"I felt like yelling out to them ..." (since this is a statement on a past feeling) </li>
            </ul>

            When labelling a document you will be asked to label whether a document contains intent and whether it contains abuse (separately).
            Below is an example of the labelling interface, you can press contains or doesn't contain to label the document. 
            If you would like to skip the document, you can click on the document to skip to the next one. 
            You are now invited to participate in the study and asked to please do your best to follow the above guidelines when labelling.
        </Fragment>
    );
    const custom = (
        <div className='marking_window demo'>
            <div className='marking_content'> document </div>
            { 
                ['intent', 'abuse'].map(option => (
                    <div className='marking_options' key={'div_' + option}> { generate_label(option, ()=>{}, null) } </div>
                ))
            }
        </div>
    );


    return <TextItem header={ header } body ={ body } custom={ custom } />;
};

const FinalNote = props => {
    return <TextItem body={(
        <Fragment>
            <b>NOTE:</b> if you were given a referral code please enter it below, otherwise <b>leave it blank</b>. 
            Do <b>NOT</b> enter any personally identifiable information (ex. name).
        </Fragment>
    )} />
};

export {
    Purpose,
    Warning,
    Instructions,
    FinalNote,
    TextItem
};