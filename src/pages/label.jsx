import React, {Component, Fragment} from 'react';

class Label extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            contexts: [],
            labels: []
        };
        this.update_contexts = this.update_contexts.bind(this);
    }

    make_request = () => {
        const {labels} = this.state;
        const previous = labels === 0? null : labels;
        this.props.make_request(previous, this.update_contexts);
    }

    update_contexts = new_contexts => this.setState({...[this.state], contexts: new_contexts, labels: [], index: 0});

    add_label = label => {
        const {state} = this;

        let {labels, index} = state;
        labels.push(label);
        index++;

        this.setState({...state, labels, index});
    }
    

    render() {
        const {state} = this;
        const context = state.index >= state.contexts.length? null : state.contexts[state.index];

        if (!context) this.make_request();

        return (
            <Fragment>
                {
                    !context? null :
                    <div className='marking_window'>
                        {
                            ['negative', 'don\'t know', 'positive'].map(label => (
                                <div className='marking_label' onClick={() => this.add_label(label)} key={label}>
                                    <div>{label}</div>
                                </div>
                            ))
                        }
                    </div>
                }
                <div className='container center'>
                    <div className='context'>{!context? 'Loading...' : context}</div>
                </div>
            </Fragment>
        )
    }
}

export default Label;
