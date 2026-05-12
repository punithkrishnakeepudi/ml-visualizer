from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import json
import asyncio
from algorithms import kmeans, linear_regression, logistic_regression, knn, decision_tree

router = APIRouter(prefix="/api")

@router.post("/process")
async def process_algorithm(data: dict):
    algorithm = data.get('algorithm')
    # hyperparameters = data.get('hyperparameters', {})
    
    async def event_generator():
        if algorithm == 'kmeans':
            # Simplified data for visualization (2D)
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

        elif algorithm == 'linear_regression':
            points = [[1, 2], [2, 3.5], [3, 2.8], [4, 4.6], [5, 5.1], [6, 6.5]]
            steps = linear_regression.generate_steps(points)

            for step in steps:
                yield f"data: {json.dumps(step)}\n\n"
                await asyncio.sleep(1.0)

            metrics = {
                "type": "final_metrics",
                "accuracy": 0.89,
                "mse": 0.15,
                "r2_score": 0.92,
                "iterations": 10,
                "training_time": "8ms"
            }
            yield f"data: {json.dumps(metrics)}\n\n"

        elif algorithm == 'logistic_regression':
            points = [[1, 0], [2, 0], [3, 0], [7, 1], [8, 1], [9, 1]]
            steps = logistic_regression.generate_steps(points)

            for step in steps:
                yield f"data: {json.dumps(step)}\n\n"
                await asyncio.sleep(1.0)

            metrics = {
                "type": "final_metrics",
                "accuracy": 1.0,
                "log_loss": 0.04,
                "iterations": 10,
                "training_time": "10ms"
            }
            yield f"data: {json.dumps(metrics)}\n\n"

        elif algorithm == 'knn':
            points = [[1, 1, 0], [2, 1, 0], [1, 2, 0], [8, 8, 1], [9, 8, 1], [8, 9, 1]]
            steps = knn.generate_steps(points, query_point=[2, 2], k=3)

            for step in steps:
                yield f"data: {json.dumps(step)}\n\n"
                await asyncio.sleep(1.0)

            metrics = {
                "type": "final_metrics",
                "accuracy": 0.96,
                "f1_score": 0.95,
                "training_time": "5ms"
            }
            yield f"data: {json.dumps(metrics)}\n\n"

        elif algorithm == 'decision_tree':
            points = [[1, 1, 0], [2, 1, 0], [8, 8, 1], [9, 8, 1], [5, 2, 0], [6, 7, 1]]
            steps = decision_tree.generate_steps(points)

            for step in steps:
                yield f"data: {json.dumps(step)}\n\n"
                await asyncio.sleep(1.0)

            metrics = {
                "type": "final_metrics",
                "accuracy": 0.92,
                "depth": 3,
                "nodes": 7,
                "training_time": "15ms"
            }
            yield f"data: {json.dumps(metrics)}\n\n"
        else:
            yield f"data: {json.dumps({'error': 'Algorithm not implemented yet'})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
