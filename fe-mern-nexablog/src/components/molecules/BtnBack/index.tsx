import { useNavigate } from "react-router-dom";
import "./btnBack.scss";

const BtnBack = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <p className="btn-back" onClick={goBack}>
      Kembali
    </p>
  );
};

export default BtnBack;
