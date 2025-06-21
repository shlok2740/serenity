# 🌸 Serenity – The Mental Health App

## 🌱 Inspiration

In today’s always-on world, burnout, anxiety, and emotional overwhelm have become far too common. While existing apps like *Calm* and *Headspace* offer incredible value, they often rely on static content, heavy apps, and a lack of real-time interaction. We wanted to create a **lightweight, accessible mental health experience** where anyone could just open a browser, connect with an empathetic AI face-to-face, and start breathing.

That’s how **Serenity** was born—a calming space guided by a conversational AI that helps users reset, refocus, and reconnect with themselves through guided breathing and gentle check-ins.

---

## 🧘 What it does

Serenity is a web-based mental wellness companion powered by conversational AI and soothing voice guidance. Here's what it offers:

* **Interactive Landing Page:** A serene digital scene with a sakura tree, meditating character, and falling petals to set the tone.
* **Conversational Breathing Companion:** Users are guided through 60-second breathing exercises by an AI agent using real-time video (via Tavus) and calming voice (via ElevenLabs).
* **Emotional Grounding:** The AI begins conversations by asking where the user is and how they’re feeling, encouraging presence and reflection.
* **Minimal UX, Maximum Calm:** Clean design, no signups, no distractions—just one-click serenity.

---

## 🛠️ How we built it

* **Platform:** Built using [Bolt.new](https://bolt.new), allowing for fast, no-code deployment.
* **Frontend & Styling:**

  * Tailwind CSS for soft pink, sakura-inspired theming
  * Falling sakura leaf animation built with custom CSS
  * React (via Bolt.new) for modular components
* **Voice:** ElevenLabs API generated calm, human-like breathing instructions
* **Video AI:** Tavus enabled Luma (our AI companion) to speak to users face-to-face via conversational video
* **Deployment:** Netlify
* **Domain:** [https://luxury-bunny-a39820.netlify.app/](https://luxury-bunny-a39820.netlify.app/)

---

## 🚧 Challenges we ran into

* **Balancing AI Personality:** We wanted the AI to be emotionally intelligent without sounding robotic or overly scripted.
* **Keeping the experience minimal:** We originally considered adding sleep soundscapes and more—but trimmed features to stay focused on what really matters: **presence and breath**.
* **Custom animations in Bolt.new:** Implementing falling sakura leaves required low-level CSS not native to the visual builder.

---

## 🏆 Accomplishments that we're proud of

* Created a **fully functional wellness app** with no traditional coding.
* Designed a unique AI user experience combining **video, voice, and emotion-aware dialogue**.
* Built a clean, emotionally safe UX—one that *feels* like a peaceful space the moment you land.
* Learned how to integrate third-party tools (like ElevenLabs and Tavus) into Bolt.new's no-code ecosystem.

---

## 📚 What we learned

* **AI can feel human when designed thoughtfully.**
* Less is more—simplicity in design creates emotional clarity.
* Bolt.new is incredibly powerful for bringing emotional ideas to life in minutes, not months.
* Tone, timing, and micro-interactions matter *a lot* in mental wellness UX.

---

## 🔮 What's next for Serenity – The Mental Health App

* **Mobile Version**: Build Serenity as a mobile-first app for offline breathing and journaling.
* **Emotion Detection**: Integrate Raven-0 (Tavus' perception model) to adapt responses based on facial emotion recognition.
* **Mood-based sessions**: Let users select how they’re feeling and guide them with personalized breathing patterns or affirmations.
* **AI Journaling**: Add a gentle journaling mode guided by the same compassionate AI persona.
* **Public Launch**: Make Serenity accessible to creators, students, and professionals facing burnout around the world.

---

Want to breathe with us? 🌸
👉 [Try Serenity Now](https://luxury-bunny-a39820.netlify.app/)
