import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { colors } from "@/constants/theme";

export default function Splash() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace("/onboarding"), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={["#101114", "#271E2F", "#FF3158"]} style={styles.container}>
      <Animated.View entering={ZoomIn.springify()} style={styles.logo}>
        <Text style={styles.logoText}>L</Text>
      </Animated.View>
      <Animated.Text entering={FadeIn.delay(250)} style={styles.name}>LumaLive</Animated.Text>
      <Text style={styles.tagline}>Shop the moment</Text>
      <ActivityIndicator color="#fff" style={{ marginTop: 28 }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  logo: { width: 86, height: 86, borderRadius: 28, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  logoText: { fontSize: 44, fontWeight: "900", color: colors.live },
  name: { marginTop: 18, color: "#fff", fontSize: 34, fontWeight: "900" },
  tagline: { marginTop: 6, color: "rgba(255,255,255,0.75)", fontSize: 16, fontWeight: "700" }
});
