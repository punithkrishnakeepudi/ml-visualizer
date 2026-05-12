import numpy as np

def generate_steps(points, learning_rate=0.01, iterations=10):
    points = np.array(points)
    x = points[:, 0]
    y = points[:, 1]

    # Normalize X for better visualization and stability if needed
    # but here we'll assume points are in a reasonable range

    m = 0.0 # slope
    c = 0.0 # intercept
    n = float(len(x))

    steps = []

    # Step 1: Initial State
    steps.append({
        "step_number": 1,
        "title": "Initial State",
        "description": "We start with a horizontal line (slope = 0, intercept = 0). This is our initial guess before seeing any data patterns.",
        "chart_data": {
            "points": points.tolist(),
            "line": {"m": m, "c": c}
        },
        "key_values": {"slope": m, "intercept": c, "mse": float(np.mean((y - (m*x + c))**2))},
        "math_formula": "y = mx + c"
    })

    # Gradient Descent iterations
    for i in range(iterations):
        y_pred = m * x + c
        mse = np.mean((y - y_pred)**2)

        # Calculate gradients
        dm = (-2/n) * sum(x * (y - y_pred))
        dc = (-2/n) * sum(y - y_pred)

        # Update parameters
        m = m - learning_rate * dm
        c = c - learning_rate * dc

        if i % 2 == 0 or i == iterations - 1:
            steps.append({
                "step_number": len(steps) + 1,
                "title": f"Iteration {i+1}: Minimizing Error",
                "description": "Using Gradient Descent, we adjust the slope and intercept to reduce the Mean Squared Error (MSE). The line moves closer to the points.",
                "chart_data": {
                    "points": points.tolist(),
                    "line": {"m": float(m), "c": float(c)}
                },
                "key_values": {
                    "iteration": i + 1,
                    "slope": round(float(m), 4),
                    "intercept": round(float(c), 4),
                    "mse": round(float(mse), 2)
                },
                "math_formula": "J(m,c) = \\frac{1}{n} \\sum (y_i - (mx_i + c))^2"
            })

    # Final Step: Results
    steps.append({
        "step_number": len(steps) + 1,
        "title": "Optimal Fit Reached",
        "description": "The algorithm has converged. This line represents the 'best fit' that minimizes the distance between itself and all data points.",
        "chart_data": {
            "points": points.tolist(),
            "line": {"m": float(m), "c": float(c)}
        },
        "key_values": {
            "status": "Converged",
            "final_mse": round(float(mse), 2),
            "total_iterations": iterations
        },
        "math_formula": ""
    })

    return steps
