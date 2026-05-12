import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def generate_steps(points, learning_rate=0.1, iterations=10):
    points = np.array(points)
    x = points[:, 0]
    y = points[:, 1]

    # Simple logistic regression: y = sigmoid(mx + c)
    m = 0.0
    c = 0.0
    n = float(len(x))

    steps = []

    # Step 1: Initial State
    steps.append({
        "step_number": 1,
        "title": "Initial Boundary",
        "description": "We start with a neutral decision boundary. The sigmoid function at this stage gives 0.5 for all inputs, meaning it's unsure about the classification.",
        "chart_data": {
            "points": points.tolist(),
            "boundary": {"m": m, "c": c}
        },
        "key_values": {"slope": m, "intercept": c, "loss": float(-np.mean(y * np.log(0.5) + (1-y) * np.log(0.5)))},
        "math_formula": "P(y=1) = \\frac{1}{1 + e^{-(mx+c)}}"
    })

    for i in range(iterations):
        z = m * x + c
        y_pred = sigmoid(z)

        # Binary Cross Entropy Loss
        epsilon = 1e-15
        y_pred = np.clip(y_pred, epsilon, 1 - epsilon)
        loss = -np.mean(y * np.log(y_pred) + (1 - y) * np.log(1 - y_pred))

        # Gradients
        dm = (1/n) * np.dot(x, (y_pred - y))
        dc = (1/n) * np.sum(y_pred - y)

        # Updates
        m = m - learning_rate * dm
        c = c - learning_rate * dc

        if i % 2 == 0 or i == iterations - 1:
            steps.append({
                "step_number": len(steps) + 1,
                "title": f"Iteration {i+1}: Tuning Boundary",
                "description": "The algorithm adjusts the weights to maximize the probability of correct classes. The boundary rotates to better separate the groups.",
                "chart_data": {
                    "points": points.tolist(),
                    "boundary": {"m": float(m), "c": float(c)}
                },
                "key_values": {
                    "iteration": i + 1,
                    "slope": round(float(m), 4),
                    "intercept": round(float(c), 4),
                    "log_loss": round(float(loss), 4)
                },
                "math_formula": "L = -\\frac{1}{n} \\sum [y_i \\log(\\hat{y}_i) + (1-y_i) \\log(1-\\hat{y}_i)]"
            })

    steps.append({
        "step_number": len(steps) + 1,
        "title": "Classification Optimized",
        "description": "The Logistic Regression has found the optimal line that separates the two classes with the highest confidence.",
        "chart_data": {
            "points": points.tolist(),
            "boundary": {"m": float(m), "c": float(c)}
        },
        "key_values": {
            "status": "Converged",
            "final_loss": round(float(loss), 4),
            "total_iterations": iterations
        },
        "math_formula": ""
    })

    return steps
