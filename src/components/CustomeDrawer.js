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
import { useRef } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CustomeDrawer = ({ type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    toast.success("Logout successfully");
  }

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
          <div onClick={onOpen} ref={btnRef} className="flex gap-0.5 items-center">
            <IoSettingsOutline className="w-6 h-6 sm:w-7 sm:h-7 md:w-6 md:h-6 mr-2" />
            <span className="text-lg hidden xl:block">Settings</span>
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
        <DrawerContent className="relative !w-[23%] bg-white shadow-lg rounded-lg transition-all duration-300 ease-in-out transform translate-x-0">
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
                Your Name
              </Heading>
            </Center>
            <Center>
              <Text className="text-gray-500 text-lg mt-2 tracking-wide">
                your.email@example.com
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