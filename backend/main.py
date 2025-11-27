from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
import os
from openai import AzureOpenAI
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

app = FastAPI(title="Gratech Super Brain")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model Configurations
MODELS = {
    "deepseek": {
        "endpoint": "https://admin-mi4ctrot-eastus2.cognitiveservices.azure.com/",
        "key": os.getenv("DEEPSEEK_KEY"),
        "deployment": "DeepSeek-V3.1",
        "api_version": "2024-02-15-preview"
    },
    "llama-405b": {
        "endpoint": "https://admin-9042-resource.cognitiveservices.azure.com/",
        "key": os.getenv("LLAMA_KEY"),
        "deployment": "Meta-Llama-3.1-405B-Instruct",
        "api_version": "2024-02-15-preview"
    },
    "gpt-5": {
        "endpoint": "https://admin-9042-resource.cognitiveservices.azure.com/",
        "key": os.getenv("LLAMA_KEY"), # Uses same resource key
        "deployment": "gpt-5-chat",
        "api_version": "2024-02-15-preview"
    },
    "gpt-4o": {
        "endpoint": "https://gratech-openai.openai.azure.com/",
        "key": os.getenv("AZURE_OPENAI_KEY"),
        "deployment": "gra-4o",
        "api_version": "2024-02-15-preview"
    }
}

class ChatRequest(BaseModel):
    message: str
    model: str = "deepseek" # Default to DeepSeek as requested
    system_prompt: str = "You are Gratech AI, a super-intelligent assistant."

@app.get("/")
def read_root():
    return {
        "status": "online", 
        "system": "Gratech Super Brain",
        "available_models": list(MODELS.keys())
    }

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    config = MODELS.get(request.model)
    if not config:
        raise HTTPException(status_code=400, detail=f"Model {request.model} not found")
    
    if not config["key"]:
        raise HTTPException(status_code=500, detail=f"API Key not configured for {request.model}")

    # Configure OpenAI client for this specific request
    client = AzureOpenAI(
        azure_endpoint=config["endpoint"],
        api_key=config["key"],
        api_version=config["api_version"]
    )

    try:
        response = client.chat.completions.create(
            model=config["deployment"],
            messages=[
                {"role": "system", "content": request.system_prompt},
                {"role": "user", "content": request.message}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        return {
            "response": response.choices[0].message.content,
            "model": config["deployment"],
            "provider": "Azure AI Foundry"
        }
    except Exception as e:
        print(f"Error calling {request.model}: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
