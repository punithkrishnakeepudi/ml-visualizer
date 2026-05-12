from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import json
import asyncio
from algorithms import (
    kmeans, linear_regression, logistic_regression, knn, decision_tree,
    random_forest, svm, naive_bayes, xgboost_alg, pca, hierarchical, apriori,
    neural_networks, transformers_alg
)
from algorithms import kmeans

router = APIRouter(prefix="/api")

@router.post("/process")
async def process_algorithm(data: dict):
    algorithm = data.get('algorithm')
    
    async def event_generator():
        steps = []
        metrics = {"type": "final_metrics", "accuracy": 0.9, "training_time": "10ms"}

        # Supervised
        if algorithm == 'kmeans':
            points = [[10, 20], [15, 25], [60, 80], [65, 85], [100, 10], [110, 15]]
            steps = kmeans.generate_steps(points, k=3)
        elif algorithm == 'linear_regression':
            points = [[1, 2], [2, 3.5], [3, 2.8], [4, 4.6], [5, 5.1], [6, 6.5]]
            steps = linear_regression.generate_steps(points)
        elif algorithm == 'logistic_regression':
            points = [[1, 0], [2, 0], [3, 0], [7, 1], [8, 1], [9, 1]]
            steps = logistic_regression.generate_steps(points)
        elif algorithm == 'knn':
            points = [[1, 1, 0], [2, 1, 0], [1, 2, 0], [8, 8, 1], [9, 8, 1], [8, 9, 1]]
            steps = knn.generate_steps(points, query_point=[2, 2], k=3)
        elif algorithm == 'decision_tree':
            points = [[1, 1, 0], [2, 1, 0], [8, 8, 1], [9, 8, 1], [5, 2, 0], [6, 7, 1]]
            steps = decision_tree.generate_steps(points)
        elif algorithm == 'random_forest':
            points = [[1, 1, 0], [8, 8, 1], [2, 2, 0], [9, 9, 1]]
            steps = random_forest.generate_steps(points)
        elif algorithm == 'svm':
            points = [[1, 1, 0], [8, 8, 1]]
            steps = svm.generate_steps(points)
        elif algorithm == 'naive_bayes':
            points = [[1, 1, 0], [8, 8, 1]]
            steps = naive_bayes.generate_steps(points)
        elif algorithm == 'xgboost':
            points = [[1, 1, 0], [8, 8, 1]]
            steps = xgboost_alg.generate_steps(points)

        # Unsupervised
        elif algorithm == 'pca':
            points = [[1, 2], [2, 1], [8, 9], [9, 8]]
            steps = pca.generate_steps(points)
        elif algorithm == 'hierarchical':
            points = [[1, 1], [2, 2], [8, 8], [9, 9]]
            steps = hierarchical.generate_steps(points)
        elif algorithm == 'apriori':
            steps = apriori.generate_steps([])

        # Deep Learning
        elif algorithm == 'ann':
            steps = neural_networks.generate_steps([])
        elif algorithm == 'cnn':
            steps = neural_networks.generate_steps([])
        elif algorithm == 'rnn':
            steps = neural_networks.generate_steps([])
        elif algorithm == 'transformers':
            steps = transformers_alg.generate_steps([])

        if steps:
            for step in steps:
                yield f"data: {json.dumps(step)}\n\n"
                await asyncio.sleep(0.5)
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
            yield f"data: {json.dumps({'error': f'Algorithm {algorithm} not implemented'})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")
