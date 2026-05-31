def generate_health_remark(glucose, haemoglobin, cholesterol):

    remarks = []

    # Glucose Analysis
    if glucose > 180:
        remarks.append(
            "Critical glucose level detected. Patient may have severe diabetes risk."
        )

    elif glucose > 140:
        remarks.append(
            "Elevated glucose level detected. Patient shows moderate diabetes risk."
        )

    else:
        remarks.append(
            "Glucose level appears normal."
        )

    # Haemoglobin Analysis
    if haemoglobin < 10:
        remarks.append(
            "Low haemoglobin detected. Possible anemia risk."
        )

    elif haemoglobin < 13:
        remarks.append(
            "Slightly low haemoglobin level observed."
        )

    else:
        remarks.append(
            "Haemoglobin level is healthy."
        )

    # Cholesterol Analysis
    if cholesterol > 240:
        remarks.append(
            "Critical cholesterol level detected. High heart disease risk."
        )

    elif cholesterol > 200:
        remarks.append(
            "Borderline high cholesterol detected."
        )

    else:
        remarks.append(
            "Cholesterol level is within healthy range."
        )

    return " ".join(remarks)