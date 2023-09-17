import "./InfoTooltip.css";
import registerEr from "../../images/registerEr.png";
import registerOk from "../../images/registerOk.png";
import { useEffect } from "react";

const InfoTooltip = ({ isOpen, onClose, errorRegister }) => {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEsc = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };


    document.addEventListener("keydown", closeByEsc);

    return () => document.removeEventListener("keydown", closeByEsc);
  }, [isOpen, onClose]);

  const handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`infoTooltip ${isOpen ? `infoTooltip_opened` : " "}`}
      onMouseDown={handleOverlay}
    >
      <div className="infoTooltip__container">
        <button
          className="infoTooltip__close-btn btn"
          type="button"
          onClick={onClose}
        ></button>

        <img
          className="infoTooltip__image"
          src={errorRegister ? registerEr : registerOk}
          alt="изображение удачной регистрации"
        />
        <p className="infoTooltip__text">
          {errorRegister
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </p>
      </div>
    </div>
  );
};

export default InfoTooltip;
