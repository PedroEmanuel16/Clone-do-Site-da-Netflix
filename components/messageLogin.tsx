import useCurrentUser from "@/hooks/useCurrentUser";

const MessageLogin = () => {
    const {data: user} = useCurrentUser();

    return (
        <p>Logged in as : {user?.email}</p>
    )
}

export default MessageLogin;