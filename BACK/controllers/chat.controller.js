// Importation du module OpenAI et des variables d'environnement
import OpenAI from "openai";
import { ENV } from "../config/env.js";

// Initialisation d'une instance OpenAI avec les informations d'organisation et de projet
const openai = new OpenAI({
  organization: "org-ubVO1MO768FSDwU3GR9tlAPr",
  project: "proj_29CG0arYtkKZEuVQVZtsSQ35",
  apiKey: ENV.KEY_OPENAI,
});

// La fonction chat est un contrôleur pour gérer les requêtes de chat
export const chat = async (req, res) => {
  try {
    // Extraction des messages de la requête
    const { messages } = req.body;

    // Vérification de la présence de messages dans la requête
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      // Si les messages sont absents ou mal formatés, renvoie une erreur 400
      return res.status(400).json({ error: "Messages are required and should be an array." });
    }

    // Création d'une complétion de chat avec les messages extraits et le modèle GPT-3.5 Turbo
    const completion = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });

    // Extraction de la réponse du modèle à partir du premier choix
    const response = completion.choices[0].message.content;

    // Envoi de la réponse du modèle comme réponse à la requête
    res.status(200).json({ response: response });
  } catch (error) {
    // Enregistrement de l'erreur dans la console et envoi d'une erreur 500 si quelque chose se passe mal
    console.error(error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const sansHistorique = async (req, res) => {
  try{
   
    const { question } = req.body

    // Vérifier si la question est présente dans la requête.
    if(!question) return res.status(400).json({error: "Question is required !"})
    
    const completion = await openai.chat.completions.create({
      messages: [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": question }
      ],
      model: "gpt-3.5-turbo",
    })
    res.status(200).json({completion})
  }catch(e){
    res.status(500).json({error: "Internal server error.", message: e.message })
  }
}

export const post = async (req, res) => {
  try{
    //
  }catch(e){
    console.log(e.message);
  }
}