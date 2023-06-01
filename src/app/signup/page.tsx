"use client";

import AppInput from "@/components/AppInput";
import AppButton from "@/components/AppButton";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";
import { auth } from "@/lib/AppFirebase";
import { useFormState } from "../hooks/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginRoute } from "@/lib/routes";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, setLoading } = useFormState();
  const router = useRouter();

  async function signupUser() {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      router.push("/dashboard");

      console.log("Account created as", userCredential.user.email);
    } catch (error) {
      alert("Could not signin: " + (error as any).message);
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

      <h3 className="text-4xl mb-12">Register Your Business</h3>
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          signupUser();
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
          {loading ? "Loading..." : "Signup"}
        </AppButton>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            href={loginRoute}
            className="text-emerald-400 font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
