import styles from "./UserIcon.module.scss";
import { FC, useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { DropDown } from './../../dropdown/DropDown';

export const UserIcon: FC = () => {
  const [isShow, setIsShow] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const hideDropDown = () => {
    setIsShow(false);
  }

  return (
    <>
      <div
        ref={iconRef}
        className={styles['user-icon-cont']}
      >
        <FaRegUserCircle
          style={{ color: "var(--blue02)", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsShow(true)}
        />
      </div>
      <DropDown
        isShow={isShow}
        hideDropDown={hideDropDown}
        parentElement={iconRef}
      />
    </>
  );
};
