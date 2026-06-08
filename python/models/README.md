# Model Files



- `model.pkl` - Your trained RandomForest/SVM/LogisticRegression model
- `scaler.pkl` - StandardScaler or MinMaxScaler (for feature scaling)
- `school_encoder.pkl` - LabelEncoder for School categorical feature
- `gender_encoder.pkl` - LabelEncoder for Gender categorical feature
- `feature_columns.pkl` - List of feature column names (in order)
- `label_map.json` - JSON file mapping categorical values to numbers (provided)

The Python service will automatically load these files when it starts.
