import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { asigurareProps } from "../interfaces/asigurareInterface";
import { fetchAsigurari } from "../requestMethods";
import AsigurareCard from "../components/Asigurare";
import Toolbar from "../components/Toolbar";
import styled from "styled-components";

const UserPage: FC = () => {
  const user = useSelector((state: RootState) => state.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [asigurari, setAsigurari] = useState<asigurareProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const asigurariData = await fetchAsigurari(user._id);
        setAsigurari(asigurariData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [user._id]);

  return (
    <>
      <Toolbar />
      <UserPageContainer>
        {!isLoading && (
          <>
            <h2>Aveți un număr total de {asigurari.length} oferte</h2>
            <CardGrid>
              {asigurari.map((asigurare, index) => (
                <AsigurareCard
                  key={index} // Don't forget to add a unique key when mapping
                  fName={asigurare.fName}
                  lName={asigurare.lName}
                  type={asigurare.type}
                  nrInmatriculare={asigurare.nrInmatriculare}
                  serie={asigurare.serie}
                  prima={asigurare.prima}
                />
              ))}
            </CardGrid>
          </>
        )}
      </UserPageContainer>
    </>
  );
};

const UserPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  );
  gap: 20px;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  margin-top: 20px;
`;

export default UserPage;
