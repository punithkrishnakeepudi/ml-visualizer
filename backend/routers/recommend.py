from fastapi import APIRouter, Body
from services.algorithm_recommender import get_recommendations

router = APIRouter(prefix="/api")

@router.post("/recommend")
async def recommend_algorithms(analysis: dict = Body(...)):
    recommendations = get_recommendations(analysis)
    return {"recommendations": recommendations}
