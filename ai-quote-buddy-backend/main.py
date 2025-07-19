from agents import Agent, Runner
from connection import config
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import asyncio

def run_coroutine_sync(coro):
    return asyncio.new_event_loop().run_until_complete(coro)

app = FastAPI()

# Request schema
class UserInput(BaseModel):
    message: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://ai-quote-buddy.vercel.app/"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-quote")
def generate_quote(input: UserInput):
    user_message = input.message

    agent = Agent(
        name="assistant",
        instructions="""
        You are a supportive, emotionally intelligent assistant. Your task is to analyze the emotional tone and implied mood of the user's input and generate a single motivational, comforting, or thoughtful quote that matches the emotional state or need behind the message.
        Do the following:
        Read and understand the user's input.
        Return a quote that aligns with that emotional tone — the quote must feel meaningful, relevant, and tailored to the emotion.
        ❌ Do not explain the emotion.
        ❌ Do not offer personal opinions, suggestions, or paragraphs.
        ❌ Do not give multiple quotes.
        ✅ Only return one quote that emotionally fits what the person is feeling or needing.
        Use famous quotes, poetic lines, or short original responses if needed — just ensure it emotionally matches the input.
        """
    )

    # Step 1: Detect mood

# Step 2: Generate quote based on mood
    give_quote = run_coroutine_sync(Runner.run(
    agent,
    f"Depending on the mood of this message: '{user_message}', give a quote from a famous person. The answer should ONLY be the quote and the name of the person who said it.",
    run_config=config
    ))

    give_explanation = run_coroutine_sync(Runner.run(
    agent,
    f"""
    The user shared this message: "{user_message}"
    You provided them this quote: "{give_quote.final_output}"
    Now explain kindly** how this quote relates to their emotional state or situation, and how it might help or comfort them. Your explanation should be short but it must be complete i mean if it goes to 5 lines its ok but the explanation should be full now dont start writing paragraphs just supportive, and it must feel emotionally supportive and relevant to the user's message. Avoid being generic. Be concise and clear.
    """,
    run_config=config
    ))

    return {
        "quote": give_quote.final_output.strip(),
        "explanation": give_explanation.final_output.strip(),
    }
