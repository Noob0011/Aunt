const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');

const API_KEY = 'AIzaSyBW1iyZUqt1koZE6Jdpkq4XYMfkBQlbh58';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  appendMessage('user', userMessage);
  input.value = '';
  appendMessage('bot', 'Typing...');

  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + API_KEY, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      contents: [{parts: [{text: `You are a 35-year-old emotional support aunt. Be sweet, comforting, a little flirty but respectful. Respond to: "${userMessage}"` }]}]
    })
  });

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry beta, I got confused!';
  chatBox.lastChild.remove(); // remove "Typing..."
  appendMessage('bot', text);
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = 'message ' + sender;
  msg.innerText = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
