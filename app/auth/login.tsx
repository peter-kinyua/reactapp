import { Link, router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "@/components/ui";
import { colors, radius } from "@/constants/theme";
import { useAppStore } from "@/store/appStore";

export default function Login() {
  const [email, setEmail] = useState("maya.njeri@example.com");
  const [password, setPassword] = useState("demo1234");
  const login = useAppStore((state) => state.login);
  const submit = () => {
    if (email.trim() && password.trim()) {
      login();
      router.replace("/(tabs)");
    }
  };
  return (
    <SafeAreaView style={styles.page}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.wrap}>
        <Text style={styles.logo}>LumaLive</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.body}>Sign in to follow sellers, shop live shows, and track your orders.</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" style={styles.input} />
        <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={styles.input} />
        <AppButton title="Login" onPress={submit} icon="log-in-outline" />
        <Link href="/auth/forgot" style={styles.link}>Forgot Password?</Link>
        <Text style={styles.footer}>New here? <Link href="/auth/signup" style={styles.linkStrong}>Create account</Link></Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.page },
  wrap: { flex: 1, padding: 22, justifyContent: "center", gap: 14 },
  logo: { color: colors.live, fontSize: 22, fontWeight: "900" },
  title: { color: colors.ink, fontSize: 34, fontWeight: "900" },
  body: { color: colors.muted, lineHeight: 22, marginBottom: 8 },
  input: { height: 54, borderRadius: radius.md, borderWidth: 1, borderColor: colors.line, backgroundColor: "#fff", paddingHorizontal: 14, fontSize: 15 },
  link: { textAlign: "center", color: colors.ink, fontWeight: "800", padding: 8 },
  footer: { textAlign: "center", color: colors.muted },
  linkStrong: { color: colors.live, fontWeight: "900" }
});
