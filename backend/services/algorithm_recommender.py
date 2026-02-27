def get_recommendations(analysis):
    problem_type = analysis.get('problem_type', 'classification')
    row_count = analysis.get('row_count', 0)
    
    # Generic algorithm list
    all_algorithms = [
        {
            "id": "linear_regression",
            "name": "Linear Regression",
            "type": "regression",
            "suitability": 0,
            "reasons": ["Good for linear relationships", "Highly interpretable"],
            "pros": ["Simple", "Fast"],
            "cons": ["Assumes linearity"],
            "complexity": "O(n_features^2 * n_rows)"
        },
        {
            "id": "logistic_regression",
            "name": "Logistic Regression",
            "type": "classification",
            "suitability": 0,
            "reasons": ["Great for binary classification", "Probabilistic output"],
            "pros": ["Interpretable", "No tuning needed"],
            "cons": ["Cannot model non-linear boundaries"],
            "complexity": "O(n_features * n_rows)"
        },
        {
            "id": "decision_tree",
            "name": "Decision Tree",
            "type": "classification",
            "suitability": 0,
            "reasons": ["Handles non-linear data well", "No scaling required"],
            "pros": ["Visualizable", "Handles outliers"],
            "cons": ["Prone to overfitting"],
            "complexity": "O(n_features * n_rows * log(n_rows))"
        },
        {
            "id": "kmeans",
            "name": "K-Means",
            "type": "clustering",
            "suitability": 0,
            "reasons": ["Simple and efficient", "Standard for clustering"],
            "pros": ["Fast", "Scales well"],
            "cons": ["Must specify K", "Sensitive to outliers"],
            "complexity": "O(k * n_rows * n_features)"
        },
        {
            "id": "knn",
            "name": "K-Nearest Neighbors",
            "type": "classification",
            "suitability": 0,
            "reasons": ["No explicit training phase", "Captures local patterns"],
            "pros": ["Easy to understand", "Non-parametric"],
            "cons": ["Slow on large data", "Sensitive to scale"],
            "complexity": "O(n_rows * n_features)"
        },
        {
            "id": "random_forest",
            "name": "Random Forest",
            "type": "classification",
            "suitability": 0,
            "reasons": ["Robust to noise", "High accuracy"],
            "pros": ["Handles missing values", "Unbiased error"],
            "cons": ["Slow to predict", "Complex to visualize"],
            "complexity": "O(n_trees * n_features * n_rows * log(n_rows))"
        }
    ]
    
    # Simple scoring logic
    recommendations = []
    for algo in all_algorithms:
        score = 0
        if algo['type'] == problem_type:
            score += 70
        elif problem_type == 'clustering' and algo['type'] == 'clustering':
            score += 70
        else:
            continue # Only show relevant types
            
        # Adjust based on size
        if row_count < 1000:
            if algo['id'] in ['linear_regression', 'logistic_regression', 'knn']:
                score += 20
        elif row_count > 10000:
            if algo['id'] in ['random_forest']:
                score += 20
                
        algo['suitability'] = min(score + (row_count % 10), 98) # Add some variability
        recommendations.append(algo)
        
    return sorted(recommendations, key=lambda x: x['suitability'], reverse=True)
