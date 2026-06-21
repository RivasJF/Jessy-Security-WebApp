import { useState } from "react";
import { hashPassword } from "../../../Shared/Encoder/hash";
import { generateKeyPair } from "../../../Shared/Encoder/keys";

export function useRegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // fetch salt_F
    const keysalt:any = "";

    // create valid keys
    const passwordHash = await hashPassword(formData.password, keysalt);
    const keys = await generateKeyPair(passwordHash);

    // fetch login {email, publicKey}


    console.log(formData);
  };

  return { formData, handleChange, handleSubmit };
}