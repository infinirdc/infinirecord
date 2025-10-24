// Code d'intégration Puter pour le site
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('messages');

  function appendMessage(role, text) {
    const msg = document.createElement('div');
    msg.className = 'message ' + role;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    appendMessage('user', text);
    input.value = '';

    // Prompt de système pour guider Puter
    const systemPrompt = `You are a concise and helpful website assistant. Answer in French when the user writes in French. Keep answers short (1-3 sentences).`;

    // Appel Puter
    if (typeof puter === 'undefined' || !puter.ai || !puter.ai.chat) {
      appendMessage('error', 'La librairie Puter n\'est pas chargée. Vérifiez votre connexion ou l\'URL du script.');
      return;
    }

    // On compose le prompt avec le message utilisateur
    const prompt = `${systemPrompt}\nUser: ${text}`;

    puter.ai.chat(prompt)
      .then((resp) => {
        // puter.print(resp); // optionnel : laisse la lib gérer l'affichage si fournie
        // resp peut être une string ou un objet selon l'implémentation
        const out = (typeof resp === 'string') ? resp : (resp?.text || JSON.stringify(resp));
        appendMessage('assistant', out);
      })
      .catch((err) => {
        appendMessage('error', 'Erreur du service : ' + (err?.message || err));
        console.error('Puter chat error', err);
      });
  });
});
