// Interface for creditor/debtors
export interface UserInterfaceMinimal{
    name: string;
    value: string;
}
// Interface for user
export interface UserInterface{
    name:string;
    id:string;
    totalCredit:string;
    debtors: UserInterfaceMinimal[];
    creditors: UserInterfaceMinimal[];
}
// Interface for props
export interface Props {
    activeUsers: UserInterface[];
    updateActiveUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>
}