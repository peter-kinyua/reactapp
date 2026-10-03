import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "@/components/ui";
import { colors, radius } from "@/constants/theme";

const slides = [
  { title: "Discover products through live shopping", body: "Watch curated drops, launches, and styling sessions as they happen.", icon: "radio-outline" },
  { title: "Connect and interact with sellers", body: "Ask questions, react, follow stores, and see products demonstrated in real time.", icon: "chatbubbles-outline" },
  { title: "Shop while watching", body: "Add featured items to cart without leaving the live experience.", icon: "bag-handle-outline" }
] as const;

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const done = () => router.replace("/auth/login");

  return (
    <ImageBackground source={{ uri: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=85" }} style={{ flex: 1 }}>
      <View style={styles.scrim} />
      <SafeAreaView style={styles.container}>
        <Pressable onPress={done} style={styles.skip}><Text style={styles.skipText}>Skip</Text></Pressable>
        <View style={styles.center}>
          <View style={styles.icon}><Ionicons name={slide.icon} size={42} color="#fff" /></View>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.body}>{slide.body}</Text>
          <View style={styles.dots}>{slides.map((_, i) => <View key={i} style={[styles.dot, i === index && styles.activeDot]} />)}</View>
        </View>
        <AppButton title={index === slides.length - 1 ? "Get Started" : "Next"} onPress={() => index === slides.length - 1 ? done() : setIndex(index + 1)} icon="arrow-forward" />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrim: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(0,0,0,0.48)" },
  container: { flex: 1, padding: 20 },
  skip: { alignSelf: "flex-end", padding: 12 },
  skipText: { color: "#fff", fontWeight: "800" },
  center: { flex: 1, justifyContent: "center", gap: 16 },
  icon: { width: 78, height: 78, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center" },
  title: { color: "#fff", fontSize: 36, lineHeight: 42, fontWeight: "900" },
  body: { color: "rgba(255,255,255,0.82)", fontSize: 17, lineHeight: 25 },
  dots: { flexDirection: "row", gap: 8, marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.38)" },
  activeDot: { width: 30, backgroundColor: colors.live },
});
