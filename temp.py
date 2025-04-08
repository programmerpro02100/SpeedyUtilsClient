import pyautogui
import keyboard
import time

print("Move your mouse to any position.")
print("Press 's' to save the current position.")
print("Press 'esc' to exit.\n")

saved_positions = []

try:
    while True:
        if keyboard.is_pressed('s'):
            x, y = pyautogui.position()
            saved_positions.append((x, y))
            print(f"Saved position: X={x}, Y={y}")
            time.sleep(0.5)  # debounce delay
        elif keyboard.is_pressed('esc'):
            print("\nExiting. Final saved positions:")
            for idx, pos in enumerate(saved_positions):
                print(f"{idx+1}. X={pos[0]}, Y={pos[1]}")
            break
except KeyboardInterrupt:
    print("\nStopped by user.")
