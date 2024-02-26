from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.user.routes import router as guest_router, user_router, admin_router
from api.auth.route import router as auth_router
from api.core.security import JWTAuth
from starlette.middleware.authentication import AuthenticationMiddleware

docs_url = "docs"
redocs_url = "redocs"

app = FastAPI(
    docs_url=f"/{docs_url}",
    redoc_url=f"/{redocs_url}",
    title="Employee Management System API",
    version="1.0.0",
    description="My first big project  by Ma'sum",
)
app.include_router(guest_router)
app.include_router(user_router)
app.include_router(admin_router)
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add Middleware
app.add_middleware(AuthenticationMiddleware, backend=JWTAuth())


@app.get("/", tags=["Health Check"])
def health_check(request: Request):
    hostname = request.url
    link_docs = f"{hostname}{docs_url}"
    link_redocs = f"{hostname}{redocs_url}"
    return JSONResponse(
        content={
            "status": "Api is running...",
            "message": "Happy fetching :)",
            "docs": link_docs,
            "redocs": link_redocs,
        }
    )
