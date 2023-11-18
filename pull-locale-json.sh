#!/bin/bash

create_json_file() {
    FILE_PATH=$1

    mkdir -p $(dirname "$FILE_PATH")

    echo '{"error": "Oops, something went wrong!", "success": "Success", "seo": { "title": "Astro advanced POC", "description": "Astro advanced POC" }}' > "$FILE_PATH"
}

EN_FILE_PATH="src/i18n/locales/en.json"
RU_FILE_PATH="src/i18n/locales/ru.json"

create_json_file "$EN_FILE_PATH"
create_json_file "$RU_FILE_PATH"