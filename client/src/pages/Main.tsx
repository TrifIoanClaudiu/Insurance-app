import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Toolbar from "../components/Toolbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/userRedux";
import ModalComponent from "../components/Modal";

const Main: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.currentUser);
  const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {user && <Toolbar />}
      <MainContainer>
        <Title>Bine ați venit</Title>
        <Description>
          Dacă îți dorești să primești o ofertă de asigurare este nevoie să te
          loghezi
        </Description>
        <Link to={"/login"}>
          {user ? (
            <Button onClick={handleLogout}>Deloghează-te</Button>
          ) : (
            <Button>Logare</Button>
          )}
        </Link>
        <FeatureContainer>
          <FeatureCard>
            <FeatureIcon>🚗</FeatureIcon>
            <FeatureTitle>Asigurare RCA</FeatureTitle>
            <FeatureDescription>
              Asigurarea RCA (Răspundere Civilă Auto) îți oferă protecție în caz
              de daune cauzate altor persoane sau proprietăți în timp ce
              conduci. Acoperim costurile pentru daunele pe care le cauzezi
              altora.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🏎️</FeatureIcon>
            <FeatureTitle>Asigurare CASCO</FeatureTitle>
            <FeatureDescription>
              Asigurarea CASCO îți oferă protecție extinsă pentru vehiculul tău.
              Acoperim daunele produse vehiculului tău în caz de accident, furt,
              vandalism și altele.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>📝</FeatureIcon>
            <FeatureTitle>Cere o ofertă</FeatureTitle>
            <FeatureDescription>
              Dorești o ofertă personalizată pentru asigurarea ta auto? Apasă pe
              butonul "Cere o ofertă" pentru a intra în contact cu noi și a
              primi cea mai bună ofertă adaptată nevoilor tale.
            </FeatureDescription>
            <Button onClick= {() => setIsModalOpen(true)}>Cere o ofertă</Button>
          </FeatureCard>
        </FeatureContainer>
        <InformativeText>
          Dacă dorești să te alături echipei noastre,
          trimite-ne CV-ul tău la: trifionut207@gmail.com
        </InformativeText>
      </MainContainer>
      {isModalOpen && (
        <ModalComponent closeModal={closeModal}/>
      )}
    </>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://www.integrabroker.ro/wp-content/uploads/2016/12/asigurari.jpg") center;
  background-size: cover;
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Description = styled.p`
  font-size: 24px;
  text-align: center;
  color: #555;
  margin-bottom: 60px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 60px;
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
  animation: ${fadeIn} 1s ease-in-out;
`;

const FeatureIcon = styled.span`
  font-size: 48px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #777;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  background-color: #ffc107;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffca28;
  }
`;

const InformativeText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  margin-top: 40px;
`;

export default Main;
