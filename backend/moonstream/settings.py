import os

from bugout.app import Bugout

# Bugout
BUGOUT_BROOD_URL = os.environ.get("BUGOUT_BROOD_URL", "https://auth.bugout.dev")
BUGOUT_SPIRE_URL = os.environ.get("BUGOUT_SPIRE_URL", "https://spire.bugout.dev")
bugout_client = Bugout(brood_api_url=BUGOUT_BROOD_URL, spire_api_url=BUGOUT_SPIRE_URL)

BUGOUT_REQUEST_TIMEOUT_SECONDS = 5

HUMBUG_REPORTER_BACKEND_TOKEN = os.environ.get("HUMBUG_REPORTER_BACKEND_TOKEN")

# Default value is "" instead of None so that mypy understands that MOONSTREAM_APPLICATION_ID is a string
MOONSTREAM_APPLICATION_ID = os.environ.get("MOONSTREAM_APPLICATION_ID", "")
if MOONSTREAM_APPLICATION_ID == "":
    raise ValueError("MOONSTREAM_APPLICATION_ID environment variable must be set")

MOONSTREAM_DATA_JOURNAL_ID = os.environ.get("MOONSTREAM_DATA_JOURNAL_ID", "")
if MOONSTREAM_DATA_JOURNAL_ID == "":
    raise ValueError("MOONSTREAM_DATA_JOURNAL_ID environment variable must be set")

MOONSTREAM_ADMIN_ACCESS_TOKEN = os.environ.get("MOONSTREAM_ADMIN_ACCESS_TOKEN", "")
if MOONSTREAM_ADMIN_ACCESS_TOKEN == "":
    raise ValueError("MOONSTREAM_ADMIN_ACCESS_TOKEN environment variable must be set")

# Origin
RAW_ORIGINS = os.environ.get("MOONSTREAM_CORS_ALLOWED_ORIGINS")
if RAW_ORIGINS is None:
    raise ValueError(
        "MOONSTREAM_CORS_ALLOWED_ORIGINS environment variable must be set (comma-separated list of CORS allowed origins)"
    )
ORIGINS = RAW_ORIGINS.split(",")

# OpenAPI
DOCS_TARGET_PATH = "docs"

DEFAULT_STREAM_TIMEINTERVAL = 5 * 60

ETHTXPOOL_HUMBUG_CLIENT_ID = os.environ.get(
    "ETHTXPOOL_HUMBUG_CLIENT_ID", "client:ethereum-txpool-crawler-0"
)

# S3 Bucket
ETHERSCAN_SMARTCONTRACTS_BUCKET = os.environ.get("AWS_S3_SMARTCONTRACT_BUCKET")
if ETHERSCAN_SMARTCONTRACTS_BUCKET is None:
    raise ValueError("AWS_S3_SMARTCONTRACT_BUCKET is not set")
