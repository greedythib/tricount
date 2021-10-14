const mongoose = require('mongoose');
// Interface for creditor/debtors
export interface UserInterfaceMinimal {
    name: string;
    value: string;
}
// Interface for user
export interface UserInterface {
    _id: string;
    id:string;
    name:string;
    totalCredit:string;
    debtors: UserInterfaceMinimal[];
    creditors: UserInterfaceMinimal[];
}
// Interface for props
export interface activeUserProp{
    activeUsers: UserInterface[];
}

export interface userProp{
    user: UserInterface;
}

export interface Props {
    activeUsers: UserInterface[];
    updateActiveUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>
}