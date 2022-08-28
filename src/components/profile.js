import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";

const axios = require('axios');


const Profile = () => {
    const {user, isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const [token, setToken] = useState(null)

    // if (isLoading) {
    //     return <div>Loading ...</div>;
    // }

    console.log(user)
    console.log(isAuthenticated)

    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-4gyuwauo.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `banco-austral.web.app/auth0`,
                    scope: "openid%20email%20profile"
                });

                console.log(accessToken)
                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const {user_metadata} = await metadataResponse.json();

                setUserMetadata(user_metadata);
                setToken(accessToken)
            } catch (e) {
                console.log(e.message);
            }
        };

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    function handleFetch() {
        axios.get("https://peaceful-harbor-44195.herokuapp.com/users",

            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        ).then(res => {
            console.log(res)
        })
    }

    function handleFetchMe() {
        axios.get("https://peaceful-harbor-44195.herokuapp.com/users/me",

            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        ).then(res => {
            console.log(res)
        })
    }

    function handleFetchDeleteMe() {
        axios.delete("https://peaceful-harbor-44195.herokuapp.com/users/delete/me",

            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            }
        ).then(res => {
            console.log(res)
        })
    }

    return (
        isAuthenticated && (
            <div>
                <button onClick={handleFetchDeleteMe}>Delete Me</button>
                <button onClick={handleFetch}>Fetch Users</button>
                <button onClick={handleFetchMe}>Fetch Me</button>
                <img src={user.picture} alt={user.name} referrerPolicy="no-referrer"/>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <h3>User Metadata</h3>
                {userMetadata ? (
                    <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                ) : (
                    "No user metadata defined"
                )}
            </div>
        )
    );
};

export default Profile;
