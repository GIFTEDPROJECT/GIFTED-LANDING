// app/api/subscribe/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ success: false, error: "Email manquant" }, { status: 400 });
  }

  try {
    const brevoApiKey = process.env.BREVO_API_KEY?.trim();
    const listIdEnv = process.env.BREVO_LIST_ID?.trim();
    const listId = listIdEnv ? parseInt(listIdEnv) : 0;

    // Vérifications avec logs de débogage
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY n'est pas défini dans les variables d'environnement");
      return NextResponse.json(
        { success: false, error: "Configuration serveur manquante : Clé API Brevo non définie. Veuillez configurer BREVO_API_KEY dans les variables d'environnement." },
        { status: 500 }
      );
    }

    if (!listIdEnv || listId === 0 || isNaN(listId)) {
      console.error("BREVO_LIST_ID n'est pas défini ou invalide:", listIdEnv);
      return NextResponse.json(
        { success: false, error: "Configuration serveur manquante : ID de liste Brevo non défini ou invalide. Veuillez configurer BREVO_LIST_ID avec un numéro valide dans les variables d'environnement." },
        { status: 500 }
      );
    }

    // Logs de débogage (sans exposer la clé complète)
    console.log("Tentative d'inscription avec:", {
      email,
      listId,
      apiKeyLength: brevoApiKey.length,
      apiKeyPrefix: brevoApiKey.substring(0, 8) + "..."
    });

    // Vérifier d'abord si la clé API est valide avec un appel simple
    const testResponse = await fetch("https://api.brevo.com/v3/account", {
      method: "GET",
      headers: {
        "api-key": brevoApiKey,
        Accept: "application/json",
      },
    });

    if (!testResponse.ok) {
      const raw = await testResponse.text();
      console.error("Erreur de validation de la clé API Brevo - Status:", testResponse.status);
      console.error("Réponse brute Brevo :", raw);
      
      let errorMessage = raw || "Clé API Brevo invalide";
      try {
        const errorJson = JSON.parse(raw);
        errorMessage = errorJson.message || errorJson.error || raw;
      } catch {
        // Si ce n'est pas du JSON, utiliser le texte brut
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: `Erreur d'authentification Brevo : ${errorMessage}. Veuillez vérifier que votre clé API est correcte, active et a les permissions nécessaires dans votre compte Brevo.` 
        },
        { status: testResponse.status }
      );
    }

    // Si la clé est valide, procéder à l'ajout du contact
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
      const raw = await response.text();
      console.error("Erreur Brevo API lors de l'ajout du contact - Status:", response.status);
      console.error("Réponse brute Brevo :", raw);
      
      // Essayer de parser l'erreur comme JSON si possible
      let errorMessage = raw || "Erreur inconnue de Brevo";
      try {
        const errorJson = JSON.parse(raw);
        errorMessage = errorJson.message || errorJson.error || raw;
      } catch {
        // Si ce n'est pas du JSON, utiliser le texte brut
      }
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { success: false, error: err.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
