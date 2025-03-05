from flask import Flask, request, jsonify
from google.cloud import vision
from google.oauth2 import service_account
from flask_cors import CORS
from twilio.rest import Client
from config.config import account_sid_key, auth_token_key, twilio_number_key
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

SERVICE_ACCOUNT_KEY_PATH = "ocrKey.json"

# Twilio credentials
account_sid = account_sid_key
auth_token = auth_token_key
twilio_number = twilio_number_key


def get_vision_client():
    credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_KEY_PATH)
    return vision.ImageAnnotatorClient(credentials=credentials)


# Create a Twilio client
client = Client(account_sid, auth_token)


@app.route('/detect-text', methods=['POST'])
def detect_text():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        image_file = request.files['image']
        image_content = image_file.read()
        vision_client = get_vision_client()
        image = vision.Image(content=image_content)
        response = vision_client.text_detection(image=image)

        if response.error.message:
            return jsonify({"error": response.error.message}), 500

        texts = response.text_annotations
        if not texts:
            return jsonify({"message": "No text detected"}), 200

        detected_text = texts[0].description
        return jsonify({"detected_text": detected_text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/send-sms', methods=['POST'])
def send_sms():
    try:
        if 'phone_number' not in request.form or 'message' not in request.form:
            return jsonify({"error": "Phone number or message not provided"}), 400

        phone_number = request.form['phone_number']
        message_body = request.form['message']

        # Send SMS with the provided message
        message = client.messages.create(
            body=message_body,
            from_=twilio_number,  # Your Twilio number
            to=phone_number  # Recipient's phone number
        )

        return jsonify({"message": "SMS sent successfully", "sms_sid": message.sid}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
