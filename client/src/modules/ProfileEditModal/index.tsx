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
import { updateUserById } from "src/services/supabase/user";
import { useReload } from "src/hooks";

type ProfileModalProps = Pick<UseDisclosureReturn, "isOpen" | "onOpenChange">;
const ProfileEditModal: FC<ProfileModalProps> = ({ isOpen, onOpenChange }) => {
  const nameRef = useRef<HTMLSpanElement>(null);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [verifImageUrl, setVerifImageUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const { reload } = useReload();

  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      name: user?.name,
    },
  });

  const closeAuthModal = () => {
    isOpen && onOpenChange();
  };

  const handleButtonCheck = async () => {
    if (imageUrl) {
      setIsLoading(true);
      if (await isImageValid(imageUrl)) setVerifImageUrl(imageUrl);
      setIsLoading(false);
    }
  };

  const isImageValid = async (url: string): Promise<boolean> => {
    try {
      const img = new Image();
      img.src = url;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      if (img.width > 512 || img.height > 512) {
        setError("imageUrl", {
          message: "The image must be less than 512 x 512",
        });
        return false;
      }

      const startTime = performance.now();
      await new Promise((resolve) => setTimeout(resolve, 0));
      const endTime = performance.now();
      const loadingTime = endTime - startTime;

      if (loadingTime > 2000) {
        setError("imageUrl", {
          message: "Failed to load this image",
        });
        return false;
      }

      return true;
    } catch (error) {
      setError("imageUrl", {
        message: "Failed to load this image",
      });
      return false;
    }
  };

  const onSubmit = async (submitData: ProfileSchemaType) => {
    if (!user) return;
    updateUserById(user?.id, submitData.name, verifImageUrl).then((response) => {
      if (response) {
        reload();
        closeAuthModal();
      }
    });
  };

  return (
    <>
      {user && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="center"
          backdrop="opaque"
          hideCloseButton
          className="bg-background"
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <ModalContent>
              <ModalHeader>Edit Profile</ModalHeader>

              <ModalBody>
                <div className="flex flex-row items-center gap-4">
                  <Avatar
                    isBordered
                    size="lg"
                    src={verifImageUrl ?? user.image_url ?? ""}
                    imgProps={{referrerPolicy: "no-referrer"}}
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
                      // reset();
                      clearErrors("imageUrl");
                      setImageUrl(val);
                      // setIsValid(false);
                    }}
                    // {...register("imageUrl")}
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
                  placeholder="name"
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
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProfileEditModal;
