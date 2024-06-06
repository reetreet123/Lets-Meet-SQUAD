import React, { useEffect, useState } from "react";
import "./styles.scss";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { app } from "..//../Authenctication/firebaseconfig";
import {
  doc,
  collection,
  getFirestore,
  getDoc,
  setDoc,
} from "firebase/firestore";
import {
  hideHeaderAndFooter,
  showHeaderAndFooter,
} from "../../../store/roomSlice";

const firestore = getFirestore(app);

function StartConferencing({ signout, verified, setValue }) {
  const navigate = useNavigate();
  const joinRef = useRef();
  const dispatch = useDispatch();
  const [roomCode, setRoomCode] = useState("");

  const createRoom = async () => {
    try {
      let callDoc = doc(collection(firestore, "room"));
      await setDoc(callDoc, {
        Date: new Date().getDate(),
        Time: new Date().getTime(),
      });
      if (callDoc.id) {
        dispatch(hideHeaderAndFooter());
        navigate("/SQUAD/meet/" + callDoc.id, {
          state: {
            id: callDoc.id,
            status: "created",
          },
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const joinRoom = async () => {
    try {
      let callDoc = doc(collection(firestore, "room"), roomCode);
      let docSnap = await getDoc(callDoc);
      if (docSnap.exists()) {
        if (callDoc.id === roomCode) {
          dispatch(hideHeaderAndFooter());
          navigate("/SQUAD/meet/" + callDoc.id, {
            state: {
              id: callDoc.id,
              status: "joined",
            },
          });
        }
      } else {
        alert("No Meeting Exist With That Code");
      }
    } catch (err) {
        alert("Error In Connecting The Server,Please Check Your Internet Connection")
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    setRoomCode(e.target.value);
  };

  useEffect(() => {
    if (!verified) {
      const goback = setTimeout(() => {
        setValue("Sign In");
      }, 5000);
    }
  }, []);

  return (
    <div className="homeContainer">
      {verified ? (
        <>
          <div className="homeWrapper">
            <button className="newMeeting" onClick={createRoom}>
              New Meeting
            </button>
            <input
              onClick={() => {
                joinRef.current.style.display = "inline";
              }}
              type="text"
              className="code"
              placeholder="Enter Code"
              value={roomCode}
              onChange={handleChange}
            />
            <span ref={joinRef} className="join" onClick={joinRoom}>
              Join
            </span>
          </div>
          <button className="logout" onClick={signout}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <h1>Please Verify Your Email First And Sign In Again</h1>
          <h4>Verification Link Has Been Sent To Your Email ID</h4>
        </>
      )}
    </div>
  );
}

export default StartConferencing;
