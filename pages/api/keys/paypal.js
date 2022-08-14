import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = getSession();
  if (!session) {
    return res.status(401).send("sign in required");
  }

  res.status(201).send(process.env.PAYPAL_CLIENT_ID || "sb");
}
