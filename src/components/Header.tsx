"use client";
import { useState } from "react";
import classes from "@/components/styles/Header.module.css";
import HeaderList from "./HeaderList";
import useWindowWidth from "../hooks/use-windowWidth";
import Link from "next/link";
import Image from "next/image";
import bars from "img/header/bars-solid.svg";
import x from "img/header/x-solid.svg";
import logo from "img/aily_logo.svg";

function Header() {
  const windowWidth: number = useWindowWidth();
  const [menuShow, setMenuShow] = useState<boolean>(false);

  function menuHandler() {
    setMenuShow(!menuShow);
    console.log(menuShow);
  }

  let header;
  if (windowWidth > 1000) {
    header = (
      <header className={classes.head_wrap}>
        <div className={classes.head}>
          <Link href="/">
            <Image
              src={logo}
              width={100}
              height={100}
              alt="logo"
              className={classes.head_logo}
            />
          </Link>
          <HeaderList ul={classes.head_menu} li={classes.menu} />
        </div>
      </header>
    );
  } else {
    header = (
      <div className={classes.head_wrap_mobile}>
        <header className={classes.head_mobile}>
          <Link href="/">
            <Image
              src={logo}
              width={100}
              height={100}
              alt="logo"
              className={classes.head_logo_s}
            />
          </Link>
          <Image
            src={bars}
            width={100}
            height={100}
            alt="bars"
            onClick={menuHandler}
          />
        </header>
        {menuShow && (
          <div className={classes.mobile_box}>
            <Image
              src={x}
              alt="x"
              width={100}
              height={100}
              onClick={menuHandler}
              className={classes.close}
            />
            <HeaderList
              ul={classes.head_menu_mobile}
              li={classes.menu_mobile}
              onClick={menuHandler}
            />
          </div>
        )}
      </div>
    );
  }
  return header;
}
export default Header;
