import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import ReactPlayer from 'react-player';
//import video from '../../videos/181015_13_Venice Beach Drone_25.mp4'

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    if (!this.props.stream.video) {
      this.player.destroy();
    }
  }

  buildPlayer() {
    if (this.player || !this.props.stream || this.props.stream.video) {
      return;
    }

    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    if (this.props.stream.video) {
      return (
        <div className='player-wrapper'>
            <video style={{ width: "100%", height: "100%"}} controls>
              <source src={`/videos/${this.props.stream.video}`} type="video/mp4"/>
            </video>

              <h1>{title}</h1>
              <h5>{description}</h5>
          </div>
        );
    }

    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
