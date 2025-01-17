import os
from typing import cast

# Bugout
HUMBUG_REPORTER_CRAWLERS_TOKEN = os.environ.get("HUMBUG_REPORTER_CRAWLERS_TOKEN")

# Geth
MOONSTREAM_IPC_PATH = os.environ.get("MOONSTREAM_IPC_PATH", None)

MOONSTREAM_CRAWL_WORKERS = 4
MOONSTREAM_CRAWL_WORKERS_RAW = os.environ.get("MOONSTREAM_CRAWL_WORKERS")
try:
    if MOONSTREAM_CRAWL_WORKERS_RAW is not None:
        MOONSTREAM_CRAWL_WORKERS = int(MOONSTREAM_CRAWL_WORKERS_RAW)
except:
    raise Exception(
        f"Could not parse MOONSTREAM_CRAWL_WORKERS as int: {MOONSTREAM_CRAWL_WORKERS_RAW}"
    )

# Etherscan
MOONSTREAM_ETHERSCAN_TOKEN = os.environ.get("MOONSTREAM_ETHERSCAN_TOKEN")

# NFT crawler
NFT_HUMBUG_TOKEN = os.environ.get("NFT_HUMBUG_TOKEN", "")
if NFT_HUMBUG_TOKEN == "":
    raise ValueError("NFT_HUMBUG_TOKEN env variable is not set")

MOONSTREAM_ADMIN_ACCESS_TOKEN = os.environ.get("MOONSTREAM_ADMIN_ACCESS_TOKEN", "")
if MOONSTREAM_ADMIN_ACCESS_TOKEN == "":
    raise ValueError("MOONSTREAM_ADMIN_ACCESS_TOKEN env variable is not set")

MOONSTREAM_DATA_JOURNAL_ID = os.environ.get("MOONSTREAM_DATA_JOURNAL_ID", "")
if MOONSTREAM_DATA_JOURNAL_ID == "":
    raise ValueError("MOONSTREAM_DATA_JOURNAL_ID env variable is not set")
