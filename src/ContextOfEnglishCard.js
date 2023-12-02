import React, { createContext, useContext } from "react";
import App from "./App";
import { useState, useEffect } from "react";
import { auth, provider } from "./firebase_2";
import { signInWithPopup } from "firebase/auth";

export const AppContextEnglishCardApplication = createContext();

const AppProviderEnglishCardApplication = ({ children }) => {
  const [value, setValue] = useState("");
  const [categoryName, setCategoryName] = useState();
  const [categoryName_2, setCategoryName_2] = useState();
  const [changeWordList, setChangeWordList] = useState(false);
  const [changeWordList_2, setChangeWordList_2] = useState(false);
  const [isResponsiveSidebarOpen, setIsResponsiveSidebarOpen] = useState(true);
  const [openModalEnglishCardApp, setOpenModalEnglishCardApp] = useState(false);
  const [
    default_text_with_no_chosen_docs2,
    setDefault_text_with_no_chosen_docs2,
  ] = useState(true);
  const [
    default_text_with_no_chosen_docs1_user,
    setDefault_text_with_no_chosen_docs1_user,
  ] = useState(false);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.uid);
      console.log(data);
      const dataObject = {
        fullName: data.user.displayName,
        firstName: data._tokenResponse.firstName,
        lastName: data._tokenResponse.lastName,
        uid: data.user.uid,
        image: data.user.photoURL,
        email: data.user.email,
      };
      // console.log(data);
      localStorage.setItem("user_data", JSON.stringify(dataObject));
      window.location.reload();
    });
  };
  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem("user_data")));
  }, []);
  const singOutHandler = () => {
    localStorage.clear("user_data");
    window.location.reload();
  };

  const handleCategory = (category) => {
    setCategoryName(category);
  };
  const handleCategory_2 = (category_2) => {
    setCategoryName_2(category_2);
  };
  const toggleWordList = () => {
    setChangeWordList(true);
    setChangeWordList_2(false);
    setDefault_text_with_no_chosen_docs1_user(false);
    setDefault_text_with_no_chosen_docs2(false);
  };
  const toggleWordList_2 = () => {
    setChangeWordList_2(true);
    setChangeWordList(false);
    setDefault_text_with_no_chosen_docs1_user(false);
    setDefault_text_with_no_chosen_docs2(false);
  };
  const openResponsiveSidebar = () => {
    setIsResponsiveSidebarOpen(!isResponsiveSidebarOpen);
  };
  const closeResponsiveSidebar = () => {
    setIsResponsiveSidebarOpen(false);
  };

  return (
    <AppContextEnglishCardApplication.Provider
      value={{
        handleClick,
        singOutHandler,
        value,
        setValue,
        handleCategory,
        categoryName,
        handleCategory_2,
        categoryName_2,
        toggleWordList,
        changeWordList,
        toggleWordList_2,
        changeWordList_2,
        openResponsiveSidebar,
        isResponsiveSidebarOpen,
        setOpenModalEnglishCardApp,
        openModalEnglishCardApp,
        closeResponsiveSidebar,
        default_text_with_no_chosen_docs2,
        default_text_with_no_chosen_docs1_user,
      }}
    >
      {children}
    </AppContextEnglishCardApplication.Provider>
  );
};

export default AppProviderEnglishCardApplication;
