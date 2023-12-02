import styles from "./responsivesidebar.module.css";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import db from "../../firebase_2";
import { GoTrash } from "react-icons/go";
import { BiAddToQueue } from "react-icons/bi";
import ReactLoading from "react-loading";
import { AppContextEnglishCardApplication } from "../../ContextOfEnglishCard";
import { BsFillBookmarksFill } from "react-icons/bs";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import sidebarReducer from "../reducers/sidebarReducer";
const ResponsiveSidebar = () => {
  const {
    isResponsiveSidebarOpen,
    value,
    handleCategory,
    handleCategory_2,
    toggleWordList,
    toggleWordList_2,
    openResponsiveSidebar,
  } = useContext(AppContextEnglishCardApplication);
  const [value_3, setValue_3] = useState();

  const initialState = {
    firstButton: true,
    secondButton: false,
    defaultData: true,
    userData: false,
    value_2: {},
  };
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  const handlePositionForDefaultData = () => {
    dispatch({ type: "POSITION_BUTTON_DEFAULT_DATA" });
    if (state.firstButton) {
      return;
    } else {
      dispatch({ type: "FIRST_POSITION_BUTTON_COLOR_CHANGE" });
    }
  };
  const handlePositionForUserData = () => {
    dispatch({ type: "POSITION_BUTTON_USER_DATA" });
    if (state.secondButton) {
      return;
    } else {
      dispatch({ type: "SECOND_POSITION_BUTTON_COLOR_CHANGE" });
    }
  };

  useEffect(() => {
    setValue_3(JSON.parse(localStorage.getItem("user_data")));
  }, []);

  const query = collection(db, `users/${value_3 && value_3.uid}/children`);
  const [docs, loading, error] = useCollectionData(query);

  const [categoryState, setCategoryState] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryState) {
      const docRef = doc(db, `users/${value.uid}/children`, categoryState);

      await setDoc(docRef, { category: categoryState });

      setCategoryState("");
    }
  };
  const handleDelete = async (categoryName) => {
    await deleteDoc(doc(db, `users/${value.uid}/children/${categoryName}`));
  };

  const query_2 = collection(db, "default_data");
  const [docs_2, loading_2, error_2] = useCollectionData(query_2);

  return (
    <div className={styles.container_responsive_sidebar}>
      {value_3 && isResponsiveSidebarOpen && (
        <div className={styles.position_div}>
          <button
            onClick={() => {
              handlePositionForDefaultData();
            }}
            className={`${styles.positionButtonFirst} ${
              state.firstButton && styles.activePositionButton
            }`}
          >
            <BsFillBookmarksFill />
          </button>
          <button
            onClick={() => {
              handlePositionForUserData();
            }}
            className={`${styles.positionButtonSecond} ${
              state.secondButton && styles.activePositionButton
            }`}
          >
            <BsFillFileEarmarkFill />
          </button>
        </div>
      )}

      {isResponsiveSidebarOpen && (
        <div className={styles.sidebar_container}>
          {value_3 && state.userData && (
            <form onSubmit={handleSubmit} className={styles.sidebar}>
              {/* adding input */}
              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  placeholder="Type here to add card..."
                  name="text"
                  class="input"
                  onChange={(e) => setCategoryState(e.target.value)}
                  value={categoryState}
                />
              </div>
              <div>
                {/* send button for writing text */}
                <button className={styles.button_31}>
                  <BiAddToQueue />
                </button>
              </div>
            </form>
          )}

          <div>
            <div className={styles.category_container}>
              {state.defaultData &&
                docs_2?.map((item_2, index) => {
                  return (
                    <button
                      style={{ margin: "10px" }}
                      key={index}
                      className={styles.button_29}
                      role="button"
                      onClick={() => {
                        handleCategory_2(item_2.categoryName);
                        toggleWordList_2();
                        openResponsiveSidebar();
                      }}
                    >
                      {item_2.categoryName}
                    </button>
                  );
                })}
              {loading ? (
                <div className={styles.loading}>
                  <ReactLoading
                    type={"bubbles"}
                    color="floralwhite"
                    height={100}
                    width={100}
                  />
                </div>
              ) : (
                state.userData &&
                docs?.map((doc) => {
                  return (
                    <div key={Math.random()} className={styles.single_category}>
                      <button
                        className={styles.button_29}
                        role="button"
                        onClick={() => {
                          handleCategory(doc.category);
                          toggleWordList();
                          openResponsiveSidebar();
                        }}
                      >
                        {doc.category}
                      </button>
                      <button
                        className={styles.button_30}
                        onClick={() => handleDelete(doc.category)}
                      >
                        <GoTrash />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveSidebar;
