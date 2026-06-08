#!/bin/bash

# Start Python ML prediction service
echo "Starting Python prediction service..."
cd python
pip install -r requirements.txt
python predict.py &
PYTHON_PID=$!

# Start Next.js development server
echo "Starting Next.js application..."
cd ..
export PYTHON_SERVICE_URL=http://localhost:8001
pnpm dev &
NEXT_PID=$!

# Handle graceful shutdown
trap "kill $PYTHON_PID $NEXT_PID" EXIT

# Wait for both services
wait
