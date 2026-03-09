from fastapi import FastAPI


app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World!"}


@app.get('/home')
def home():
    return { 'message' : 'Welcome to out home page. redirect to /docs for interactive workflows'}

@app.get('/about')
def about():
    return { 'message' : 'This is a simple FastAPI application to demonstrate how to create a web server using FastAPI. It has two endpoints: /home and /about. The /home endpoint returns a welcome message, while the /about endpoint provides information about the application.' }

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)
