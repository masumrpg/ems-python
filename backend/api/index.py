from fastapi import Depends, FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from api.user.routes import public_router, user_router, admin_router
from api.statistics.routes import public_statistics_router, user_statistics_router, admin_statistics_router
from api.auth.route import router as auth_router
from api.core.security import JWTAuth
from starlette.middleware.authentication import AuthenticationMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import select
from api.core.database import get_db

docs_url = "docs"
redocs_url = "redocs"

app = FastAPI(
    docs_url=f"/{docs_url}",
    redoc_url=f"/{redocs_url}",
    title="Employee Management System API",
    version="0.1.0",
    description="My first big project by Ma'sum",
)

# Auth Router
app.include_router(auth_router)
# Acconuts Router
app.include_router(public_router)
app.include_router(user_router)
app.include_router(admin_router)
# Statistic Router
app.include_router(public_statistics_router)
app.include_router(user_statistics_router)
app.include_router(admin_statistics_router)


# Middleware
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Izinkan dari semua domain
    allow_credentials=True,
    allow_methods=["*"],  # Izinkan semua metode HTTP
    allow_headers=["*"],  # Izinkan semua header
)

# Add Middleware
app.add_middleware(AuthenticationMiddleware, backend=JWTAuth())


@app.get("/", status_code=status.HTTP_200_OK, tags=["Health Check"])
def health_check(request: Request, db: Session = Depends(get_db)):
    # Lakukan pemeriksaan kesehatan database di sini
    try:
        # Contoh pemeriksaan sederhana, coba lakukan query ke database
        db.execute(select(1))
    except Exception as e:
        # Jika terjadi kesalahan, beri respon bahwa database tidak sehat
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "Database is not healthy", "error": str(e)},
        )

    # Jika database sehat, berikan respon bahwa API berjalan dengan baik
    hostname = request.url
    link_docs = f"{hostname}{docs_url}"
    link_redocs = f"{hostname}{redocs_url}"
    return {
        "status": "API is running...",
        "message": "Happy fetching :)",
        "docs": link_docs,
        "redocs": link_redocs,
    }
