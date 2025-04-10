import pywinauto
import pyautogui
import keyboard
import time
import re
import pytesseract
from PIL import Image
import os
import random

def scroll_page(duration=15, min_interval=0.5, max_interval=5, min_amount=100, max_amount=500):
    """
    Randomly scrolls up or down the page to simulate human-like browsing.

    Args:
        duration: Total time to scroll (in seconds).
        min_interval: Minimum time between scrolls.
        max_interval: Maximum time between scrolls.
        min_amount: Minimum scroll amount.
        max_amount: Maximum scroll amount.
    """
    start_time = time.time()
    while time.time() - start_time < duration:
        scroll_direction = random.choice([-1, 1])  # -1 for down, 1 for up
        scroll_amount = scroll_direction * random.randint(min_amount, max_amount)
        pyautogui.scroll(scroll_amount)

        interval = random.uniform(min_interval, max_interval)
        time.sleep(interval)


def activate_opera():
    try:
        app = pywinauto.Application().connect(title_re=".*Opera.*")
        opera_window = app.top_window()
        opera_window.set_focus()
        return True
    except Exception as e:
        print("Opera window not found:", e)
        return False

def open_new_tab_and_search(query):
    # Open new tab (Ctrl+T)
    keyboard.press_and_release('ctrl+l')
    time.sleep(1)

    # Type query and hit Enter
    keyboard.write(query)
    keyboard.press_and_release('enter')
    time.sleep(3)

def click_result_with_mouse(x=314, y=297):
    # Move and click on a likely search result (adjust x,y as needed)
    pyautogui.moveTo(x, y)
    pyautogui.click()

# def click_on_text(target_text, confidence=70):
#     print("Scanning screen for text:", target_text)
#     screenshot = pyautogui.screenshot()
#     data = pytesseract.image_to_data(screenshot, output_type=pytesseract.Output.DICT)

#     for i, word in enumerate(data["text"]):
#         if word.strip().lower() == target_text.strip().lower():
#             conf = int(data["conf"][i])
#             if conf >= confidence:
#                 x = data["left"][i] + data["width"][i] // 2
#                 y = data["top"][i] + data["height"][i] // 2
#                 print(f"Found '{target_text}' at ({x}, {y}) with confidence {conf}")
#                 pyautogui.moveTo(x, y)
#                 pyautogui.click()
#                 return True
#     print("❌ Text not found or confidence too low.")
#     return False

def preprocess(name):
    if name == "Markdown To Html":
        name = "Markdown To Html Converter"
    elif name == "Tech Detector":
        name = "Website Technology Detector"
    return name

def list_pretty_tool_names(base_dir="app/components/tools"):
    tool_names = []

    if not os.path.isdir(base_dir):
        print(f"Directory not found: {base_dir}")
        return []

    for type_dir in os.listdir(base_dir):
        type_path = os.path.join(base_dir, type_dir)
        if not os.path.isdir(type_path):
            continue

        for tool_dir in os.listdir(type_path):
            tool_path = os.path.join(type_path, tool_dir)
            if not os.path.isdir(tool_path):
                continue

            pretty_name = re.sub(r'(?<!^)(?=[A-Z])', ' ', tool_dir)
            
            tool_names.append(preprocess(pretty_name))

    return tool_names

# activate_opera()
# First search
time.sleep(4)
tool_names = list_pretty_tool_names()
print("Available Tools:", tool_names)
cycle = 10
for num in range(cycle):
    for name in tool_names:
        open_new_tab_and_search(f"{name} speedyutils")
        click_result_with_mouse()
        time.sleep(2)
        scroll_page()
        time.sleep(2)
