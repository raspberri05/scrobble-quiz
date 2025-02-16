import os
from dotenv import load_dotenv
from groq import Groq
import json

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print(GROQ_API_KEY)
client = Groq(
  api_key=GROQ_API_KEY,
)


def ai(df, period):
  with open(os.path.join(os.path.dirname(__file__), "prompt.txt"), "r") as file:
    prompt = file.read().strip()
  chat_completion = client.chat.completions.create(
    messages=[
      {
        "role": "user",
        "content": prompt + period + df.to_json(),
      }
    ],
    model="llama-3.3-70b-versatile",
    response_format={"type": "json_object"},
  )

  raw = json.loads(chat_completion.choices[0].message.content)
  print(raw)
  return raw["questions"]
