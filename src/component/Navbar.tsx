"use client";
import React, { Suspense, useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem } from "@/component/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { clearCookie, getCookie } from "@/lib/cookies";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "@/lib/firebase";
import CustomButton from "./common/CustomButton";
import CustomizedBadges from "./common/CustomizedBadges";

interface UserData{
  name: string;
  email: string;
  uid: string
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState({});

  const getToken = async () => {
    const token = await getCookie("token");
    setUserToken(token  as string)
    setIsAuthenticated(token !== undefined);
  }

  const getUserData = async () => {
    try {
      const docRef = collection(db, userToken);
      const querySnapshot = await getDocs(docRef);
  
      const userData: UserData[] = [];
      querySnapshot.forEach((doc) => {
        userData.push(doc.data() as UserData);
      });
  
      setUserData(userData); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log("userData",userData)
  console.log("userToken",userToken)
  

  useEffect(() => {
    getToken()
    getUserData()
    // eslint-disable-next-line
  },[])

  
  const handleLogout = async () => {
    await clearCookie("token")
  }
  return (
    <>
    {isAuthenticated ?
    
    <Suspense fallback={<p>Profile</p>}>
    <Stack direction={"row"} alignItems={"flex-start"} spacing={2} className="bg-black w-full flex justify-end pt-32 md:p-10 ">
    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    <Link  href="/login" onClick={handleLogout}>
      <CustomButton Color="white" bgColor="green" handleClick={handleLogout} name="Logout"/>
      </Link> 
    </Stack>
    </Suspense>
    : ''}
    <div
    className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
        <Link href={"/shop"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Shop"
          ></MenuItem>
        </Link>
        <Link href={"/contact"}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Contact Us"
            ></MenuItem>
        </Link>  
      <div className=" absolute justify-center top-4 right-10">
      <CustomizedBadges badgeCount={10}  />
      </div>
      </Menu> 
    </div>
    </>

  );
}

export default Navbar;
