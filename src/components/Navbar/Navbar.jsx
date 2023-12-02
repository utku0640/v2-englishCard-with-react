import React, { useContext, useState } from "react";
import styles from "./navbar.module.css";
import { Avatar } from "@mui/material";
import { AiOutlineAlignCenter } from "react-icons/ai";
import { ChildrenListContext } from "../childrenList/ChildrenList";
import { AppContextEnglishCardApplication } from "../../ContextOfEnglishCard";

const Navbar = () => {
  const {
    value,
    singOutHandler,
    handleClick,
    openResponsiveSidebar,
    setOpenModalEnglishCardApp,
  } = useContext(AppContextEnglishCardApplication);
  const [openDropMenu, setOpenDropMenu] = useState(true);
  const toggleDropMenu = () => {
    setOpenDropMenu(!openDropMenu);
  };

  return (
    <div className={styles.container}>
      {/* <TextAnimation /> */}
      <div className={styles.responsive_container}>
        <div className={styles.responsive_container_card}>
          <button
            onClick={() => {
              openResponsiveSidebar();
              setOpenModalEnglishCardApp(false);
            }}
          >
            <AiOutlineAlignCenter />
          </button>

          <div className={styles.responsive_avatar}>
            <Avatar
              onClick={toggleDropMenu}
              src={value && value.image}
              sx={{ width: "50px", height: "50px", cursor: "pointer" }}
            />

            <div
              className={
                openDropMenu
                  ? styles.responsive_drop_menu_container_none
                  : styles.responsive_drop_menu_container
              }
            >
              <div className={styles.responsive_name_and_email_info}>
                <h2>{value && value.firstName}</h2>
                <h2>{value && value.email}</h2>
              </div>
              {value ? (
                <button
                  className={styles.button_signOut}
                  onClick={singOutHandler}
                >
                  Sign Out
                </button>
              ) : (
                <div onClick={handleClick} className="google-btn">
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* ----------------------------------------------------------------------- */}
        </div>
      </div>
      <div className={styles.container_card}>
        <div className={styles.avatar_div}>
          <h2>
            {value ? (
              `Welcome, ${value.fullName}`
            ) : (
              <div style={{ display: "flex" }}>
                <div onClick={handleClick} className={styles.google_btn}>
                  <div className={styles.google_icon_wrapper}>
                    <img
                      className={styles.google_icon}
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    />
                  </div>

                  <div className={styles.btn_text}>
                    <p>Sign in with google to add your own card</p>
                  </div>
                </div>
              </div>
            )}
          </h2>

          <Avatar
            onClick={toggleDropMenu}
            src={value && value.image}
            sx={{ width: "50px", height: "50px", cursor: "pointer" }}
            className={styles.avatar_circle}
          />
          <div
            className={
              openDropMenu
                ? styles.dropdown_menu_container
                : styles.active_dropdown_menu_container
            }
          >
            <div className={styles.dropdown_menu}>
              {value && (
                <Avatar
                  src={value && value.image}
                  sx={{ width: "50px", height: "50px", marginRight: "20px" }}
                />
              )}
              <div className={styles.name_and_email_info}>
                <h2>{value && value.firstName}</h2>
                <h2>{value && value.email}</h2>
              </div>
            </div>
            {value ? (
              <button
                className={styles.button_signOut}
                onClick={singOutHandler}
              >
                Sign Out
              </button>
            ) : (
              <div onClick={handleClick} className="google-btn">
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
