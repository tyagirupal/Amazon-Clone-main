import { useContext, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import triangle from "@src/assets/triangle.png";

export enum Modal_Enum {
  ON = "on",
  OFF = "off",
}

export function LanguageChange() {
  const [enCheckBox, setEnCheckBox] = useState<boolean>(true);
  const [deCheckBox, setDeCheckBox] = useState<boolean>(false);
  const [modal, setModal] = useState<Modal_Enum>(Modal_Enum.OFF);
  const { setLanguageHover, languageHover } = useContext(GlobalContext);

  return (
    <>
      {languageHover && (
        <div>
          <img className="triangle" src={triangle} alt="White Triangle" />
          <div
            onMouseOver={() => {
              setModal(Modal_Enum.ON);
              setLanguageHover(true);
            }}
            onMouseLeave={() => {
              setModal(Modal_Enum.OFF);
              setLanguageHover(false);
            }}
            className="language-change"
          >
            <span className="language-change-text">
              Change language <a href="#">Learn more</a>
            </span>
            <div className="en-language-checkbox">
              <div
                onClick={() => {
                  if (enCheckBox) {
                    setEnCheckBox(true);
                  } else {
                    setEnCheckBox(true);
                    setDeCheckBox(false);
                  }
                }}
                className="en-checkbox-border"
              >
                <div className={enCheckBox ? "en-checkbox" : ""}></div>
              </div>
              <span className="en-language">English - EN</span>
            </div>
            <div className="de-language-checkbox">
              <div
                onClick={() => {
                  if (deCheckBox) {
                    setDeCheckBox(true);
                  } else {
                    setDeCheckBox(true);
                    setEnCheckBox(false);
                  }
                }}
                className="de-checkbox-border"
              >
                <div className={deCheckBox ? "de-checkbox" : ""}></div>
              </div>
              <span className="de-language">Deutsch - DE</span>
            </div>
          </div>
          <div
            className={
              modal === Modal_Enum.ON
                ? "language-modal-on"
                : "language-modal-off"
            }
          ></div>

          <div
            className={
              modal === Modal_Enum.ON
                ? "change-language-modal-on"
                : "change-language-modal-off"
            }
          ></div>
        </div>
      )}
    </>
  );
}
