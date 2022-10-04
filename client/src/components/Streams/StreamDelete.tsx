import React, { useEffect } from 'react';
import Modal from '../Modal';
import history from "../../history";
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StreamDelete = (props: any) => {
    useEffect(() => {
        props.fetchStream(props.match.params.id);
    }, []);

    const actions = (
        <React.Fragment>
            <button onClick={() => props.deleteStream(props.match.params.id)} className="ui button negative">Delete</button>
            <Link to='/' className="ui button">Cancel</Link>
        </React.Fragment>
    );

    const renderContent = () => {
        if (!props.stream) {
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete the stream with the title of ${props.stream.title}?`
    }

    return (
    <Modal 
        title={'Delete Stream'}
        content={renderContent()}
        actions={actions}
        path="/"
        onDismiss={() => history.push("/")}
    />
    );
}

const mapStateToProps = (state: any, ownProps: any) => {
    const { id } = ownProps.match.params;
    return { stream: state.streams[id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);