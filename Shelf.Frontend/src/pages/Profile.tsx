import LogoutButton from "../components/LogoutButton"

const Profile = ({setAuth}: {setAuth: Function}) => {
    return (
        <>
            <div>
                <h1>Profile</h1>
                <LogoutButton setAuth={setAuth}/>
            </div>
        </>
    )
}

export default Profile;