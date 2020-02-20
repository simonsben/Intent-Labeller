import React from 'react';

const TextItem = props => (
    <div className='input_item vertical'>
        <h3>{ props.header }</h3>
        <div className='long_text'>{ props.body }</div>
    </div>
)

const Warning = props => {
    const header = 'Warning:';
    const body = 'Thank you for your interesting in helping to label data. The intention of this research is to be able to predict instances of intent, specifically abusive intent in text. As a result, some of the example text contains things like profanities or hate speech. Please understand that you are free to stop any time if you feel uncomfortable. By clicking submit and creating a profile you should be okay with reading such text and know you can stop at any time.';
    return <TextItem header={ header } body={ body } />;
};

const Instructions = props => {
    const header = 'Instructions:';
    const body = 'As said above, the purpose of this is to label data that contains intent and abuse. In the study, abusive language is defined as an insult or hate speech. Intent can be thought of as text where the author expresses an intention to do something in the future. For example, if the document was "Damn, my TV broke today so I\'m going to have to go buy a new one tomorrow", then this would not be abusive (since the profanity is not directed at anyone) but it would be considered to contain intent. With that said, thank you again for your participation and please to your best to follow these guidelines when labelling.';

    return <TextItem header={ header } body ={ body } />;
};

const FinalNote = props => {
    return <TextItem body='NOTE: if you were not given a referral code please just leave it blank.' />
}

export {
    Warning,
    Instructions,
    FinalNote
};