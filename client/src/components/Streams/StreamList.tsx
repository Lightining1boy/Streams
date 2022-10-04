import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';
import history from '../../history';

const StreamList = (props: any) => {
    useEffect(() => {
        props.fetchStreams();
    }, []);

    const renderAdmin = (stream: any) => {
        if (stream.userId === props.currentUserId || props.currentUserId === "101538225433102867958") {
            return (
                <div className='right floated content'>
                    <Link to={`/stream/edit/${stream.id}`} className='ui button primary'>
                        Edit
                    </Link>
                    <Link to={`/stream/delete/${stream.id}`}  className='ui button negative'>
                        Delete
                    </Link>
                </div>
            );
        }
        
    }
    
    const renderList = props.streams.map((stream: any) => {
        return (
            <div className='item' key={stream.id}>
                {renderAdmin(stream)}
                <i className='large middle aligned icon camera' />
                <div className='content'>
                    <Link to={`/stream/show/${stream.id}`}>{stream.title}</Link>
                   
                    <div className='description'>
                        {stream.description}
                    </div>
                </div>
            </div>
        )
    });

    const renderCreate = () => {
        if (props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right'}}>
                    <Link to='/stream/new' className='ui button primary'>Create Stream</Link>
                </div>
            )
        }
    }

    return (
        <div>
            <h2>Streams</h2>
            <div className='ui celled list'>{renderList}</div>
            {renderCreate()}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return { 
        streams: Object.values(state.streams), 
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}
export default connect(mapStateToProps, { fetchStreams})(StreamList);