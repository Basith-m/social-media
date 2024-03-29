import React, { useEffect, useState } from "react";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as userApi from '../../api/userRequest.js'
import "./InfoCard.css";
import { logout } from "../../actions/authAction.js";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch()
  const params = useParams()
  const profileUserId = params.id
  const [profileUser, setProfileUser] = useState({})
  const { user } = useSelector((state) => state.authReducer.authData)


  const handleLogout = () => {
    dispatch(logout())
  }

  useEffect(() => {
    const fetchProfilUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user)
      }
      else {
        const profileUser = await userApi.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    fetchProfilUser()
  }, [user])

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ?
          (
            <div>
              <UilPen
                width="2rem"
                height="1.2rem"
                onClick={() => setModalOpened(true)}
              />
              <ProfileModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                data={user}
              />
            </div>
          ) : ("")
        }

      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span> {profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives In</b>
        </span>
        <span> {profileUser.livesIn}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at</b>
        </span>
        <span> {profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default InfoCard;
