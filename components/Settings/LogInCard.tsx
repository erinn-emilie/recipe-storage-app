import { useTheme } from "../../theme/ThemeContext";
import { useAccount } from "../../theme/AccountContext";
import { useState, useEffect } from "react";
import { View, Pressable, Text, TextInput } from "react-native";



export default function SignUpCard() {
    const { colors } = useTheme();
    const { setLoggedInStatus, setAccountId, setEmail, setFriendCode, setUsername} = useAccount();


    const [logInError, setLogInError] = useState<string>("");
    const [posUsername, setPosUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [readyToFindUser, setReadyToFindUser] = useState<boolean>(false);

    useEffect(() => {
        if(readyToFindUser){
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({                 
                    "username": posUsername,
                    "password": password,
                })
            })
            .then(response => {
                if(!response.ok){
                    throw new Error(`Server Error: ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                const status = data["status"];
                if(status == "FAILURE"){
                    setLogInError(data["msg"]);
                }
                else {
                    const userData = data["userData"];
                    setUsername(userData["username"]);
                    setEmail(userData["email"]);
                    setAccountId(userData["accountId"]);
                    setFriendCode(userData["friendCode"]);
                    setLoggedInStatus(true);
                }
            })
            .catch(error => {
                setLogInError(error.message)
            })
            setReadyToFindUser(false)
        }
    }, [readyToFindUser])


    return (
        <View style={{ alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 16, paddingVertical: 20, paddingHorizontal: 16, borderWidth: 1, borderColor: colors.border }}>
            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
                <Text style={{ margin: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>Username</Text>
                <TextInput onChangeText={setPosUsername} style={{ width: "80%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 14, fontSize: 14, color: "#1A1410", fontFamily: "Outfit"}}></TextInput>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
                <Text style={{ margin: 6, fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>Password</Text>
                <TextInput onChangeText={setPassword} secureTextEntry={true} style={{ width: "80%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 14, fontSize: 14, color: "#1A1410", fontFamily: "Outfit"}}></TextInput>
            </View>
            {logInError != "" && (
                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
                    <Text style={{ textAlign: "center", color: "#e21818", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit" }}>{logInError}</Text>
                </View>
            )}
            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 5 }}>
                <Pressable onPress={() => setReadyToFindUser(true)} style={{ width: "30%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: 14, cursor: "pointer" }}>
                    <Text style={{ textAlign: "center", color: "#FAF7F2", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "Outfit" }}>Log In</Text>
              </Pressable>
            </View>
        </View>
    )
}