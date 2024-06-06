import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.scss";
import { startWebCam, startCall, answerCall, hangUp,micOff,micOn,cameraOff,cameraOn } from "./connection";
import { useDispatch } from "react-redux";
import { showHeaderAndFooter } from "../../store/roomSlice";
import Popup from "../../Components/popup/Popup";
import {
  BsMicFill,
  BsMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
} from "react-icons/bs";
import { IoMdCall } from "react-icons/io";

const Room = () => {
  const webcamVideo = useRef();
  const remoteVideo = useRef();
  const hangupButton = useRef();

  const [camera, setCamera] = useState(true);
  const [cameraColor, setCameracolor] = useState("#2EA3F1");
  const [mic, setMic] = useState(true);
  const [micColor, setMiccolor] = useState("#2EA3F1");

  const cameraToggle = async (e) => {
    if (cameraColor == "#2EA3F1") setCameracolor("#A80000");
    else setCameracolor("#2EA3F1");
    if(camera===true){
      await cameraOff();
    }
    else await cameraOn();
    setCamera(!camera)
  };

  const micToggle = async() => {
    if(micColor == "#2EA3F1" )setMiccolor("#A80000");
    else setMiccolor("#2EA3F1");
    if(mic===true){
      await micOff();
    }
    else await micOn();
    setMic(!mic);
  };

  const handleWebCam = async () => {
    let { localStream, remoteStream } = await startWebCam();

    webcamVideo.current.srcObject = localStream;
    webcamVideo.current.srcObject = localStream;
    remoteVideo.current.srcObject = remoteStream;
  };

  const handleCall = async () => {
    await startCall(state.id);
    hangupButton.current.disabled = false;
  };

  const handleIncomingCall = async () => {
    await handleWebCam();
    await answerCall(state.id);
  };

  const startMeet = async () => {
    await handleWebCam();
    if (state.status == "created") handleCall();
    else handleIncomingCall();
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const endMeet = async () => {
    const tracks = webcamVideo.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    await hangUp(state.id);
    dispatch(showHeaderAndFooter);
    navigate("/SQUAD");
  };

  const { state } = useLocation();
  useEffect(() => {
    startMeet();
  }, []);

  return (
    <>
      <div className="roomContainer">
        <div className="mediaScreen">
          <video className="userMedia" muted autoPlay ref={webcamVideo} />
          <video className="remoteMedia" autoPlay ref={remoteVideo} />
        </div>
        <div className="controls">
          <button
            className="btn"
            onClick={cameraToggle}
            style={{ backgroundColor: cameraColor }}
          >
            {camera ? (
              <BsCameraVideoFill size={20} />
            ) : (
              <BsCameraVideoOffFill size={20} />
            )}
          </button>
          <button
            className="btn"
            onClick={micToggle}
            style={{ backgroundColor: micColor }}
          >
            {mic ? <BsMicFill size={20} /> : <BsMicMuteFill size={20} />}
          </button>
          <button
            className="btn"
            ref={hangupButton}
            onClick={endMeet}
            style={{ backgroundColor: "#A80000" }}
          >
            <div>
              <IoMdCall size={20} />
            </div>
          </button>
        </div>
        {state.status == "created" && <Popup data={state.id} />}
      </div>
    </>
  );
};

export default Room;
