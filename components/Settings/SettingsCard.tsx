import { useTheme } from "../../theme/ThemeContext";
import { useAccount } from "../../theme/AccountContext";
import { useState } from "react"
import { View, Pressable, Text } from "react-native";

import Avatar from "../Settings/Avatar"
import Account from "../Settings/Account"
import FriendCode from "../Settings/FriendCode"
import Theme from "../Settings/Theme"
import SignUpCard from "./SignUpCard";
import LogInCard from "./LogInCard";




export default function SettingsCard() {
  const { colors } = useTheme();
  const { loggedInStatus, username, email} = useAccount();
  const [ showSignUp, setShowSignUp ] = useState(true)

  return (
    <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, paddingTop: 4, paddingBottom: 4, paddingLeft: 16, paddingRight: 16, borderWidth: 1, borderColor: colors.border }}>
      {(!loggedInStatus) && (
        <View>
          {(showSignUp) && (
            <View>
              <Text style={{ marginTop: 20, marginBottom: 6, fontSize: 11, color: colors.muted, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Sign Up Here</Text> 
              <SignUpCard></SignUpCard>
              <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginTop: 20, marginBottom: 6, fontSize: 11, color: colors.muted, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Already have an account? Log in </Text>
                  <Pressable onPress={() => setShowSignUp(false)} style={{ marginTop: 10, backgroundColor: colors.accent, borderWidth: 0, borderRadius: 14, cursor: "pointer" }}>
                    <Text style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 6, fontSize: 11, color: "#FFFFFF", letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Here</Text>
                </Pressable>
              </View>
            </View>
          )} 
          {(!showSignUp) && (
            <View>
              <Text style={{ marginTop: 20, marginBottom: 6, fontSize: 11, color: colors.muted, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Log In Here</Text> 
              <LogInCard></LogInCard>
              <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginTop: 20, marginBottom: 6, fontSize: 11, color: colors.muted, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Don't have an account? Sign up </Text>
                  <Pressable onPress={() => setShowSignUp(true)} style={{ marginTop: 10, backgroundColor: colors.accent, borderWidth: 0, borderRadius: 14, cursor: "pointer" }}>
                    <Text style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 6, fontSize: 11, color: "#FFFFFF", letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Here</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      )}
      {(loggedInStatus) && (
        <View style={{ paddingTop: 16, paddingBottom: 32, paddingLeft: 20, paddingRight : 20, backgroundColor: colors.bg }}>
          <Avatar name={username} email={email}></Avatar>

          <Text style={{ marginTop: 20, marginBottom: 6, fontSize: 11, color: colors.muted, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Account</Text> 
          <Account></Account>

          <Text style={{ marginTop: 20, marginBottom: 6, fontSize: 11, color: colors.muted, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Friend Code</Text> 
          <FriendCode></FriendCode>

          <Text style={{ marginTop: 20, marginBottom: 6, fontSize: 11, color: colors.muted, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Actions</Text> 
          <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, paddingTop: 4, paddingBottom: 4, paddingLeft: 16, paddingRight: 16, borderWidth: 1, borderColor: colors.border }}>
            <Pressable style={{ width: "100%", backgroundColor: "none", borderWidth: 0, paddingTop: 12, paddingBottom: 12, cursor: "pointer"}}>
              <Text style={{textAlign: "left", fontSize: 14, color: colors.accent, fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>Sign Out</Text>
            </Pressable>
            <View style={{ height: 1, backgroundColor: colors.border, marginLeft: -16, marginRight: -16 }} />            
            <Pressable style={{ width: "100%", backgroundColor: "none", borderWidth: 0, paddingTop: 12, paddingBottom: 12, cursor: "pointer"}}>
              <Text style={{textAlign: "left", fontSize: 14, color: "#B03020", fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>Delete Account</Text>
            </Pressable>
          </View>

        </View> 
      )} 
      <Text style={{ marginTop: 20, marginBottom: 6, fontSize: 11, color: colors.muted, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>Appearance</Text> 
      <Theme></Theme>  
    </View>
  );
}

