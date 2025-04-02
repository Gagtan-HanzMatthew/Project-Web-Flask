from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('first_page.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        # Example authentication logic using username only
        if username.lower() == 'nadine':  # Ensure case-insensitive comparison
            return redirect(url_for('menu'))  # Redirect to the menu page
        else:
            return render_template('login.html', error="Invalid username")
    return render_template('login.html')

@app.route('/menu')
def menu():
    return render_template('menu.html')

@app.route('/puzzle_game')
def puzzle_game():
    return render_template('puzzle_game.html')

@app.route('/valentine_confession')
def valentine_confession():
    return render_template('valentine_confession.html')

@app.route('/qa', methods=['GET', 'POST'])
def qa():
    if request.method == 'POST':
        # Retrieve form data
        flower = request.form['flower']
        food = request.form['food']
        music = request.form['music']
        love_language = request.form['love_language']

        # Store the data in a text file with specified encoding
        with open('qa_responses.txt', 'a', encoding='utf-8') as file:
            file.write(f"Favorite Flower: {flower}\n")
            file.write(f"Favorite Food: {food}\n")
            file.write(f"Music Preference: {music}\n")
            file.write(f"Love Language: {love_language}\n")
            file.write("-" * 40 + "\n")

        # Redirect back to the Q&A page or a success page
        return redirect(url_for('qa'))

    return render_template('qa.html')

@app.route('/flowers')
def flowers():
    return render_template('flowers.html')

if __name__ == '__main__':
    app.run(debug=True)
