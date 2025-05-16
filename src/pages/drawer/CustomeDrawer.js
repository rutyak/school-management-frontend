import {
  Avatar,
  Button,
  Center,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomeDrawer = ({
  type,
  baseStyle,
  activeStyle,
  active,
  handleLinkClicked,
}) => {
  const [userData, setUserData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    localStorage.removeItem("token");
    toast.success("Logout successfully");
  }

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      const parsedUser = user ? JSON.parse(user) : null;
      setUserData(parsedUser);
    } catch (error) {
      console.log(error);
    }
  }, []);


  return (
    <>
      <WrapItem>
        {type !== "Settings" ? (
          <Avatar
            boxSize={45}
            ref={btnRef}
            borderRadius="50%"
            name="Dan Abrahmov"
            colorScheme="teal"
            onClick={onOpen}
            cursor="pointer"
            src="https://bit.ly/dan-abramov"
            className="transition-tranform duration-300 ease-in-out"
          />
        ) : (
          <div
            ref={btnRef}
            className={`${baseStyle} w-full ${
              active === "Settings" ? activeStyle : ""
            }`}
            onClick={() => {
              handleLinkClicked("Settings");
              onOpen();
            }}
          >
            <IoSettingsOutline className="w-6 h-6 xl:w-7 xl:h-7" />
            <span className="hidden xl:block">Settings</span>
          </div>
        )}
      </WrapItem>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        motionPreset="slideInRight"
      >
        <DrawerOverlay />
        <DrawerContent
          w={{ base: "30%", md: "30%", lg: "23%" }}
          className="relative !w-[300px] bg-white shadow-lg transition-all duration-300 ease-in-out transform translate-x-0"
        >
          <DrawerCloseButton className="absolute top-2 right-6 text-gray-500  py-2 hover:text-gray-700 transition duration-300" />

          <DrawerHeader className="mt-10 text-black">
            <Center>
              <Avatar
                boxSize={200}
                mb={6}
                className="bg-gray-300 text-md border-4 border-white shadow-lg"
              />
            </Center>
            <Center>
              <Heading className="tracking-wider text-xl mt-3 mb-3 font-semibold">
                {userData.username}
              </Heading>
            </Center>
            <Center>
              <Text className="text-gray-500 text-lg mt-2 tracking-wide">
                {userData.email}
              </Text>
            </Center>
          </DrawerHeader>

          <DrawerFooter className="absolute bottom-4 w-[100%]">
            <Button
              onClick={handleLogout}
              className="w-[90%] m-auto px-2 py-3 border rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomeDrawer;
