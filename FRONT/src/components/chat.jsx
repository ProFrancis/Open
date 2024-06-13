/* 
  Créez un composant Chat en React où l'utilisateur peut poser des questions et recevoir des réponses générées par une API d'IA. Le composant doit inclure une zone de saisie où l'utilisateur peut taper sa question, ainsi qu'une zone de conversation pour afficher les échanges entre l'utilisateur et l'IA.

  Trouver une solution pour rendre les données persistantes.

  Afficher l'historique de la conversation.
  Garder en mémoire les anciennes réponses et utiliser ce contexte pour des interactions futures.
*/
// Importation des hooks useState et useEffect de React et du module axios pour les requêtes HTTP
import { useState, useEffect } from 'react';
import axios from 'axios';

// Déclaration du composant Text
const Text = () => {
  // Initialisation de l'état du composant avec useState
  const [prompt, setPrompt] = useState({
    question: '',  // La question entrée par l'utilisateur
    response: ''   // La réponse reçue de l'API
  });

  // L'état de content stocke l'historique des questions et réponses
  const [content, setContent] = useState(() => {
    // L'historique est récupéré du local storage s'il existe, sinon un tableau vide est initialisé
    const savedContent = localStorage.getItem('content');
    return savedContent ? JSON.parse(savedContent) : [];
  });

  // Le hook useEffect met à jour le local storage chaque fois que l'état de content change
  useEffect(() => {
    localStorage.setItem('content', JSON.stringify(content));
  }, [content]);

  // La fonction handleChange met à jour l'état de prompt lorsque l'utilisateur tape dans le champ de la question
  const handleChange = (event) => {
    const { value, name } = event.target;
    setPrompt(prevPrompt => ({ ...prevPrompt, [name]: value }));
  };

  // La fonction handleSubmit est appelée lorsque l'utilisateur soumet le formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // L'historique est mis à jour avec la nouvelle question
    const history = [...content, { question: prompt.question.trim(), response: '' }];

    try {
      // Préparation des messages à envoyer à l'API
      const messages = [
        { role: "system", content: "You are a helpful assistant." },
        ...history.map(item => ({ role: "user", content: item.question }))
      ];

      // Envoi de la requête POST à l'API et récupération de la réponse
      const { data } = await axios.post(`http://localhost:8080/api/chat`, { messages });
      const { response } = data;

      // Mise à jour des états de prompt et content avec la réponse reçue
      setPrompt(prevPrompt => ({ ...prevPrompt, response }));
      setContent(prevContent => [...prevContent, { question: prompt.question.trim(), response }]);
    } catch (error) {
      // En cas d'erreur, affichage du message d'erreur dans la console
      console.error('Error:', error.message);
    }
  };

  // Le rendu du composant affiche l'historique des questions et réponses et le formulaire pour entrer une nouvelle question
  return (
    <div>
      {content.map((item, index) => (
        <p key={index}>
          {item.question} | {item.response}
        </p>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          placeholder='...'
          name='question'
          value={prompt.question}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

// Exportation du composant Text
export default Text;
