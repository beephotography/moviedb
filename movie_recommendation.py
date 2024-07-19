import requests
import openai

# Funktion, um API-Schlüssel aus einer Datei auszulesen
def read_api_key(file_name):
    with open(file_name, 'r') as file:
        return file.read().strip()

# OMDB API-Key und OpenAI API-Schlüssel aus den Dateien lesen
omdb_api_key = read_api_key('omdb_api_key.txt')
openai.api_key = read_api_key('openai_api_key.txt')

# Funktion, um Filmdaten von OMDB abzurufen
def get_movie_data(title, api_key):
    url = f"http://www.omdbapi.com/?t={title}&apikey={api_key}"
    response = requests.get(url)
    return response.json()

# Funktion, um ähnliche Filme von GPT-4 abzurufen
def get_similar_movies(movie_data):
    prompt = f"Ich habe die folgenden Filmdaten: {movie_data}. Welche ähnlichen Filme kannst du mir basierend auf diesen Informationen empfehlen?"

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=prompt,
        max_tokens=200
    )

    return response.choices[0].text.strip()

# Beispiel-Film abrufen
movie_title = "The Matrix"
movie_data = get_movie_data(movie_title, omdb_api_key)

if movie_data['Response'] == "True":
    similar_movies = get_similar_movies(movie_data)
    print("Ähnliche Filme:", similar_movies)
else:
    print("Film nicht gefunden.")
