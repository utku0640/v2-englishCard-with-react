import React, { useContext, useRef, useState } from "react";
import styles from "./modal.module.css";
import { GrClose } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { AppContextEnglishCardApplication } from "../../ContextOfEnglishCard";

const Modal = ({
  storageDefaultDataUUID,
  openModal,
  setOpenModal,
  sendEnglishWord,
  handleClickAdd,
  handleClickUpdate,
  inputData,
  docs3,
  setInputData,
  handleChangeVisitorNote,
  handleClickDeleteVisitorNote,
  docs5,
}) => {
  const { setOpenModalEnglishCardApp, openModalEnglishCardApp, value } =
    useContext(AppContextEnglishCardApplication);
  const allModal = useRef();
  const [openEditPart, setOpenEditPart] = useState(false);
  window.addEventListener("click", (e) => {
    if (e.target == allModal.current) {
      setOpenModalEnglishCardApp(false);
    }
  });
  return (
    <>
      {openModalEnglishCardApp && (
        <div className={styles.modal_container} ref={allModal}>
          <div className={styles.modal}>
            {docs5?.length == 0 ? (
              <h2>
                Add your own note about{" "}
                <span style={{ color: "red" }}>"{sendEnglishWord}"</span>
              </h2>
            ) : (
              <h2>
                Update your note about{" "}
                <span style={{ color: "red" }}>"{sendEnglishWord}"</span>
              </h2>
            )}

            {docs3?.map((item, index) => {
              return (
                <div key={index} className={styles.visitor_notes}>
                  <p>{item.visitorNotes}</p>
                  <div>
                    <div
                      className={styles.delete_visitor_note_button}
                      onClick={handleClickDeleteVisitorNote}
                    >
                      <RiDeleteBin6Line />
                    </div>
                    <div
                      onClick={() => {
                        setOpenEditPart(!openEditPart);
                      }}
                      className={styles.edit_visitor_note_button}
                    >
                      <BiEdit />
                    </div>
                  </div>
                </div>
              );
            })}
            {(docs5?.length == 0 || openEditPart) && (
              <textarea
                onChange={handleChangeVisitorNote}
                value={inputData}
                rows="3"
                maxlength="500"
              ></textarea>
            )}

            <div
              onClick={() => {
                setOpenModalEnglishCardApp(false);
                setOpenEditPart(false);
                setInputData("");
              }}
              className={styles.button_close_modal}
            >
              <GrClose />
            </div>

            {(docs5?.length == 0 || openEditPart) && docs3?.length == 0 && (
              <button
                disabled={!inputData}
                onClick={() => {
                  handleClickAdd();
                  // setOpenEditPart(false);
                }}
              >
                add
              </button>
            )}
            {(docs5?.length == 0 || openEditPart) && docs3?.length == 1 && (
              <button
                disabled={!inputData}
                onClick={() => {
                  handleClickUpdate();
                }}
              >
                Update
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
