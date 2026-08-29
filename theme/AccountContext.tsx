import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AccountCtx {
  accountId: string;
  setAccountId: (id: string) => void;
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  friendCode: string;
  setFriendCode: (friendCode: string) => void;
  loggedInStatus: boolean;
  setLoggedInStatus: (loggedInStatus: boolean) => void;
}




const AccountContext = createContext<AccountCtx>({
  accountId: "",
  setAccountId: () => {},
  username: "",
  setUsername: () => {},
  email: "",
  setEmail: () => {},
  friendCode: "",
  setFriendCode: () => {},
  loggedInStatus: false,
  setLoggedInStatus: () => {}
});

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [accountId, setAccountId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [friendCode, setFriendCode] = useState<string>("");
  const [loggedInStatus, setLoggedInStatus] = useState<boolean>(false)

  useEffect(() => {
    const SyncAccountInfo = async () => {
      if(username != ""){
        await AsyncStorage.setItem("username", username)
      }
      if(accountId != ""){
        await AsyncStorage.setItem("accountId", accountId)
      }
      if(email != ""){
        await AsyncStorage.setItem("email", email)
      }
      if(friendCode != ""){
        await AsyncStorage.setItem("friendCode", friendCode)
      }
      await AsyncStorage.setItem("loggedInStatus", "true")
    }
    if(loggedInStatus){
      SyncAccountInfo()
    }
  }, [loggedInStatus])


  useEffect(() => {
    const GetLocalAccountInfo = async () => {
      var userLoggedIn =  await AsyncStorage.getItem("loggedInStatus")
      if(userLoggedIn == "true") {
        const username = await AsyncStorage.getItem("username") ?? ""
        const email = await AsyncStorage.getItem("email") ?? ""
        const friendCode = await AsyncStorage.getItem("friendCode") ?? ""
        setUsername(username)
        setEmail(email)
        setFriendCode(friendCode)
        setLoggedInStatus(true)
      }
      else {
        setLoggedInStatus(false)
      }
    }
    GetLocalAccountInfo();
  }, []);


  return (
    <AccountContext.Provider value={{ accountId, setAccountId, username, setUsername, email, setEmail, friendCode, setFriendCode, loggedInStatus, setLoggedInStatus }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}
