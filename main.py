from fastapi import FastAPI


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.get('/home')
def home():
    return { 'message' : 'Welcome to out home page. redirect to /docs for interactive workflows'}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
