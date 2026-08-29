import { useState } from "react";
import { useTheme, THEMES, ThemeId } from "../../theme/ThemeContext";
import { useAccount } from "../../theme/AccountContext"
import { View, Text, Pressable, TextInput } from "react-native";
import EditableField from "../EditableField";




export default function Account({}:{}){
    const { colors } = useTheme();
    const { accountId, username, email, setAccountId, setUsername, setEmail } = useAccount();

    const [editingField, setEditingField] = useState<string | null>(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, paddingTop: 4, paddingBottom: 4, paddingLeft: 16, paddingRight: 16, borderWidth: 1, borderColor: colors.border }}>
            <EditableField label="Name" value={username} editing={editingField === "name"} onEdit={() => setEditingField("name")} onChange={setUsername} onDone={() => setEditingField(null)} />
            <View style={{ height: 1, backgroundColor: colors.border, marginLeft: -16, marginRight: -16 }} />  
            <EditableField label="Email" value={email} editing={editingField === "email"} onEdit={() => setEditingField("email")} onChange={setEmail} onDone={() => setEditingField(null)} />
            <View style={{ height: 1, backgroundColor: colors.border, marginLeft: -16, marginRight: -16 }} />            
            <View style={{ padding: 13 }}>
                <View style={{  justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 14, color: "#1A1410" }}>Password</Text>
                    <Pressable onPress={() => setShowPasswordForm(!showPasswordForm)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer" }}>
                    <Text style={{ fontSize: 13, color: colors.primary, fontWeight: 600, fontFamily: "Outfit" }}>Change</Text>
                    </Pressable>
                </View>
                {showPasswordForm && (
                    <View style={{ marginTop: 12,  flexDirection: "column", gap: 10 }}>
                        <TextInput secureTextEntry={true} placeholder="New password" value={newPassword} onChangeText={setNewPassword} style={{ width: "100%", backgroundColor: colors.bg, borderColor: colors.border, borderWidth: 1, borderRadius: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, fontSize: 14, color: "#1A1410", fontFamily: "Outfit", boxSizing: "border-box" }} />
                        <TextInput  secureTextEntry={true} placeholder="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} style={{ width: "100%", backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, fontSize: 14, color: "#1A1410", fontFamily: "Outfit", boxSizing: "border-box" }} />
                        <View style={{  gap: 8 }}>
                            <Pressable onPress={() => { setShowPasswordForm(false); setNewPassword(""); setConfirmPassword(""); }} style={{ flex: 1, backgroundColor: `${colors.primary}14`, borderWidth: 0, borderRadius: 10, padding: 9 }}>
                            <Text style={{ fontSize: 13, fontWeight: 600, color: colors.textSoft, fontFamily: "Outfit"}}></Text>Cancel</Pressable>
                            <Pressable onPress={() => { setShowPasswordForm(false); setNewPassword(""); setConfirmPassword(""); }} style={{ flex: 1, backgroundColor: colors.primary, borderWidth: 0, borderRadius: 10, padding: 9, cursor: "pointer" }}>
                            <Text style={{fontSize: 13, fontWeight: 600, color: "#FAF7F2",  fontFamily: "Outfit"}}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </View>
        </View>
    )
}
