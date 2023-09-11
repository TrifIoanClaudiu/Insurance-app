import { FC } from "react";
import { asigurareProps } from "../interfaces/asigurareInterface";
import styled from "styled-components";


const AsigurareCard: FC<asigurareProps> = (props) => {
  const { lName, fName, type, prima, nrInmatriculare, serie } = props;

  return (
    <Card>
      <Name>{`${lName} ${fName}`}</Name>
      <Type>{type}</Type>
      <Details>{type === 'RCA' ? `Nr. Matricol: ${nrInmatriculare}` : `Sasiu: ${serie}`}</Details>
      <Prima>{`Prima: ${prima}`}</Prima>
    </Card>
  );
};

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px;
  width: 300px;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Type = styled.div`
  font-size: 16px;
  margin-top: 8px;
`;

const Details = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;

const Prima = styled.div`
  font-size: 14px;
  margin-top: 8px;
  font-weight: bold;
`;

export default AsigurareCard;
