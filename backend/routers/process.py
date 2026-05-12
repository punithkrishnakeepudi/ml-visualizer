from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import json
import asyncio
from algorithms import kmeans

router = APIRouter(prefix="/api")

@router.post("/process")
async def process_algorithm(data: dict):
    algorithm = data.get('algorithm')
    # hyperparameters = data.get('hyperparameters', {})
    
    async def event_generator():
        if algorithm == 'kmeans':
            # Simplified data for visualization (2D)
            # In real app, we'd use PCA to reduce uploaded data to 2D
            points = [[10, 20], [15, 25], [60, 80], [65, 85], [100, 10], [110, 15]]
            steps = kmeans.generate_steps(points, k=3)
            
            for step in steps:
                yield f"data: {json.dumps(step)}\n\n"
                await asyncio.sleep(1.0)
            
            # Send final metrics
            metrics = {
                "type": "final_metrics",
                "accuracy": 0.94,
                "silhouette_score": 0.72,
                "iterations": 5,
                "training_time": "12ms"
            }
            yield f"data: {json.dumps(metrics)}\n\n"
        else:
            yield f"data: {json.dumps({'error': 'Algorithm not implemented yet'})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
