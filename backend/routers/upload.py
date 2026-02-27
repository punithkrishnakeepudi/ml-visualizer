from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import io
from services.dataset_analyzer import analyze_dataset

router = APIRouter(prefix="/api")

@router.post("/upload")
async def upload_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith(('.csv', '.xlsx', '.json')):
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    contents = await file.read()
    
    try:
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(contents))
        elif file.filename.endswith('.xlsx'):
            df = pd.read_excel(io.BytesIO(contents))
        elif file.filename.endswith('.json'):
            df = pd.read_json(io.BytesIO(contents))
            
        analysis = analyze_dataset(df)
        
        # Get first 10 rows for preview
        preview = df.head(10).replace({np.nan: None}).to_dict(orient='records')
        
        return {
            "analysis": analysis,
            "preview": preview,
            "filename": file.filename
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

import numpy as np # for np.nan replacement
