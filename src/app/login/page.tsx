"use client";

import AppInput from "@/components/AppInput";
import AppButton from "@/components/AppButton";

import { signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";
import { auth } from "@/lib/AppFirebase";
import { useFormState } from "../hooks/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupRoute } from "@/lib/routes";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { loading, setLoading } = useFormState();

  async function loginUser() {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/dashboard");
      console.log("Logged in as ", userCredential.user.email);
    } catch (error) {
      alert("Could not login: " + (error as any).message);
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-24 max-w-2xl mx-auto text-black">
      <h1 className="text-6xl font-bold mb-12">
        K-Market <small className="text-lg">Vendor</small>
      </h1>

      <h3 className="text-4xl mb-12">Welcome Back</h3>
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
      >
        <AppInput
          label="Email Address"
          type="Email"
          onChange={(e) => setEmail((e.target as any).value)}
        />

        <AppInput
          label="Password"
          type="password"
          onChange={(e) => setPassword((e.target as any).value)}
        />

        <AppButton disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </AppButton>
        <p className="text-center">
          New Here?{" "}
          <Link
            href={signupRoute}
            className="text-emerald-400 font-semibold"
          >
            Signup
          </Link>
        </p>
      </form>
    </main>
  );
}
