import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { useContext, useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiUser } from "react-icons/bi";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { AuthContext } from "../auth/AuthProvider";
import { IProfile } from "../interfaces/i-user";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../redux/services/userApi";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const auth = useContext(AuthContext);
  const {
    isOpen: isOpenLogout,
    onOpen: onOpenLogout,
    onClose: onCloseLogout,
  } = useDisclosure();
  const cancelLogoutRef = useRef(null);
  const {
    isOpen: isOpenProfile,
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
  } = useDisclosure();

  const finalRef = useRef(null);
  const toast = useToast();

  const [updateProfile] = useUpdateProfileMutation();

  const { data: profile } = useProfileQuery("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<IProfile>();

  useEffect(() => {
    if (profile) {
      reset({
        fullname: profile.fullname,
        email: profile.email,
        phoneNumber: profile.phoneNumber,
        gender: profile.gender,
        birthday: profile.birthday
          ? format(profile.birthday, "yyyy-MM-dd")
          : "",
        address: profile.address,
      });
    }
  }, [profile, reset]);

  const onSubmitProfile: SubmitHandler<IProfile> = (data) => {
    toast.promise(updateProfile(data).unwrap(), {
      success: {
        title: "Success",
        description: "Update profile success",
      },
      error: {
        title: "Error",
        description: "Update profile error",
      },
      loading: {
        title: "Processing...",
        description: "Please wait",
      },
    });
  };

  if (!auth) {
    throw new Error("Can not connect to Auth context");
  }

  return (
    <>
      <Container maxW={"900px"} position={"sticky"} top={0} zIndex={2}>
        <Box
          bg={useColorModeValue("gray.400", "gray.700")}
          px={4}
          my={4}
          borderRadius={"5"}
        >
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            {/* LEFT SIDE */}
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              gap={3}
              display={{ base: "none", sm: "flex" }}
            >
              <img
                src="/todo-app-logo.png"
                alt="app_logo"
                width={50}
                height={50}
                className="min-w-[50px]"
              />
              <Text fontSize={"xx-large"} fontWeight={"bold"} ml={2}>
                Todo APP
              </Text>
            </Flex>

            {/* RIGHT SIDE */}
            <Flex alignItems={"center"} gap={3}>
              <Text fontSize={"lg"} fontWeight={500}>
                Daily Tasks
              </Text>
              {/* Toggle Color Mode */}
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
              </Button>
              <Popover>
                <PopoverTrigger>
                  <Button>
                    <BiUser></BiUser>
                  </Button>
                </PopoverTrigger>
                <Portal>
                  <PopoverContent w={"200px"}>
                    <PopoverArrow />
                    <PopoverHeader>Account</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Flex flexDir={"column"} gap={2}>
                        <Box cursor={"pointer"} onClick={() => onOpenProfile()}>
                          Profile
                        </Box>
                        <Box cursor={"pointer"} onClick={() => onOpenLogout()}>
                          Logout
                        </Box>
                      </Flex>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </Flex>
          </Flex>
        </Box>
      </Container>
      <AlertDialog
        isOpen={isOpenLogout}
        leastDestructiveRef={cancelLogoutRef}
        onClose={onCloseLogout}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm logout?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to logout? You can't undo this action
              afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelLogoutRef} onClick={onCloseLogout}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => auth.handleLogout()}
                ml={3}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpenProfile}
        onClose={onCloseProfile}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your profile</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmitProfile)}>
            <ModalBody pb={6}>
              <Text color={"gray.400"}>Email: {profile?.email}</Text>
              <Text color={"gray.400"}>Username: {profile?.username}</Text>

              <FormControl mt={4}>
                <FormLabel>Fullname</FormLabel>
                <Input
                  {...register("fullname", { required: true, minLength: 4 })}
                />
                {errors.fullname && (
                  <FormErrorMessage>Fullname is required</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Phone</FormLabel>
                <Input {...register("phoneNumber")} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Birthday</FormLabel>
                <Input {...register("birthday")} type="date" />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  onChange={(selectedGender) => {
                    reset({
                      gender: selectedGender,
                    });
                  }}
                  value={getValues("gender")}
                >
                  <Stack direction="row">
                    <Radio value="M">Male</Radio>
                    <Radio value="F">Female</Radio>
                    <Radio value="O">Other</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Address</FormLabel>
                <Textarea {...register("address")} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onCloseProfile} type="button">
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
