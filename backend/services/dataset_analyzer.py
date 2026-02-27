import pandas as pd
import numpy as np

def detect_column_types(df):
    types = {}
    for col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]):
            types[col] = 'numerical'
        elif pd.api.types.is_datetime64_any_dtype(df[col]):
            types[col] = 'datetime'
        elif pd.api.types.is_bool_dtype(df[col]):
            types[col] = 'boolean'
        else:
            types[col] = 'categorical'
    return types

def detect_problem_type(df, target_col=None):
    if target_col is None:
        # Heuristic: last column is likely target
        target_col = df.columns[-1]
    
    if pd.api.types.is_numeric_dtype(df[target_col]):
        unique_vals = df[target_col].nunique()
        if unique_vals < 10: # Likely classification or small regression
            return 'classification'
        return 'regression'
    else:
        return 'classification'

def get_null_summary(df):
    null_counts = df.isnull().sum().to_dict()
    null_pct = (df.isnull().sum() / len(df) * 100).to_dict()
    return {col: {"count": int(count), "percentage": float(null_pct[col])} for col, count in null_counts.items()}

def get_correlations(df):
    numeric_df = df.select_dtypes(include=[np.number])
    if numeric_df.empty:
        return {}
    corr_matrix = numeric_df.corr().fillna(0).to_dict()
    return corr_matrix

def get_column_stats(df):
    stats = {}
    for col in df.select_dtypes(include=[np.number]).columns:
        stats[col] = {
            "mean": float(df[col].mean()),
            "median": float(df[col].median()),
            "std": float(df[col].std()),
            "min": float(df[col].min()),
            "max": float(df[col].max())
        }
    return stats

def analyze_dataset(df):
    col_types = detect_column_types(df)
    null_summary = get_null_summary(df)
    problem_type = detect_problem_type(df)
    
    analysis = {
        "row_count": len(df),
        "column_count": len(df.columns),
        "column_types": col_types,
        "null_summary": null_summary,
        "problem_type": problem_type,
        "correlations": get_correlations(df),
        "column_stats": get_column_stats(df),
        "columns": df.columns.tolist(),
        "size_tier": "small" if len(df) < 1000 else "medium" if len(df) < 10000 else "large"
    }
    return analysis
