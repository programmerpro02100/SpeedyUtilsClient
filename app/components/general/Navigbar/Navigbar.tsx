"use client";

import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import Image from "next/image";
import styles from "./Navigbar.module.css";
import { FaBars } from "react-icons/fa";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { ApiFetch } from "@/utils/ApiFetch";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { useRouter, usePathname } from "next/navigation";

interface User {
  userId: string;
  email: string;
  profilePicture: string;
}

export default function Navigbar() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: any) => state.user.user) as User | null;
  const serverUrl = useSelector((state: any) => state.user.serverUrl);
  const dispatch = useDispatch();
  const [scrolled, setScrolled] = useState(false);

  const loginAction = () => {
    const pathParts = pathname.split("/");

    if (pathParts[1] === "tool" && pathParts.length >= 4) {
      const type = pathParts[2];
      const toolname = pathParts[3];
      localStorage.setItem("type", type);
      localStorage.setItem("toolname", toolname);
    }

    window.location.href = `${serverUrl}/auth/google`;
  };

  const handleNav = (section: string) => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSupport = ()=>{
    if (pathname !== "/legal") {
      router.push("/legal");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  useEffect(() => {
    ApiFetch("/auth/check")
      .then((response) => {
        if (!response.ok) throw new Error("User not found");
        return response.json();
      })
      .then((data) => dispatch(setUser(data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOut = () => {
    ApiFetch("/auth/logout")
      .then(() => dispatch(setUser(null)))
      .catch((err) => console.log(err));
  };

  return (
    <Navbar expand="lg" className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`} fixed="top">
      <Container>
        <Navbar.Brand className={styles.logo} onClick={() => router.push("/")}>
          SpeedyUtils
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" className={styles.toggleBtn}>
          <FaBars />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          <Nav className={styles.navLinks}>
            <Nav.Link onClick={() => handleNav("features")} className={styles.navItem}>
              Features
            </Nav.Link>
            <Nav.Link onClick={() => handleNav("toolbox")} className={styles.navItem}>
              Tools
            </Nav.Link>
            <Nav.Link onClick={handleSupport} className={styles.navItem}>
              Support
            </Nav.Link>
            <Nav.Link className={styles.navItem}>
              <DarkModeToggle />
            </Nav.Link>
            {user ? (
              <NavDropdown
                title={
                  <Image
                    src={user.profilePicture}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.profilePic}
                  />
                }
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link onClick={loginAction} className={styles.navItem}>
                <Button>Log In</Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
