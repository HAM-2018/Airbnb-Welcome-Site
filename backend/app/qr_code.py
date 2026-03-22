import qrcode
from qrcode.constants import ERROR_CORRECT_H

url = "http://35.208.18.55"

qr = qrcode.QRCode(
    version=2,
    error_correction=ERROR_CORRECT_H,
    box_size=12,
    border=4,
)
qr.add_data(url)
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="white")
img.save("airbnb-welcome-qr.png")

print("Saved QR code to airbnb-welcome-qr.png")