import React from 'react'
import { hashPassword } from '../../../Shared/Encoder/hash';
import { generateKeyPair } from '../../../Shared/Encoder/keys';
import { decript, encript, generateRamdomKey24, generateRamdomKey32 } from '../../../Shared/Encoder/cypher';

export default function Test() {

    function getString(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const password = getString(formData, "pass");
  const key = getString(formData, "key");
        if (typeof password !== "string" || typeof key !== "string") {
  return;
}
        console.log(password);
        console.log(key);
        const salt = generateRamdomKey32();
        console.log(salt.toString());
        const passwordHash = await hashPassword(password, salt)
        console.log(passwordHash)
        const keys = await generateKeyPair(passwordHash);
        console.log(keys.secretKey);
        console.log(keys.publicKey);
        const noun = generateRamdomKey24();
        console.log(noun);
        const keyencrip = encript(key, keys.secretKey, noun);
        console.log(keyencrip);
        const keydecrip = decript(keyencrip, keys.secretKey, noun);
        console.log(keydecrip);
    }

  return (
    <div>
        <form action="/api/auth/test" method="post" onSubmit={handleSubmit}>
            <input type="text" name="pass" placeholder='password' />
            <input type="text" name="key" placeholder='key' />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
