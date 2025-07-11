// app/api/subscribe/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, error: "Email manquant" }, { status: 400 });
  }

  try {
    const brevoApiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_LIST_ID || "0");

    if (!brevoApiKey || listId === 0) {
      return NextResponse.json(
        { success: false, error: "Clé API ou ID de liste manquant" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        listIds: [listId],
      }),
    });

    if (!response.ok) {
      if (!response.ok) {
        const raw = await response.text(); // ne pas faire .json() ici
        console.error("Réponse brute Brevo :", raw); // LOG utile côté terminal / AWS logs
      
        return NextResponse.json(
          { success: false, error: raw || "Erreur inconnue de Brevo" },
          { status: response.status }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
