from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import string
import random
from typing import Optional, Literal
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

LOCATIONS = [
    {
        "id": "1",
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-15.78113, -47.98534]
        },
        "properties": {
            "name": "Topocart",
            "description": "Sede da Topocart em Brasília"
        }
    },
    {
        "id": "2",
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-15.78315, -47.98378]
        },
        "properties": {
            "name": "Grupo Sollo",
            "description": "Serviço de portaria e vigilância"
        }
    },
    {
        "id": "3",
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-15.78344, -47.98585]
        },
        "properties": {
            "name": "Café Tres Corações",
            "description": "Centro de distribuição da Tres Corações"
        }
    },
]

class Geometry(BaseModel):
    type: Literal["Point"]
    coordinates: list[float]

class Properties(BaseModel):
    name: str
    description: str

class Location(BaseModel):
    id: Optional[str] = None
    type: Literal["Feature"]
    geometry: Geometry
    properties: Properties

def generate_short_id(length=3):
    characters = string.ascii_uppercase + string.digits
    used_ids = {p["id"] for p in LOCATIONS}
    
    while True:
        short_id = ''.join(random.choices(characters, k=length))
        if short_id not in used_ids:
            return short_id
        
# Health
@app.get("/health", tags=["Health"])
def health() -> dict:
    """Health"""
    return {"Health": "OK"}

#Listar
@app.get("/locations", tags=["Localizações"])
def get_locations() -> list:
    """Listar localizações"""
    return LOCATIONS