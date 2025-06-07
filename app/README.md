# Health Consultation App

This is a minimal prototype interface for a health consultation application.
It contains four screens:

1. **Articles** – shows health related articles.
2. **Chat** – allows users to send symptom descriptions to a backend that uses the OpenAI API.
3. **History** – lists previous chat interactions.
4. **Wellness Tracker** – lets users log how they feel each day.

The application is a static front‑end only. The `/api/chat` endpoint referenced in `app.js` needs to be implemented separately to forward requests to OpenAI.

> **Disclaimer:** This demo does not provide medical advice. Always consult a qualified doctor for medical concerns.
