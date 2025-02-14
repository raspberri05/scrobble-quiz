import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print(GROQ_API_KEY)
client = Groq(
  api_key=GROQ_API_KEY,
)


def ai(df):
  chat_completion = client.chat.completions.create(
    messages=[
      {
        "role": "user",
        "content": "Generate 3 quiz questions about the data. Only ask questions about tracks with a cluster of 1 (don't mention cluster in the questions)"
        + df.to_json(),
      }
    ],
    model="llama-3.3-70b-versatile",
  )

  print(chat_completion.choices[0].message.content)
