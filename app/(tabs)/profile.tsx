import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, screen } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { currentUser } from "@/data/mock";
import { useAppStore } from "@/store/appStore";

const options = ["My Orders", "Saved Products", "Following", "Addresses", "Payment Methods", "Notifications", "Settings", "Help & Support", "About"];

export default function Profile() {
  const logout = useAppStore((s) => s.logout);
  return (
    <SafeAreaView style={screen.page}>
      <ScrollView contentContainerStyle={screen.content}>
        <Text style={screen.h1}>Profile</Text>
        <View style={styles.header}><Avatar uri={currentUser.avatar} size={74} /><View><Text style={screen.h2}>{currentUser.name}</Text><Text style={screen.body}>{currentUser.email}</Text></View></View>
        {options.map((option) => (
          <Pressable key={option} onPress={() => option === "Notifications" ? router.push("/notifications") : undefined} style={styles.option}>
            <Text style={styles.optionText}>{option}</Text><Ionicons name="chevron-forward" size={19} color={colors.muted} />
          </Pressable>
        ))}
        <Pressable onPress={() => { logout(); router.replace("/auth/login"); }} style={styles.logout}><Text style={styles.logoutText}>Logout</Text></Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center", gap: 14, backgroundColor: "#fff", padding: 14, borderRadius: radius.md },
  option: { minHeight: 52, backgroundColor: "#fff", borderRadius: radius.md, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  optionText: { color: colors.ink, fontWeight: "800" },
  logout: { minHeight: 52, borderRadius: radius.md, alignItems: "center", justifyContent: "center", backgroundColor: "#FFE9EE" },
  logoutText: { color: colors.live, fontWeight: "900" }
});
