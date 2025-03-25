import { useState, useEffect } from "react";

interface Credentials {
  email: string;
  apiKey: string;
}

export function useCredentials() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    apiKey: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("situm_email");
    const savedApiKey = localStorage.getItem("situm_api_key");

    if (savedEmail && savedApiKey) {
      setCredentials({
        email: savedEmail,
        apiKey: savedApiKey,
      });
    }
  }, []);

  const saveCredentials = (email: string, apiKey: string) => {
    localStorage.setItem("situm_email", email);
    localStorage.setItem("situm_api_key", apiKey);
    setCredentials({ email, apiKey });
  };

  return { credentials, saveCredentials };
} 