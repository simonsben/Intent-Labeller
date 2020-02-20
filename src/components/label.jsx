import React from 'react';

const label_map = {
    'doesn\'t contain': 'POSITIVE',
    'contains': 'NEGATIVE'
};
const labels = Object.keys(label_map);

const get_class_name = (selected, label) => 'marking_label ' + ((selected === label_map[label])? 'selected' : '');

const generate_label = (label_type, add_label, selected) => {

    return (
        <div className='marking_options' key={label_type}>
            {
                labels.map(label => (
                    <div 
                        className={get_class_name(selected, label)} 
                        onClick={() => add_label(label_type, label)} 
                        key={label + label_type}>
                            <div>
                                {label + ' ' + label_type}
                            </div>
                    </div>
                ))
            }
        </div>
    );
};

export {
    generate_label,
    label_map
};
