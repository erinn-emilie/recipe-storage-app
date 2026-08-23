import { useState } from "react";
import StarRating from "../components/StarRating";
import { useTheme, THEMES, ThemeId } from "../theme/ThemeContext";
import { View, Pressable, Text, TextInput, Image } from "react-native";
import Svg, { Path, Line, Polyline, Circle, Rect } from "react-native-svg";

interface Memory {
  id: string;
  title: string;
  date: string;
  chef: string;
  image: string;
  notes: string;
  rating: number;
  friendRatings: { name: string; rating: number }[];
}

const memories: Memory[] = [
  {
    id: "m1",
    title: "Moroccan Night",
    date: "November 3, 2024",
    chef: "Me",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=500&fit=crop&auto=format",
    notes: "First time making the tagine for guests. Six people, ate every last bit. Served with flatbread and a good bottle of Grenache.",
    rating: 5,
    friendRatings: [
      { name: "Elena R.", rating: 5 },
      { name: "Marcus W.", rating: 5 },
    ],
  },
  {
    id: "m2",
    title: "Cookie Sunday",
    date: "September 22, 2024",
    chef: "Me",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=500&fit=crop&auto=format",
    notes: "Used 48-hour rested dough. Pressed extra chocolate in right after baking. Priya's batch went faster than mine — will make double next time.",
    rating: 5,
    friendRatings: [{ name: "Priya K.", rating: 5 }],
  },
  {
    id: "m3",
    title: "Quick Weeknight Dinner",
    date: "October 18, 2024",
    chef: "Me",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop&auto=format",
    notes: "The cucumber salad alongside grilled chicken. Done in 20 minutes. Marcus had never had it before.",
    rating: 4,
    friendRatings: [],
  },
];


export default function MemoriesScreen() {
  const { colors, themeId, setThemeId } = useTheme();
  const [tab, setTab] = useState<"journal" | "settings">("journal");
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Settings state
  const [name, setName] = useState("Jordan Lee");
  const [email, setEmail] = useState("jordan@email.com");
  const [editingField, setEditingField] = useState<string | null>(null);
  const [friendCode] = useState("DISH-4827");
  const [codeCopied, setCodeCopied] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const copyFriendCode = () => {
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <View style={{ backgroundColor: colors.bg, minHeight: "100%" }}>
      {/* Header */}
      <View style={{ paddingTop: 16, paddingLeft: 20, paddingRight: 20 }}>
        <Text style={{ margin: 0, fontSize: 12, color: colors.muted, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500 }}>
          {tab === "journal" ? "What I've Made" : "Account"}
        </Text>
        <View style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
          <Text style={{ marginTop: 2, fontSize: 28, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>
            {tab === "journal" ? "Meal Journal" : "Settings"}
          </Text>
          {tab === "journal" && (
            <Pressable
              onPress={() => setShowAddMemory(true)}
              style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primary, borderWidth: 0,  alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FAF7F2" strokeWidth={2.5}><Line x1="12" y1="5" x2="12" y2="19"/><Line x1="5" y1="12" x2="19" y2="12"/></Svg>
            </Pressable>
          )}
        </View>
      </View>

      {/* Tab switcher */}
      <View style={{  paddingTop: 14, paddingLeft: 20, paddingRight: 20, gap: 0, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.bg }}>
        {[{ id: "journal", label: "Journal" }, { id: "settings", label: "Settings" }].map((t) => (
          <Pressable key={t.id} onPress={() => setTab(t.id as any)} style={{ paddingTop: 10, paddingLeft: 18, paddingRight: 18, paddingBottom: 10, borderWidth: 0, cursor: "pointer", borderBottomWidth: 2, borderBottomColor: tab === t.id ? colors.primary : "transparent", marginBottom: -1 }}>
            <Text style={{ fontSize: 14, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? colors.primary : colors.muted, fontFamily: "'Outfit', sans-serif" }}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* ── JOURNAL TAB ── */}
      {tab === "journal" && (
        <View style={{ padding: "16px 20px" }}>
          {memories.map((memory) => (
            <Pressable
              key={memory.id}
              style={{ backgroundColor: "#FFFFFF", borderRadius: 18, overflow: "hidden", marginBottom: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", cursor: "pointer" }}
              onPress={() => setExpanded(expanded === memory.id ? null : memory.id)}
            >
              <View style={{ position: "relative", height: expanded === memory.id ? 160 : 120, backgroundColor: "#E8E0D5" }}>
                <Image src={memory.image} alt={memory.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <View style={{ position: "absolute", inset: 0, backgroundColor: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55) 100%)" }} />
                <View style={{ position: "absolute", bottom: 12, left: 14, right: 14,  justifyContent: "space-between", alignItems: "flex-end" }}>
                  <View>
                    <Text style={{ margin: 0, fontSize: 17, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#FFFFFF" }}>{memory.title}</Text>
                    <Text style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(250,247,242,0.8)" }}>{memory.date} · Chef: {memory.chef}</Text>
                  </View>
                  <StarRating rating={memory.rating} size={13} />
                </View>
              </View>
              {expanded === memory.id && (
                <View style={{ padding: "14px" }}>
                  <Text style={{ margin: "0 0 12px", fontSize: 13, color: colors.textSoft, fontStyle: "italic", fontFamily: "'Fraunces', serif" }}>"{memory.notes}"</Text>
                  {memory.friendRatings.length > 0 && (
                    <View style={{ borderTopWidth: 1, borderTopColor: colors.border,paddingTop: 10 }}>
                      <Text style={{ marginBottom: 8, fontSize: 10, color: colors.muted, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 600 }}>Friend Ratings</Text>
                      {memory.friendRatings.map((fr) => (
                        <View key={fr.name} style={{  justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <Text style={{ fontSize: 13, color: "#1A1410" }}>{fr.name}</Text>
                          <StarRating rating={fr.rating} size={12} />
                        </View>
                      ))}
                    </View>
                  )}
                  <View style={{  gap: 8, marginTop: 12 }}>
                    <Pressable style={{ flex: 1, backgroundColor: `${colors.primary}12`, borderWidth: 0, borderRadius: 10, padding: "9px", cursor: "pointer"}}>
                      <Text style={{fontSize: 12, fontWeight: 600, color: colors.primary, fontFamily: "'Outfit', sans-serif"}}>Edit</Text>
                    </Pressable>
                    <Pressable style={{ flex: 1, backgroundColor: `${colors.primary}12`, borderWidth: 0, borderRadius: 10, padding: 9, cursor: "pointer"}}>
                      <Text style={{fontSize: 12, fontWeight: 600, color: colors.primary, fontFamily: "'Outfit', sans-serif"}}>Share</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      )}

      {/* ── SETTINGS TAB ── */}
      {tab === "settings" && (
        <View style={{ padding: "16px 20px 32px", backgroundColor: colors.bg }}>

          {/* Profile avatar */}
          <View style={{  flexDirection: "column", alignItems: "center", paddingTop: 12, paddingBottom: 20 }}>
            <View style={{ width: 72, height: 72, borderRadius: 22, backgroundColor: colors.primary,  alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
              <Text style={{ fontSize: 26, fontWeight: 700, color: "#FAF7F2", fontFamily: "'Fraunces', serif" }}>JL</Text>
            </View>
            <Text style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#1A1410", fontFamily: "'Fraunces', serif" }}>{name}</Text>
            <Text style={{ marginTop: 3, fontSize: 12, color: colors.muted }}>{email}</Text>
          </View>

          {/* Account section */}
          <SectionLabel colors={colors}>Account</SectionLabel>
          <SettingsCard colors={colors}>
            <EditableField label="Name" value={name} editing={editingField === "name"} onEdit={() => setEditingField("name")} onChange={setName} onDone={() => setEditingField(null)} colors={colors} />
            <Divider colors={colors} />
            <EditableField label="Email" value={email} editing={editingField === "email"} onEdit={() => setEditingField("email")} onChange={setEmail} onDone={() => setEditingField(null)} type="email" colors={colors} />
            <Divider colors={colors} />
            <View style={{ padding: 13 }}>
              <View style={{  justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 14, color: "#1A1410" }}>Password</Text>
                <Pressable onPress={() => setShowPasswordForm(!showPasswordForm)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer" }}>
                  <Text style={{ fontSize: 13, color: colors.primary, fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>Change</Text>
                </Pressable>
              </View>
              {showPasswordForm && (
                <View style={{ marginTop: 12,  flexDirection: "column", gap: 10 }}>
                  <TextInput secureTextEntry={true} placeholder="New password" value={newPassword} onChangeText={setNewPassword} style={{ width: "100%", backgroundColor: colors.bg, borderColor: colors.border, borderWidth: 1, borderRadius: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
                  <TextInput  secureTextEntry={true} placeholder="Confirm password" value={confirmPassword} onChangeText={setConfirmPassword} style={{ width: "100%", backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, borderRadius: 10, paddingTop: 10, paddingBottom: 10, paddingLeft: 12, paddingRight: 12, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
                  <View style={{  gap: 8 }}>
                    <Pressable onPress={() => { setShowPasswordForm(false); setNewPassword(""); setConfirmPassword(""); }} style={{ flex: 1, backgroundColor: `${colors.primary}14`, borderWidth: 0, borderRadius: 10, padding: 9 }}>
                      <Text style={{ fontSize: 13, fontWeight: 600, color: colors.textSoft, fontFamily: "'Outfit', sans-serif"}}></Text>Cancel</Pressable>
                    <Pressable onPress={() => { setShowPasswordForm(false); setNewPassword(""); setConfirmPassword(""); }} style={{ flex: 1, backgroundColor: colors.primary, borderWidth: 0, borderRadius: 10, padding: 9, cursor: "pointer" }}>
                      <Text style={{fontSize: 13, fontWeight: 600, color: "#FAF7F2",  fontFamily: "'Outfit', sans-serif"}}>Save</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </View>
          </SettingsCard>

          {/* Friend Code */}
          <SectionLabel colors={colors}>Friends</SectionLabel>
          <SettingsCard colors={colors}>
            <View style={{ padding: "4px 0" }}>
              <Text style={{ marginBottom: 6, fontSize: 12, color: colors.muted, fontWeight: 500 }}>Your Friend Code</Text>
              <Text style={{ marginBottom: 10, fontSize: 13, color: colors.textSoft }}>
                Share this code with people you know so they can add you. Only friends you've approved can see your recipes.
              </Text>
              <View style={{  alignItems: "center", gap: 10 }}>
                <View style={{ flex: 1, backgroundColor: `${colors.primary}10`, borderRadius: 12, paddingTop: 12, paddingBottom: 12, paddingLeft: 14, paddingRight: 14, alignItems: "center", gap: 8 }}>
                  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth={2}><Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><Circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></Svg>
                  <Text style={{ fontSize: 16, fontWeight: 700, color: colors.primary, letterSpacing: 2, fontFamily: "'Outfit', sans-serif" }}>{friendCode}</Text>
                </View>
                <Pressable onPress={copyFriendCode} style={{ paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, backgroundColor: codeCopied ? colors.primary : "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, cursor: "pointer" }}>
                  <Text style={{ fontSize: 13, fontWeight: 600, color: codeCopied ? "#FAF7F2" : colors.primary, fontFamily: "'Outfit', sans-serif"}}>{codeCopied ? "Copied!" : "Copy"}</Text>
                </Pressable>
              </View>
            </View>
          </SettingsCard>

          {/* Theme */}
          <SectionLabel colors={colors}>Appearance</SectionLabel>
          <SettingsCard colors={colors}>
            <Text style={{ marginBottom: 12, fontSize: 12, color: colors.muted, fontWeight: 500 }}>App Theme</Text>
            <View style={{ gap: 10 }}>
              {(Object.entries(THEMES) as [ThemeId, typeof THEMES[ThemeId]][]).map(([id, t]) => (
                <Pressable
                  key={id}
                  onPress={() => setThemeId(id)}
                  style={{ backgroundColor: t.colors.bg, borderWidth: 2, borderColor: themeId === id ? t.colors.primary : colors.border, borderRadius: 14, padding: "12px", cursor: "pointer", position: "relative" }}
                >
                  <View style={{  gap: 5, marginBottom: 8 }}>
                    {t.preview.map((color, i) => (
                      <View key={i} style={{ width: i === 0 ? 24 : 16, height: 24, borderRadius: 6, backgroundColor: color, borderWidth: 1, borderColor: "rgba(0,0,0,0.06)" }} />
                    ))}
                  </View>
                  <Text style={{ margin: 0, fontSize: 13, fontWeight: 600, color: t.colors.primary, fontFamily: "'Outfit', sans-serif" }}>{t.label}</Text>
                  {themeId === id && (
                    <View style={{ position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: 9, backgroundColor: t.colors.primary,  alignItems: "center", justifyContent: "center" }}>
                      <Svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={3}><Polyline points="20 6 9 17 4 12"/></Svg>
                    </View>
                  )}
                </Pressable>
              ))}
            </View>
          </SettingsCard>

          {/* Account Actions */}
          <SectionLabel colors={colors}>Account Actions</SectionLabel>
          <SettingsCard colors={colors}>
            <Pressable style={{ width: "100%", backgroundColor: "none", borderWidth: 0, padding: "12px 0", cursor: "pointer"}}>
              <Text style={{textAlign: "left", fontSize: 14, color: colors.accent, fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>Sign Out</Text>
            </Pressable>
            <Divider colors={colors} />
            <Pressable style={{ width: "100%", backgroundColor: "none", borderWidth: 0, padding: "12px 0", cursor: "pointer"}}>
              <Text style={{textAlign: "left", fontSize: 14, color: "#B03020", fontWeight: 500, fontFamily: "'Outfit', sans-serif" }}>Delete Account</Text>
            </Pressable>
          </SettingsCard>

        </View>
      )}

      {/* Add memory modal */}
      {showAddMemory && (
        <View style={{ position: "absolute", inset: 0, backgroundColor: "rgba(26,20,16,0.6)",  alignItems: "flex-end", zIndex: 50 }}>
          <View style={{ backgroundColor: colors.bg, borderRadius: "24px 24px 0 0", width: "100%", padding: "24px 20px 32px" }}>
            <View style={{  justifyContent: "space-between", marginBottom: 20 }}>
              <Text style={{ margin: 0, fontSize: 20, fontFamily: "'Fraunces', serif", fontWeight: 400, color: "#1A1410" }}>Log a Memory</Text>
              <Pressable onPress={() => setShowAddMemory(false)} style={{ backgroundColor: "none", borderWidth: 0, cursor: "pointer"}}>
                <Text style={{fontSize: 22, color: colors.muted }}>x</Text>
              </Pressable>
            </View>
            <View style={{ backgroundColor: `${colors.primary}10`, borderRadius: 14, padding: 14, marginBottom: 16, cursor: "pointer" }}>
              <Svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.muted} strokeWidth={1.5} style={{ marginTop: 6 }}><Rect x="3" y="3" width="18" height="18" rx="2"/><Circle cx="8.5" cy="8.5" r="1.5"/><Polyline points="21 15 16 10 5 21"/></Svg>
              <Text style={{ margin: 0, fontSize: 13, color: colors.muted }}>Add photos</Text>
            </View>
            {["Meal Name", "Chef", "Notes"].map((field) => (
              <View key={field} style={{ marginBottom: 14 }}>
                <Text style={{ margin: "0 0 6px", fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>{field.toUpperCase()}</Text>
                <TextInput placeholder={`Enter ${field.toLowerCase()}...`} style={{ width: "100%", backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingTop: 11, paddingBottom: 11, paddingLeft: 14, paddingRight: 14, fontSize: 14, color: "#1A1410", fontFamily: "'Outfit', sans-serif", boxSizing: "border-box" }} />
              </View>
            ))}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ margin: "0 0 8px", fontSize: 12, color: colors.muted, fontWeight: 500, letterSpacing: 0.3 }}>YOUR RATING</Text>
              <StarRating rating={0} size={28} interactive />
            </View>
            <Pressable style={{ width: "100%", backgroundColor: colors.primary, borderWidth: 0, borderRadius: 14, padding: "14px", cursor: "pointer" }}>
              <Text style={{color: "#FAF7F2", fontSize: 16, fontWeight: 600, fontFamily: "'Outfit', sans-serif"}}>Save Memory</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

// ── Helpers ──

function SectionLabel({ children, colors }: { children: React.ReactNode; colors: any }) {
  return (
    <Text style={{ margin: "20px 0 6px", fontSize: 11, color: colors.muted, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 600 }}>
      {children}
    </Text>
  );
}

function SettingsCard({ children, colors }: { children: React.ReactNode; colors: any }) {
  return (
    <View style={{ backgroundColor: "#FFFFFF", borderRadius: 16, padding: "4px 16px", borderWidth: 1, borderColor: colors.border }}>
      {children}
    </View>
  );
}

function Divider({ colors }: { colors: any }) {
  return <View style={{ height: 1, backgroundColor: colors.border, marginLeft: -16, marginRight: -16 }} />;
}

function EditableField({
  label, value, editing, onEdit, onChange, onDone, type = "text", colors,
}: {
  label: string;
  value: string;
  editing: boolean;
  onEdit: () => void;
  onChange: (v: string) => void;
  onDone: () => void;
  type?: string;
  colors: any;
}) {
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
