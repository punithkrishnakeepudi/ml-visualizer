import numpy as np

def generate_steps(points):
    steps = []

    # Step 1: Embedding & Positional Encoding
    steps.append({
        "step_number": 1,
        "title": "Embedding & Positional Encoding",
        "description": "Tokens are converted to high-dimensional vectors. Since Transformers process all tokens at once, we add 'positional encodings' so the model knows the order of words.",
        "chart_data": {"tokens": ["Machine", "Learning", "is", "cool"]},
        "key_values": {"embedding_dim": 512, "vocab_size": 30000},
        "math_formula": "PE(pos, 2i) = \\sin(pos / 10000^{2i/d_{model}})"
    })

    # Step 2: Multi-Head Attention
    steps.append({
        "step_number": 2,
        "title": "Self-Attention Mechanism",
        "description": "The model calculates 'attention scores' between every pair of words. This allows it to understand context (e.g., what 'it' refers to in a long sentence).",
        "chart_data": {
            "attention_matrix": [[1, 0.1, 0.2], [0.1, 1, 0.8], [0.2, 0.8, 1]]
        },
        "key_values": {"heads": 8, "scaling": "1/sqrt(d_k)"},
        "math_formula": "\\text{Attn}(Q,K,V) = \\text{softmax}(\\frac{QK^T}{\\sqrt{d_k}})V"
    })

    # Step 3: Feed Forward & Output
    steps.append({
        "step_number": 3,
        "title": "Encoder/Decoder Blocks",
        "description": "Data passes through multiple identical layers of attention and feed-forward networks with residual connections and layer normalization.",
        "chart_data": {"layers": 12, "state": "complete"},
        "key_values": {"parameters": "110M", "norm": "LayerNorm"},
        "math_formula": "\\text{LayerNorm}(x + \\text{Sublayer}(x))"
    })

    return steps
