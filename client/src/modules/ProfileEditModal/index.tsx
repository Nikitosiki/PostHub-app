import { FC, useRef, useState } from "react";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { UseDisclosureReturn } from "@nextui-org/use-disclosure";

import { useAuth } from "src/contexts";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ProfileSchema, ProfileSchemaType } from "src/validations";

type ProfileModalProps = Pick<UseDisclosureReturn, "isOpen" | "onOpenChange">;
const ProfileEditModal: FC<ProfileModalProps> = ({ isOpen, onOpenChange }) => {
  const nameRef = useRef<HTMLSpanElement>(null);

  const [imageUrl, setImageUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: yupResolver(ProfileSchema),
  });

  const closeAuthModal = () => {
    isOpen && onOpenChange();
  };

  const handleButtonCheck = () => {
    if (imageUrl) {
      setIsLoading(true);
      checkImageSize(imageUrl);
    }
  };

  const checkImageSize = async (url: string) => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      const maxWidth = 512;
      const maxHeight = 512;

      if (img.width <= maxWidth && img.height <= maxHeight) {
        setIsValid(true);
      } else {
        setIsValid(false);
        setError("imageUrl", {
          message: "The image must be less than 512 x 512",
        });
      }
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsValid(false);
      setError("imageUrl", {
        message: "Error loading image",
      });
      setIsLoading(false);
    };
  };

  const onSubmit = async (submitData: ProfileSchemaType) => {
    // const { error } = await signInEmailAndPassword(
    //   submitData.email,
    //   submitData.password,
    // );
    // if (error) {
    //   setError("password", {
    //     type: error?.status?.toString(),
    //     message: error?.message,
    //   });
    // } else {
    //   closeAuthModal();
    //   location.reload();
    // }
  };

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            backdrop="opaque"
            hideCloseButton
            className="bg-background"
          >
            <ModalContent>
              <ModalHeader>Edit Profile</ModalHeader>

              <ModalBody>
                <div className="flex flex-row items-center gap-4">
                  <Avatar
                    isBordered
                    size="lg"
                    src={isValid ? imageUrl : user.image_url ?? ""}
                    className="shrink-0 text-tiny ring-primary"
                  />
                  <div className="flex flex-col flex-nowrap overflow-hidden">
                    <span ref={nameRef} className="truncate font-bold">
                      {user.name}
                    </span>
                    <span className="text-[0.6rem] text-default-foreground/60">
                      id: {user.id}
                    </span>
                  </div>
                </div>
              </ModalBody>

              <ModalBody className="mt-4">
                <div className="inline-flex gap-2">
                  <Input
                    type="text"
                    label="Avatar url"
                    placeholder="https://"
                    onValueChange={(val) => {
                      reset();
                      setImageUrl(val);
                      setIsValid(false);
                    }}
                    {...register("imageUrl")}
                    errorMessage={errors.imageUrl?.message}
                  />
                  <Button
                    isLoading={isLoading}
                    isIconOnly
                    onPress={handleButtonCheck}
                    className="h-14 w-20"
                  >
                    Check
                  </Button>
                </div>
                <Input
                  type="name"
                  label="Name"
                  onValueChange={(value) => {
                    nameRef.current && (nameRef.current.textContent = value);
                  }}
                  {...register("name")}
                  errorMessage={errors.name?.message}
                />
                <Input isDisabled label="Email" value={user.email} />
              </ModalBody>

              <ModalFooter className="mt-4">
                <Button variant="light" onClick={closeAuthModal}>
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </form>
      )}
    </>
  );
};

export default ProfileEditModal;
