import styled from "styled-components";
import { FC, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth";
import { isEmail, isPasswordStrong } from "../utils";
import { useNavigate } from "react-router-dom";

interface InputProps {
  valid: boolean;
}

interface ButtonProps {
  disabled: boolean;
}

const Register: FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setEmail(value);
    setEmailValid(isEmail(value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setPassword(value);
    setPasswordValid(isPasswordStrong(value));
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = {
      password,
      firstName,
      lastName,
      email,
    };
    try {
      await axios.post(`http://localhost:4000/auth/register`, { formData });
      const loginRes = await login(dispatch, { email, password });
      loginRes && navigate("/");

    } catch (err) {
      console.log(err);
    }
  };

  const buttonDisabled = () => {
    return !(
      emailValid &&
      passwordValid &&
      firstName &&
      lastName &&
      password &&
      email
    );
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREAZĂ UN CONT NOU</Title>
        <Form>
          <InputWrapper>
            <Input
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Prenume"
              valid={true}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={(event) => setLastName(event.target.value)}
              placeholder="Nume"
              valid={true}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={handleEmailChange}
              placeholder="Email"
              valid={emailValid ? true : false}
            />
            {!emailValid && (
              <ErrorMessage>Adresa de email nu este validă</ErrorMessage>
            )}
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={handlePasswordChange}
              placeholder="Parolă"
              type="password"
              valid={passwordValid ? true : false}
            />
            {!passwordValid && (
              <ErrorMessage>
                Parola trebuie să aibă cel puțin 8 caractere și să conțină o combinație de litere, numere și caractere speciale
              </ErrorMessage>
            )}
          </InputWrapper>
          <Button onClick={handleClick} disabled={buttonDisabled()}>
            CREAZĂ CONT
          </Button>
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
    url("https://web-asig.ro/wp-content/uploads/2017/02/asigurari-CASCO-VS-RCA.png")
      no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  flex: 1;
  min-width: 40%;
  margin: 20px 50px 0px 0px;
  position: relative;
`;

const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px;
  border: ${({ valid }) => (valid ? "1px solid #ccc" : "1px solid red")};
  color: ${({ valid }) => (valid ? "#333" : "red")};
`;

const ErrorMessage = styled.span`
  visibility: hidden;
  background-color: red;
  color: white;
  text-align: center;
  padding: 5px;
  border-radius: 4px;
  position: absolute;
  bottom: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  ${InputWrapper}:hover & {
    visibility: visible;
  }
`;

const Button = styled.button<ButtonProps>`
  width: 40%;
  border: none;
  margin-top: 10px;
  padding: 15px 20px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "teal")};
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "darkcyan")};
  }
`;

export default Register;
