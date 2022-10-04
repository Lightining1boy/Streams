import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

const StreamEdit = (props: any) => {
    useEffect(() => {
        props.fetchStream(props.match.params.id);
    }, []);

    const onSubmit = (formValues: any) => {
        props.editStream(props.match.params.id, formValues);
    }
    
    if (!props.stream) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <h3>Edit Stream</h3>
            <StreamForm initialValues={_.pick(props.stream, 'title', 'description')} onSubmit={onSubmit} />
        </div>
    );
}

const mapStateToProps = (state: any, ownProps: any) => {
    const { id } = ownProps.match.params;
    return { stream: state.streams[id] }
}
export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);