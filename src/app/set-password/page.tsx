'use client';

import { Suspense, useState } from "react";
import api from "@/api";
import { useSearchParams, useRouter } from "next/navigation";

function FinalizeAccountSetupContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!uid || !token) {
    return (
      <p className="text-red-600 font-medium">
        Invalid or expired setup link.
      </p>
    );
  }

  const finalizeAccountSetup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/api/finalize-account-setup/", {
        uid,
        token,
        username,
        password,
      });

      if (res.status === 200) {
        router.push("/login");
      } else {
        setError("Invalid details or already in use.");
      }
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="hidden w-full py-10 h-full md:flex flex-col gap-5 items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Finish setting up your account
          </h1>

          <form onSubmit={finalizeAccountSetup} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border p-2 rounded"
            />

            <input
              type="password"
              placeholder="Set a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded"
            />

            {error && (
              <p className="text-red-600 text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-2 rounded disabled:opacity-60"
            >
              {loading ? "Setting up..." : "Complete setup"}
            </button>
          </form>
        </div>
      </div>

      <div className="flex flex-col w-full md:hidden gap-5 p-5">
        <h1 className="text-2xl font-bold mb-4">
          Finish setting up your account
        </h1>

        <form onSubmit={finalizeAccountSetup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Set a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded"
          />

          {error && (
            <p className="text-red-600 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Setting up..." : "Complete setup"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <FinalizeAccountSetupContent />
    </Suspense>
  );
}
