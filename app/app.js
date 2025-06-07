const navButtons = document.querySelectorAll('nav button');
const screens = document.querySelectorAll('.screen');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const screen = btn.getAttribute('data-screen');
        screens.forEach(s => s.classList.remove('active'));
        document.getElementById(screen).classList.add('active');
    });
});

// Articles placeholder
const articles = [
    'Healthy eating tips',
    'Why exercise matters',
    'Managing stress effectively'
];
const articlesList = document.getElementById('articles-list');
articlesList.innerHTML = '<ul>' + articles.map(a => `<li>${a}</li>`).join('') + '</ul>';

// Chat functionality
const sendBtn = document.getElementById('send');
const symptomsField = document.getElementById('symptoms');
const responseField = document.getElementById('chat-response');

sendBtn.addEventListener('click', async () => {
    const text = symptomsField.value.trim();
    if (!text) return;
    responseField.textContent = 'Processing...';
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        responseField.textContent = data.reply;
        addHistory(text, data.reply);
    } catch (err) {
        responseField.textContent = 'Error communicating with server.';
    }
});

// History & Wellness logs
const historyList = document.getElementById('history-list');
const logHistory = document.getElementById('log-history');
const logBtn = document.getElementById('log');
const feelingField = document.getElementById('feeling');

const history = [];
const logs = [];

logBtn.addEventListener('click', () => {
    const note = feelingField.value.trim();
    if (!note) return;
    const entry = `${new Date().toLocaleDateString()} - ${note}`;
    logs.push(entry);
    logHistory.innerHTML = '<ul>' + logs.map(l => `<li>${l}</li>`).join('') + '</ul>';
    feelingField.value = '';
});

function addHistory(query, reply) {
    history.push({ query, reply });
    historyList.innerHTML = '<ul>' + history.map(h => `<li>${h.query}<br/><em>${h.reply}</em></li>`).join('') + '</ul>';
}

symptomsField.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
    }
});
