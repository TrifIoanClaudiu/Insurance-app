import React, { FC, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ModalProps } from "../interfaces/modalInterface";
import { useNavigate } from "react-router-dom";
import { errorProps } from "../interfaces/errorsInterface";
import { asigurareNoua } from "../requestMethods";

const ModalComponent: FC<ModalProps> = (props) => {
  const user = useSelector((state: RootState) => state.currentUser);
  const navigate = useNavigate();
  const modalContainerRef = useRef<HTMLDivElement | null>(null);

  const handleLogin = () => {
    navigate("/login");
  };

  const checkErrors = (data: Object) => {
    const values = Object.values(data);
    return values.some((value) => value !== "");
  };
  

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    birthDate: "",
    insuranceType: "",
    marca: "",
    anFabricatie: "",
    nrInmatriculare: "",
    serieSasiu: "",
    kilometrii: "",
    userId: user?._id,
  });

  const [errors, setErrors] = useState<errorProps>({
    name: "",
    lastName: "",
    birthDate: "",
    insuranceType: "",
    marca: "",
    anFabricatie: "",
    nrInmatriculare: "",
    serieSasiu: "",
    kilometrii: "",
  });

  const [dynamicFieldsVisible, setDynamicFieldsVisible] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInsuranceTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setFormData({ ...formData, insuranceType: value });
    if (value === "Rca") {
      setDynamicFieldsVisible(true);
    } else {
      setDynamicFieldsVisible(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      name: "",
      lastName: "",
      birthDate: "",
      insuranceType: "",
      marca: "",
      anFabricatie: "",
      nrInmatriculare: "",
      serieSasiu: "",
      kilometrii: "",
    });

    if (formData.name.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Numele trebuie să aibă cel puțin 3 caractere.",
      }));
    }

    if (formData.lastName.length > 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "Prenumele nu poate avea mai mult de 10 caractere.",
      }));
    }

    const currentYear = new Date().getFullYear();
    const birthYear = new Date(formData.birthDate).getFullYear();
    if (!birthYear || birthYear < 1900 || birthYear > currentYear) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        birthDate: "Data nașterii trebuie să fie între 1900 și anul curent.",
      }));
    }

    if (!formData.insuranceType) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        insuranceType: "Alege un tip de asigurare",
      }));
    }
    if (formData.insuranceType === "Rca") {
      if (!formData.marca) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          marca: "Marca este obligatorie pentru RCA.",
        }));
      }

      if (!formData.anFabricatie) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          anFabricatie: "Anul fabricației este obligatoriu pentru RCA.",
        }));
      }

      if (!formData.nrInmatriculare) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          nrInmatriculare:
            "Numărul de înmatriculare este obligatoriu pentru RCA.",
        }));
      }
    }

    if (formData.insuranceType === "Casco") {
      if (!formData.serieSasiu) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          serieSasiu: "Serie Sasiu este obligatorie pentru Casco.",
        }));
      }

      if (!formData.kilometrii) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          kilometrii: "Kilometrii sunt obligatorii pentru Casco.",
        }));
      }
    }

    if (!checkErrors(errors)) {
      await asigurareNoua(formData);
      navigate("/user");
    } else {
      return;
    }
  };

  useEffect(() => {
    const handleCloseModal = (e: MouseEvent) => {
      if (modalContainerRef.current && modalContainerRef.current) {
        if (
          !modalContainerRef.current.contains(e.target as Node) &&
          !modalContainerRef.current.contains(e.target as Node)
        ) {
          props.closeModal();
        }
      }
    };

    document.addEventListener("mousedown", handleCloseModal);

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [props]);

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent className="modal-content" ref={modalContainerRef}>
          <h1>Formular de ofertă</h1>
          <OfferForm onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="name">Nume*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <label htmlFor="lastName">Prenume</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <ErrorMessage>{errors.lastName}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="birthDate">Data nașterii*</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
              />
              {errors.birthDate && (
                <ErrorMessage>{errors.birthDate}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="insuranceType">Tip asigurare</label>
              <select
                id="insuranceType"
                name="insuranceType"
                value={formData.insuranceType}
                onChange={handleInsuranceTypeChange}
              >
                <option value="">Selectează tipul de asigurare</option>
                <option value="Rca">RCA</option>
                <option value="Casco">Casco</option>
              </select>
              {errors.insuranceType && (
                <ErrorMessage>{errors.insuranceType}</ErrorMessage>
              )}
            </FormGroup>

            {dynamicFieldsVisible && formData.insuranceType === "Rca" && (
              <>
                <FormGroup>
                  <label htmlFor="marca">Marca</label>
                  <input
                    type="text"
                    id="marca"
                    name="marca"
                    value={formData.marca}
                    onChange={handleInputChange}
                  />
                  {errors.marca && <ErrorMessage>{errors.marca}</ErrorMessage>}
                </FormGroup>
                <FormGroup>
                  <label htmlFor="anFabricatie">An Fabricatie</label>
                  <input
                    type="text"
                    id="anFabricatie"
                    name="anFabricatie"
                    value={formData.anFabricatie}
                    onChange={handleInputChange}
                  />
                  {errors.anFabricatie && (
                    <ErrorMessage>{errors.anFabricatie}</ErrorMessage>
                  )}
                </FormGroup>
                <FormGroup>
                  <label htmlFor="nrInmatriculare">Nr. Inmatriculare</label>
                  <input
                    type="text"
                    id="nrInmatriculare"
                    name="nrInmatriculare"
                    value={formData.nrInmatriculare}
                    onChange={handleInputChange}
                  />
                  {errors.nrInmatriculare && (
                    <ErrorMessage>{errors.nrInmatriculare}</ErrorMessage>
                  )}
                </FormGroup>
              </>
            )}

            {!dynamicFieldsVisible && formData.insuranceType === "Casco" && (
              <>
                <FormGroup>
                  <label htmlFor="serieSasiu">Serie Sasiu</label>
                  <input
                    type="text"
                    id="serieSasiu"
                    name="serieSasiu"
                    value={formData.serieSasiu}
                    onChange={handleInputChange}
                  />
                  {errors.serieSasiu && (
                    <ErrorMessage>{errors.serieSasiu}</ErrorMessage>
                  )}
                </FormGroup>
                <FormGroup>
                  <label htmlFor="kilometrii">Kilometrii</label>
                  <input
                    type="text"
                    id="kilometrii"
                    name="kilometrii"
                    value={formData.kilometrii}
                    onChange={handleInputChange}
                  />
                  {errors.kilometrii && (
                    <ErrorMessage>{errors.kilometrii}</ErrorMessage>
                  )}
                </FormGroup>
              </>
            )}

            {!user ? (
              <Button onClick={handleLogin}>Login</Button>
            ) : (
              <Button type="submit">Trimite</Button>
            )}
            <Button onClick={props.closeModal}>Cancel</Button>
          </OfferForm>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalComponent;

const ModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  overflow-y: auto;
  max-height: 80vh;
`;

const ModalContent = styled.div`
  padding: 0 20px;
`;

const OfferForm = styled.form`
  padding: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
  margin-bottom: 0;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;
