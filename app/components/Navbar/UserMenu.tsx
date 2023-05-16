"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState, useCallback } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { NavbarProps } from "./Navbar";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps extends NavbarProps {}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const RegisterModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const rentModal = useRentModal();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const router = useRouter();

  const onRent = useCallback(() => {
    if (!currentUser) return LoginModal.onOpen();

    //open rent modal
    rentModal.onOpen();
  }, [currentUser, LoginModal, rentModal]);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
          onClick={onRent}>
          Airbnb your home
        </div>
        <div
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row gap-3 rounded-full cursor-pointer hover:shadow-md transition items-center'
          onClick={toggleOpen}>
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen ? (
        <div className='absolute rounded-lg shadow-md w-[40vw] md:w-3/4 bg-white border-gray-300 border-[1px] overflow-hidden right-0 top-[3.3rem] text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push(`/trips`)}
                  label='My Trips'
                />
                <MenuItem
                  onClick={() => router.push(`/favourites`)}
                  label='My Favourites'
                />
                <MenuItem
                  onClick={() => router.push(`/reservations`)}
                  label='My Reservations'
                />
                <MenuItem
                  onClick={() => router.push(`/properties`)}
                  label='My Properties'
                />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label='Airbnb my home'
                />
                <MenuItem
                  onClick={() => signOut()}
                  label='Logout'
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={LoginModal.onOpen}
                  label='Login'
                />
                <MenuItem
                  onClick={RegisterModal.onOpen}
                  label='Sign Up'
                />
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserMenu;
