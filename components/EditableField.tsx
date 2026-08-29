import { useState } from "react";
import { useTheme, THEMES, ThemeId } from "../theme/ThemeContext";
import { View, Text, Pressable, TextInput } from "react-native";


interface Props {
    label: string;
    value: string;
    editing: boolean;
    onEdit: () => void;
    onChange: (v: string) => void;
    onDone: () => void;

}


export default function EditableField({label, value, editing, onEdit, onChange, onDone}: Props) {
  const { colors } = useTheme();

  return (
    <View style={{ paddingTop: 13, paddingBottom: 13 }}>
      <View style={{  justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontSize: 14, color: "#1A1410" }}>{label}</Text>
        {!editing ? (
          <View style={{  alignItems: "center", gap: 10 }}>
            <Text style={{ fontSize: 13, color: colors.muted }}>{value}</Text>
            <Pressable onPress={onEdit} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer" }}>
              <Text style={{fontSize: 13, color: colors.primary, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Edit</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={onDone} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer" }}>
            <Text style={{fontSize: 13, color: colors.accent, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Done</Text>
          </Pressable>
        )}
      </View>
      {editing && (
        <TextInput
          value={value}
          onChangeText={onChange}
          autoFocus
          style={{ width: "100%", backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box", marginTop: 10 }}
        />
      )}
    </View>
  );
}