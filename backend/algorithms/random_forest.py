import numpy as np

def generate_steps(points):
    points = np.array(points)
    steps = []

    # Step 1: Bootstrap sampling
    steps.append({
        "step_number": 1,
        "title": "Bootstrapping & Feature Selection",
        "description": "We create multiple random subsets of our data (with replacement) and select a random subset of features for each tree. This is called Bagging.",
        "chart_data": {"points": points.tolist()},
        "key_values": {"trees": 100, "features_per_split": "sqrt(n_features)"},
        "math_formula": ""
    })

    # Step 2: Individual tree growth
    steps.append({
        "step_number": 2,
        "title": "Growing the Forest",
        "description": "Each tree is grown to its maximum depth without pruning. Because each tree sees different data and features, they all learn different patterns.",
        "chart_data": {
            "points": points.tolist(),
            "forest_state": "growing"
        },
        "key_values": {"active_trees": 15},
        "math_formula": ""
    })

    # Step 3: Aggregation
    steps.append({
        "step_number": 3,
        "title": "Majority Voting (Aggregation)",
        "description": "To make a prediction, we pass the data through every tree in the forest. The final output is the majority vote (for classification) or average (for regression).",
        "chart_data": {
            "points": points.tolist(),
            "votes": [10, 5, 8, 2] # Mock votes for different regions
        },
        "key_values": {"total_votes": 100},
        "math_formula": "\\hat{y} = \\text{mode}\\{T_1(x), T_2(x), ..., T_B(x)\\}"
    })

    return steps
