const dropZones = document.querySelectorAll('.drop-zone');
const puzzlePiecesContainer = document.getElementById('puzzle-pieces');

// Load the preloaded image from the images folder
const imagePath = '/static/images/miss.jpg'; // Replace with the actual image filename
const img = new Image();
img.src = imagePath;
img.onload = () => {
    createPuzzlePieces(img);
};

function createPuzzlePieces(image) {
    const pieceWidth = image.width / 2;
    const pieceHeight = image.height / 2;
    puzzlePiecesContainer.innerHTML = ''; // Clear existing pieces

    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 2; col++) {
            const canvas = document.createElement('canvas');
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(
                image,
                col * pieceWidth,
                row * pieceHeight,
                pieceWidth,
                pieceHeight,
                0,
                0,
                pieceWidth,
                pieceHeight
            );

            const imgPiece = document.createElement('img');
            imgPiece.src = canvas.toDataURL();
            imgPiece.classList.add('draggable');
            imgPiece.draggable = true;
            imgPiece.dataset.piece = row * 2 + col + 1;

            puzzlePiecesContainer.appendChild(imgPiece);

            imgPiece.addEventListener('dragstart', () => {
                imgPiece.classList.add('dragging');
            });

            imgPiece.addEventListener('dragend', () => {
                imgPiece.classList.remove('dragging');
                checkPuzzleCompletion();
            });
        }
    }
}

dropZones.forEach(zone => {
    zone.addEventListener('dragover', e => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        if (dragging && dragging.dataset.piece === zone.dataset.piece) {
            zone.appendChild(dragging);
        }
    });
});

function checkPuzzleCompletion() {
    const allCorrect = Array.from(dropZones).every(zone => {
        const child = zone.querySelector('.draggable');
        return child && child.dataset.piece === zone.dataset.piece;
    });

    if (allCorrect) {
        restoreOriginalImage();
    }
}

function restoreOriginalImage() {
    const puzzleBoard = document.querySelector('.puzzle-board');
    puzzleBoard.innerHTML = ''; // Clear the board
    puzzleBoard.style.display = 'flex'; // Center the image
    puzzleBoard.style.alignItems = 'center';
    puzzleBoard.style.justifyContent = 'center';

    const fullImage = document.createElement('img');
    fullImage.src = imagePath;
    fullImage.alt = 'Completed Puzzle';
    fullImage.style.width = '80%'; // Adjust the size to make it smaller
    fullImage.style.borderRadius = '10px';
    puzzleBoard.appendChild(fullImage);

    // Add a solved message
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('solved-message');
    messageContainer.innerHTML = `
        <h2>Puzzle is Solved!</h2>
        <p>If only you know, I miss you every time that we're busy with our own studies.</p>
    `;
    document.querySelector('.puzzle-container').appendChild(messageContainer);
}
