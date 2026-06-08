# PredIT - Setup Guide

## Overview

PredIT is a professional Next.js application that predicts student exam scores using your trained machine learning model.

**Architecture:**
- Frontend: Next.js 16 + React 19 (TypeScript)
- Backend: Python ML service (scikit-learn)
- Communication: REST API

## Setup Instructions

### Step 1: Add Your Model Files

Copy your trained model files to the `python/models/` directory:

```
python/models/
├── model.pkl                    # Your trained ML model (RandomForest, SVM, etc)
├── scaler.pkl                   # Feature scaler (StandardScaler/MinMaxScaler)
├── school_encoder.pkl           # LabelEncoder for School feature
├── gender_encoder.pkl           # LabelEncoder for Gender feature
├── feature_columns.pkl          # List of feature names (in order)
├── label_map.json              # Already provided ✓
└── README.md
```

**What these files do:**
- `model.pkl`: Your trained classification/regression model
- `scaler.pkl`: Normalizes feature values before prediction
- `*_encoder.pkl`: Converts categorical text to numbers
- `feature_columns.pkl`: Ensures features are in the correct order
- `label_map.json`: Maps categorical values (Low/Medium/High) to numbers

### Step 2: Install Dependencies

```bash
# Install Node dependencies
pnpm install

# Python dependencies are auto-installed when the service starts
```

### Step 3: Run the Application

**Option A: Run both services together (recommended)**
```bash
chmod +x start-services.sh
./start-services.sh
```

**Option B: Run services separately**

Terminal 1 - Start Python ML service:
```bash
cd python
pip install -r requirements.txt
python predict.py
```

Terminal 2 - Start Next.js app:
```bash
export PYTHON_SERVICE_URL=http://localhost:8001
pnpm dev
```

### Step 4: Access the App

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Model File Format

### 1. model.pkl
Your trained scikit-learn model. Must have:
- `.predict()` method for making predictions
- `.predict_proba()` method for confidence scores

Supported models:
- RandomForestClassifier / RandomForestRegressor
- SVC / SVR (with probability=True)
- LogisticRegression
- GradientBoostingClassifier
- Any scikit-learn model with these methods

### 2. scaler.pkl
StandardScaler or MinMaxScaler from scikit-learn.

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
scaler.fit(X_train)
pickle.dump(scaler, open('scaler.pkl', 'wb'))
```

### 3. Encoders (school_encoder.pkl, gender_encoder.pkl)
LabelEncoders for categorical features.

```python
from sklearn.preprocessing import LabelEncoder
school_encoder = LabelEncoder()
school_encoder.fit(['Private', 'Public'])
pickle.dump(school_encoder, open('school_encoder.pkl', 'wb'))
```

### 4. feature_columns.pkl
List of feature names in the exact order used during training.

```python
feature_columns = ['gender', 'school_type', 'distance_from_home', ...]
pickle.dump(feature_columns, open('feature_columns.pkl', 'wb'))
```

## Form Fields & Data Format

The app collects 20 student factors:

**Numeric fields** (sliders):
- `hours_studied`: 0-10 hours
- `attendance`: 0-100%
- `sleep_hours`: 0-10 hours
- `tutoring_sessions`: 0-8 sessions
- `previous_scores`: 0-100%
- `physical_activity`: 0-6 hours

**Categorical fields** (pills/buttons):
- `gender`: Male / Female
- `school_type`: Private / Public
- `distance_from_home`: Near / Moderate / Far
- `family_income`: Low / Medium / High
- `extracurricular_activities`: Yes / No
- `internet_access`: Yes / No
- `learning_disabilities`: Yes / No
- `motivation_level`: Low / Medium / High
- `peer_influence`: Negative / Neutral / Positive
- `parental_involvement`: Low / Medium / High
- `parental_education_level`: Uneducated / High School / College / Postgraduate
- `teacher_quality`: Low / Medium / High
- `access_to_resources`: Low / Medium / High

## Troubleshooting

### "Python service not available" error
- Check that Python is installed: `python --version`
- Verify model files exist in `python/models/`
- Check Python service logs for errors
- Ensure port 8001 is not in use: `lsof -i :8001`

### "Model loading failed"
- Verify all `.pkl` files are in `python/models/`
- Ensure files were saved with Python 3.8+ and scikit-learn 1.0+
- Check file permissions: `ls -la python/models/`

### Wrong predictions
- Verify feature order matches training data
- Check that categorical values match `label_map.json`
- Ensure scaler was fit on training data

### Port conflicts
- Change Python port: `PORT=8002 python python/predict.py`
- Change Next.js port: `pnpm dev -- -p 3001`
- Update PYTHON_SERVICE_URL accordingly

## Deployment

### Vercel Deployment

The app is ready to deploy on Vercel with your models:

```bash
git push origin main
```

For production, you'll need to:
1. Store model files in a cloud storage (Vercel Blob, AWS S3, etc)
2. Download them at runtime on Vercel
3. Or use Vercel's experimental Services API for Python backends

### Local Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install -r python/requirements.txt
RUN npm install -g pnpm && pnpm install
CMD ["bash", "start-services.sh"]
```

## Performance Tips

- Model predictions should complete in <100ms for best UX
- The app shows loading animations during prediction
- Confidence scores are displayed (0-100%)
- Results are cached locally in the frontend

## Support

For issues with:
- **Frontend**: Check `next.js` errors in browser console
- **Backend**: Check Python service logs
- **Model loading**: Verify pickle file compatibility with scikit-learn version
