import React, { useRef } from "react";
import "./styles.scss";
import {MdOutlineContentCopy} from 'react-icons/md'
const Popup = ({ data }) => {

    const popup = useRef();
    const copy  = useRef();
    const copyCode = ()=>{
        navigator.clipboard.writeText(data);
        copy.current.style.display="inline";
        setTimeout(()=>{
            copy.current.style.display="none";

        },500)
    }
  return (
    <div className="PopUpwindow" ref={popup}>
      <span className="heading">Share This Code</span>
      <span className="data">{data} <div className="copy"><MdOutlineContentCopy size={25} onClick={copyCode}/></div></span>
      <span className="info">You Can Access The Code From URL Any Time </span>
      <button className="close" onClick={()=>{
        popup.current.style.display="none";
      }}>Close</button>
        <div className="copyToClipBoard" ref={copy}>Copied To ClipBoard</div>
    </div>
  );
};

export default Popup;
