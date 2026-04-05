import { Telegraf } from "telegraf";
import Groq from "groq-sdk";

const bot = new Telegraf(process.env.TOKEN);

const groq = new Groq({
  apiKey: process.env.GROQ_KEY,
});

// Start Command
bot.start((ctx) => {
  ctx.reply("🖤 OXNEL AI — Carti Mode Engaged 🎤💫");
});

// Handle Messages
bot.on("text", async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    const reply = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        {
          role: "system",
          content: "You are Carti AI. Respond like Playboi Carti with vibes, adlibs, and energy.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const response = reply.choices[0].message.content;
    ctx.reply(response);

  } catch (error) {
    console.error(error);
    ctx.reply("❌ Error: " + error.message);
  }
});

// Launch bot
bot.launch();
