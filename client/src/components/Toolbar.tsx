import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userRedux.js";
import { FaArrowLeft, FaHome, FaUser } from "react-icons/fa";


const Toolbar: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoToProfile = () => {
    navigate(`/user`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(`/login`);
  };

  return (
    <ToolbarContainer>
      <IconsContainer>
        <IconButton onClick={handleGoBack}>
          <FaArrowLeft />
        </IconButton>
        <IconButton onClick={handleGoHome}>
          <FaHome /> 
        </IconButton>
        <IconButton onClick={handleGoToProfile}>
          <FaUser /> 
        </IconButton>
      </IconsContainer>
      <IconButton style={{ marginRight: "15px" }} onClick={handleLogout}>
        Logout
      </IconButton>
    </ToolbarContainer>
  );
};

const ToolbarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: transparent;
  z-index: 100;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export default Toolbar;
