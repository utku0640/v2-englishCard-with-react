import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import db from "../../firebase_2";
import styles from "./childreList.module.css";
import { GoTrash } from "react-icons/go";
import { BiSubdirectoryLeft } from "react-icons/bi";

import { useContext, useReducer, useState } from "react";
import { ImPlus } from "react-icons/im";
import ResponsiveSidebar from "../responsiveSidebar/ResponsiveSidebar";
import { BiSolidMessageAdd } from "react-icons/bi";
import Modal from "../modal/Modal";
import { v4 as uuidv4 } from "uuid";
import AdsComponentHorizontal from "../../AdsComponentHorizontal";
import { AppContextEnglishCardApplication } from "../../ContextOfEnglishCard";
import childrenListReducer from "../reducers/childrenListReducer";

const ChildrenList = ({ path, handleChange, handleSubmit, data }) => {
  const {
    value,
    categoryName,
    categoryName_2,
    changeWordList,
    changeWordList_2,
    setOpenModalEnglishCardApp,
    openModalEnglishCardApp,
    closeResponsiveSidebar,
    default_text_with_no_chosen_docs2,
    default_text_with_no_chosen_docs1_user,
  } = useContext(AppContextEnglishCardApplication);
  const sameUUID = uuidv4();

  const initialState = {
    openWritingPart: true,
    storageDefaultDataUUID: null,
    sendEnglishWord: "",
  };

  const [state, dispatch] = useReducer(childrenListReducer, initialState);
  // const [openWritingPart, setOpenWritingPart] = useState(true);
  // const [storageDefaultDataUUID, setStorageDefaultDataUUID] = useState();
  const [inputData, setInputData] = useState();
  const [abc, setAbc] = useState();
  // const [sendEnglishWord, setSendEnglishWord] = useState();
  const handleChangeVisitorNote = (e) => {
    setInputData(e.target.value);
  };
  const handleClickAdd = async () => {
    const docRef = doc(
      db,
      `default_data/${categoryName_2}/children/${state.storageDefaultDataUUID}/children2/${value.uid}/children3/${sameUUID}`
    );
    await setDoc(docRef, {
      visitorNotes: inputData,
      visitorNotesUUID: sameUUID,
    });
    setInputData("");
  };
  const query3 = collection(
    db,
    `default_data/${categoryName_2}/children/${
      state.storageDefaultDataUUID
    }/children2/${value ? value.uid : null}/children3`
  );
  const [docs3, loading3, error3] = useCollectionData(query3);

  const handleClickUpdate = async () => {
    const docRef = doc(
      db,
      `default_data/${categoryName_2}/children/${
        state.storageDefaultDataUUID
      }/children2/${value.uid}/children3/${docs3.map(
        (item) => item.visitorNotesUUID
      )}`
    );
    await updateDoc(docRef, {
      visitorNotes: inputData,
    });
    setInputData("");
  };
  const handleClickDeleteVisitorNote = async () => {
    await deleteDoc(
      doc(
        db,
        `default_data/${categoryName_2}/children/${
          state.storageDefaultDataUUID
        }/children2/${value.uid}/children3/${docs3.map(
          (item) => item.visitorNotesUUID
        )}`
      )
    );
  };

  const funcWritingPart = () => {
    dispatch({ type: "OPEN_WRITING_PART", payload: state.openWritingPart });
    // setOpenWritingPart(!openWritingPart);
  };

  const q = query(
    collection(db, path),
    orderBy("englishWord") // Replace "englishWord" with the field you want to order by
  );

  const [docs, loading, error] = useCollectionData(q);

  const q_2 = query(
    collection(db, `default_data/${categoryName_2}/children`),
    orderBy("englishWord") // Replace "englishWord" with the field you want to order by
  );
  const [docs_2, loading_2, error_2] = useCollectionData(q_2);

  const changeButtonLooking = (uuid) => {
    const a = docs_2.find((item) => item.defaultDataUUID === uuid);
    setAbc(a.defaultDataUUID);
  };

  const query5 = collection(
    db,
    `default_data/${categoryName_2}/children/${abc}/children2/${
      value ? value.uid : null
    }/children3`
  );
  const [docs5] = useCollectionData(query5);

  const handleDeleteSubCollection = async (uuid) => {
    await deleteDoc(
      doc(db, `users/${value.uid}/children/${categoryName}/children2/${uuid}`)
    );
  };

  const handleClickChangeEverything = (eng, tr, event) => {
    if (event.currentTarget.classList) {
      event.currentTarget.classList.toggle(
        styles.container_single_card_changing
      );
    }
    if (event.currentTarget.children[0].textContent === `${eng}`) {
      event.currentTarget.children[0].textContent = `${tr}`;
    } else {
      event.currentTarget.children[0].textContent = `${eng}`;
    }
    if (event.detail === 3) {
      if (event.currentTarget) {
        event.currentTarget.children[1].classList.toggle(
          styles.delete_button_active
        );
      }
    }
  };
  const handleClickChangeEverythingThatDefaultData = (eng, tr, event) => {
    if (event.currentTarget.classList) {
      event.currentTarget.classList.toggle(
        styles.container_single_card_changing
      );
    }
    if (event.currentTarget.children[1].classList) {
      event.currentTarget.children[1].classList.toggle(
        styles.dictionary_part_not_active
      );
    }
    if (event.currentTarget.children[2].classList) {
      event.currentTarget.children[2].classList.toggle(
        styles.detail_part_not_active
      );
    }
    if (event.currentTarget.children[0].textContent === `${eng}`) {
      event.currentTarget.children[0].textContent = `${tr}`;
    } else {
      event.currentTarget.children[0].textContent = `${eng}`;
    }
  };

  return (
    <div className={styles.container}>
      {/* <CreateDefaultData /> */}
      <ResponsiveSidebar />
      {changeWordList && (
        <div>
          <button onClick={funcWritingPart} className={styles.button_29}>
            <ImPlus />
          </button>
          {state.openWritingPart ? (
            <div>
              <form onSubmit={handleSubmit} className={styles.form_div}>
                <input
                  placeholder="English Word"
                  name="englishWord"
                  onChange={handleChange}
                  value={data.englishWord}
                />
                <input
                  placeholder="Turkish Word"
                  name="turkishWord"
                  onChange={handleChange}
                  value={data.turkishWord}
                />
                <div className={styles.button_add}>
                  <button className={styles.button_29} type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      )}

      <div className={styles.container_card}>
        {changeWordList ? (
          <>
            {docs?.map((item, index) => {
              return (
                <div key={index}>
                  <div
                    onClick={(event) =>
                      handleClickChangeEverything(
                        item.turkishWord,
                        item.englishWord,
                        event
                      )
                    }
                    className={styles.container_single_card}
                  >
                    <div className={styles.word_part}>{item.englishWord}</div>

                    <button
                      className={styles.delete_button}
                      onClick={() => handleDeleteSubCollection(item.uuid)}
                    >
                      <GoTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          default_text_with_no_chosen_docs1_user && (
            <div className={styles.default_text_with_no_chosen_docs}>
              <h1>
                <BiSubdirectoryLeft />
                {"    "}Click the Category to Choose a Card---user
              </h1>
            </div>
          )
        )}
      </div>
      {/* ------------------------------------------------------------ */}

      {changeWordList_2 && (
        <Modal
          storageDefaultDataUUID={state.storageDefaultDataUUID}
          // openModal={openModal}
          // setOpenModal={setOpenModal}
          sendEnglishWord={state.sendEnglishWord}
          handleClickAdd={handleClickAdd}
          docs3={docs3}
          docs5={docs5}
          handleClickUpdate={handleClickUpdate}
          inputData={inputData}
          setInputData={setInputData}
          handleChangeVisitorNote={handleChangeVisitorNote}
          handleClickDeleteVisitorNote={handleClickDeleteVisitorNote}
        />
      )}
      <div className={styles.container_card}>
        {changeWordList_2 ? (
          <div className={styles.container_card_subClass}>
            <div className={styles.topSideAdComponent}>
              <AdsComponentHorizontal />
            </div>{" "}
            <h1 className={styles.h1categoryName}>{categoryName_2}</h1>
            <div className={styles.container_all_card}>
              {/* <div className={styles.container_single_card}>
                <AdsComponentHorizontal />
              </div> */}

              {docs_2?.map((item, index) => {
                const handleItemKindName = () => {
                  if (item.kind === "adjective") {
                    return "Adj";
                  } else if (item.kind === "noun") {
                    return "Noun";
                  } else if (item.kind === "verb") {
                    return "Verb";
                  }
                };
                const handleItemKindNameColor = () => {
                  if (item.kind === "adjective") {
                    return "orange";
                  } else if (item.kind === "noun") {
                    return "blue";
                  } else if (item.kind === "verb") {
                    return "green";
                  }
                };

                return (
                  <div key={index}>
                    <div
                      onClick={(event) => {
                        {
                          handleClickChangeEverythingThatDefaultData(
                            item.turkishWord,
                            item.englishWord,
                            event,
                            item.defaultDataUUID
                          );
                        }
                      }}
                      className={styles.container_single_card}
                    >
                      <div className={styles.word_part}>{item.englishWord}</div>
                      <a
                        className={styles.dictionary_part}
                        href={`https://dictionary.cambridge.org/dictionary/english-turkish/${item.englishWord}`}
                        target="_blank"
                      >
                        more details..
                      </a>
                      <div className={styles.detail_part}>{item.detail}</div>
                      {value && (
                        <button
                          onClick={() => {
                            setOpenModalEnglishCardApp(true);
                            closeResponsiveSidebar();
                            dispatch({
                              type: "SEND_ENGLISH_WORD",
                              payload: item.englishWord,
                            });
                            dispatch({
                              type: "STORAGE_DEFAULT_DATA_UUID",
                              payload: item.defaultDataUUID,
                            });
                            changeButtonLooking(item.defaultDataUUID);
                          }}
                          className={styles.addMoreDetailsButton}
                        >
                          <BiSolidMessageAdd />
                        </button>
                      )}
                      <div className={styles.kind_of_words}>
                        <h5 style={{ color: handleItemKindNameColor() }}>
                          ( {handleItemKindName()})
                        </h5>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          default_text_with_no_chosen_docs2 && (
            <div className={styles.default_text_with_no_chosen_docs}>
              <h1>
                <BiSubdirectoryLeft />
                {"    "}Click the Category to Choose a Card
              </h1>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChildrenList;
