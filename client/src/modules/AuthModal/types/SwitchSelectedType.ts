export type SelectedType = "login" | "signup" | "emailMessage";

export type SwitchSelectedType = {
  onSwitchSelect: (select: SelectedType) => void;
};

export type CloseAuthModalType = {
  closeAuthModal: () => void;
};
