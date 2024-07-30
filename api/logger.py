import os
import sys
import logging


LOGGER_FOLDER_PATH: str = "logs"

# Get logger
logger = logging.getLogger()

# Set Formatter
formatter = logging.Formatter(fmt="%(levelname)s - %(asctime)s - %(message)s")

# Create handlers
if not os.path.exists(LOGGER_FOLDER_PATH):
    os.mkdir(f"{LOGGER_FOLDER_PATH}")
file_haldler = logging.FileHandler(f"{LOGGER_FOLDER_PATH}/app.log")
stream_handler = logging.StreamHandler(sys.stdout)


# Add formatter to handler
file_haldler.setFormatter(formatter)
stream_handler.setFormatter(formatter)


# Add handlers to logger
logger.handlers = [stream_handler, file_haldler]

# set log level
logger.setLevel(logging.INFO)
