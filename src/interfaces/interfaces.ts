// const mongoose = require('mongoose');
// Interface for creditor/debtors
export interface UserInterfaceMinimal {
  name: string;
  value: string;
}
// Interface for user
export interface UserInterface {
  pubkey: string;
  name: string;
  totalDebt: string;
  debtors: UserInterfaceMinimal[];
  creditors: UserInterfaceMinimal[];
}
// Interface for props
export interface activeUserProp {
  activeUsers: UserInterface[];
}

export interface userProp {
  user: UserInterface;
}

export interface Props {
  activeUsers: UserInterface[];
  updateActiveUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>;
}

export interface newUserProps {
  newUser: string;
  setNewUser: React.Dispatch<React.SetStateAction<string>>;
}

export interface authenticateDialogProps {
  newUser: string;
  activeUsers: UserInterface[];
  updateActiveUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>;
}

export const defaultUser: UserInterface = {
  pubkey: "xxxxxxxxxxxxxxx",
  name: "",
  totalDebt: "",
  creditors: [],
  debtors: [],
};
