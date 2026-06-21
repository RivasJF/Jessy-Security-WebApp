import { useState } from "react";
import { bytesToHexString, generateRamdomKey32 } from "../../../Shared/Encoder/cypher";
import { hashPassword } from "../../../Shared/Encoder/hash";
import { generateKeyPair } from "../../../Shared/Encoder/keys";

export function useRegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const salt = generateRamdomKey32();
    const passwordHash = await hashPassword(formData.password, salt);
    const keys = await generateKeyPair(passwordHash);

    // to stored
    // - secretKey: keys.secretKey 

    // to  Backend
    console.log({
      email: formData.email,
      publicKey: keys.publicKey,
      salt: bytesToHexString(salt)
    });
  };

  return { formData, handleChange, handleSubmit };
}