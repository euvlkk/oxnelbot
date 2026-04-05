import { Telegraf } from "telegraf";
import axios from "axios";

const bot = new Telegraf(process.env.TOKEN);

// Start
bot.start((ctx) => {
  ctx.reply("🖤 OXNEL AI Activated — Carti Mode 🎤💫");
});

// AI Command
bot.on("text", async (ctx) => {
  const user = ctx.message.text;

  try {
    const reply = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: user }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = reply.data.choices[0].message.content;
    ctx.reply("✨ **CARTI AI:**\n" + text);
  } catch (e) {
    ctx.reply("❌ Error: " + e.message);
  }
});

bot.launch();
