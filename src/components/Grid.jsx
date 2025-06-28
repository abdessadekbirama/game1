import Tile from "./Tile";
import { useEffect, useState } from "react";

const Grid = ({ size = 3 }) => {
  const totalTiles = size * size;

  const imageList = [
    "img1.jpeg",
    "img2.jpeg",
    "img3.jpeg",
    "img4.jpeg",
    "img5.jpeg",
    "img6.jpeg",
    "img7.jpeg",
    "img8.jpg",
    "img11.jpg",
  ];

  const [tiles, setTiles] = useState([]);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    resetGame();
  }, [size]);

  const isAdjacent = (i1, i2) => {
    const row1 = Math.floor(i1 / size);
    const col1 = i1 % size;
    const row2 = Math.floor(i2 / size);
    const col2 = i2 % size;

    return (
      (row1 === row2 && Math.abs(col1 - col2) === 1) ||
      (col1 === col2 && Math.abs(row1 - row2) === 1)
    );
  };

  const isSolved = (tiles) => {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i] !== i) return false;
    }
    return true;
  };

  const handleClick = (index) => {
    const emptyIndex = tiles.indexOf(null);
    if (isAdjacent(index, emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);

      if (isSolved(newTiles)) {
        setShowWinMessage(true);
      }
    }
  };

  const resetGame = () => {
    let current = [...Array(totalTiles - 1).keys()];
    current.push(null);

    const getEmptyIndex = () => current.indexOf(null);

    const getValidMoves = (emptyIndex) => {
      const row = Math.floor(emptyIndex / size);
      const col = emptyIndex % size;
      const moves = [];

      if (row > 0) moves.push(emptyIndex - size);
      if (row < size - 1) moves.push(emptyIndex + size);
      if (col > 0) moves.push(emptyIndex - 1);
      if (col < size - 1) moves.push(emptyIndex + 1);

      return moves;
    };

    for (let i = 0; i < 100; i++) {
      const emptyIndex = getEmptyIndex();
      const validMoves = getValidMoves(emptyIndex);
      const randomMove =
        validMoves[Math.floor(Math.random() * validMoves.length)];

      [current[emptyIndex], current[randomMove]] = [
        current[randomMove],
        current[emptyIndex],
      ];
    }

    setTiles(current);
    setShowWinMessage(false);

    const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
    setImage(`/images/${randomImage}`);
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <div
        className="relative"
        style={{
          width: `${size * 128}px`,
          height: `${size * 128}px`,
          backgroundColor: "#c5bebe",
          borderRadius: "0.5rem",
        }}
      >
        {tiles.map((tile, index) =>
          tile !== null || showWinMessage ? (
            <div key={index} onClick={() => handleClick(index)}>
              <Tile
                tile={tile ?? tiles.length - 1}
                index={index}
                size={size}
                image={image}
                empty={tile === null}
                showFinalTile={tile === null && showWinMessage}
              />
            </div>
          ) : null
        )}

        {showWinMessage && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-bold rounded-lg animate-fade-in">
            🎉 You Win!
          </div>
        )}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        🔁 Restart
      </button>
    </div>
  );
};

export default Grid;
