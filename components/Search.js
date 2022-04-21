import Link from "next/link";
import styles from './css/Nav.module.css'
import LogButton from './Login'
import { React, useState } from "react";
import Search from './SearchModule.js'

export default function Nav() {

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    var lowerCase = e.target.value
    setInputText(lowerCase);
  };

  return (
    <div className={styles.search_nav_center_div}>
      <div className={styles.esp_nav_search}>
        <div>
          <input className={styles.input_search_nav}
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            label="Search"
            placeholder="Search"  
          />
        </div>
        <Search input={inputText} />
      </div>
    </div>
  );
}