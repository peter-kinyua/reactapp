import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { screen } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { notifications } from "@/data/mock";
import { useAppStore } from "@/store/appStore";

export default function Notifications() {
  const read = useAppStore((s) => s.readNotifications);
  const mark = useAppStore((s) => s.markNotification);
  return (
    <SafeAreaView style={screen.page}>
      <ScrollView contentContainerStyle={screen.content}>
        <View style={screen.rowBetween}><Pressable onPress={() => router.back()}><Ionicons name="chevron-back" size={26} color={colors.ink} /></Pressable><Text style={screen.h2}>Notifications</Text><View style={{ width: 26 }} /></View>
        {notifications.map((item) => {
          const unread = item.unread && !read.includes(item.id);
          return (
            <Pressable key={item.id} onPress={() => mark(item.id)} style={[styles.item, unread && styles.unread]}>
              <View style={styles.icon}><Ionicons name={item.icon as never} size={22} color={unread ? colors.live : colors.ink} /></View>
              <View style={{ flex: 1 }}><Text style={styles.title}>{item.title}</Text><Text style={screen.body}>{item.body}</Text></View>
              <Text style={styles.time}>{item.time}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: "row", gap: 12, padding: 14, borderRadius: radius.md, backgroundColor: "#fff" },
  unread: { borderWidth: 1, borderColor: "#FFD0DA" },
  icon: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#F3F4F6", alignItems: "center", justifyContent: "center" },
  title: { color: colors.ink, fontWeight: "900", marginBottom: 3 },
  time: { color: colors.muted, fontWeight: "800" }
});
