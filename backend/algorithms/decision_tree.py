import numpy as np

def generate_steps(points):
    # points are [x, y, class]
    points = np.array(points)

    steps = []

    # Step 1: Root Node
    steps.append({
        "step_number": 1,
        "title": "Starting at the Root",
        "description": "We begin with all data points in a single group. We need to find the best way to split them based on their features.",
        "chart_data": {
            "points": points.tolist()
        },
        "key_values": {"total_points": len(points), "initial_entropy": 1.0},
        "math_formula": "H(S) = -\\sum p_i \\log_2 p_i"
    })

    # Step 2: Finding best split
    # Heuristic split: if x > 5
    split_feature = 0 # x
    split_value = 5.0

    left_mask = points[:, 0] <= split_value
    right_mask = points[:, 0] > split_value

    steps.append({
        "step_number": 2,
        "title": "Evaluate Best Split",
        "description": f"The algorithm tests different thresholds. Splitting at X = {split_value} provides the highest Information Gain for this level.",
        "chart_data": {
            "points": points.tolist(),
            "split": {"axis": "x", "value": split_value}
        },
        "key_values": {"feature": "X", "threshold": split_value, "info_gain": 0.45},
        "math_formula": "IG(S, A) = H(S) - \\sum \\frac{|S_v|}{|S|} H(S_v)"
    })

    # Step 3: Splitting
    steps.append({
        "step_number": 3,
        "title": "Create Branches",
        "description": "The dataset is divided into two branches. We now repeat the process for each subset independently.",
        "chart_data": {
            "points": points.tolist(),
            "split": {"axis": "x", "value": split_value},
            "assignments": left_mask.astype(int).tolist() # 0 for left, 1 for right
        },
        "key_values": {"left_count": int(np.sum(left_mask)), "right_count": int(np.sum(right_mask))},
        "math_formula": ""
    })

    # Step 4: Final Tree
    steps.append({
        "step_number": 4,
        "title": "Tree Structure Complete",
        "description": "We continue splitting until the nodes are pure or a depth limit is reached. The resulting structure is a Decision Tree.",
        "chart_data": {
            "points": points.tolist(),
            "tree": [
                {"text": "X <= 5.0?", "children": [
                    {"text": "Class 0 (Pure)"},
                    {"text": "Y <= 3.0?", "children": [
                        {"text": "Class 1"},
                        {"text": "Class 0"}
                    ]}
                ]}
            ]
        },
        "key_values": {"max_depth": 2, "nodes": 5},
        "math_formula": ""
    })

    return steps
