import { Link } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppButton } from "@/components/ui";
import { colors, radius } from "@/constants/theme";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <SafeAreaView style={styles.page}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.wrap}>
        <Text style={styles.logo}>LumaLive</Text>
        <Text style={styles.title}>Reset password</Text>
        <Text style={styles.body}>{sent ? "A mock reset link has been sent for demo purposes." : "Enter your email and we will simulate a password reset email."}</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" style={styles.input} />
        <AppButton title={sent ? "Sent" : "Send Reset Link"} onPress={() => email.trim() ? setSent(true) : undefined} icon="mail-outline" />
        <Link href="/auth/login" style={styles.link}>Back to Login</Link>
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
  link: { textAlign: "center", color: colors.ink, fontWeight: "800", padding: 8 }
});
