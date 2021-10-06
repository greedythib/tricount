interface UserInterface{
    user:{
        name: string;
        age: number;
        married: boolean;
    }
}

export default function UserInformation(
    {user,}: UserInterface){
    return (
        <div>
            <p> Name: {user.name} </p>
            <p> Age: {user.age} </p>
            <p> Married? {user.married? <span>Yes</span>: <span>No</span>} </p>
        </div>
    )
}

// export default UserInformation;