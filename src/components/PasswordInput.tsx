"use client";

import { useState } from "react";
import Card from "./UI/Card";
import Button from "./UI/Button";

interface Props {
  onUnlock: (password: string) => void;
  isLoading: boolean;
}

export default function PasswordInput({
  onUnlock,
  isLoading,
}: Props) {
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock(password);
  };

  return (
    <Card className="max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">
        Enter Password
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-xl p-3 w-full"
          placeholder="Password"
        />

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={!password}
          className="w-full"
        >
          Unlock Note
        </Button>
      </form>
    </Card>
  );
}
