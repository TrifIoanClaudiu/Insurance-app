import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FC, useState } from "react";
import { login } from "../redux/auth";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.error);
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const loginRes = await login(dispatch, { email, password });
    loginRes && navigate("/");
  };

  const handleRegisterClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(`/register`)
  };

  return (
    <Container>
      <Wrapper>
        <Title>LOGARE</Title>
        <Form>
          <Input onChange={handleEmailChange} placeholder="email" />
          <Input
            onChange={handlePasswordChange}
            type="password"
            placeholder="parolă"
          />
          <Button onClick={handleClick}>CONECTEAZĂ-TE</Button>
          {error && <ErrorMessage>EMAIL SAU PAROLĂ GREȘITĂ</ErrorMessage>}
          <RLink onClick={handleRegisterClick}>CREAZĂ UN CONT NOU</RLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://web-asig.ro/wp-content/uploads/2017/09/Asigurari-RCA-Cluj.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const RLink = styled.a<React.HTMLAttributes<HTMLElement>>`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

export default Login;
