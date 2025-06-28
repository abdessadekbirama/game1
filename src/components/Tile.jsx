const Tile = ({ tile, index, size, image, empty, showFinalTile }) => {
  const row = Math.floor(index / size);
  const col = index % size;

  const tileSize = 128;
  const translateStyle = {
    transform: `translate(${col * tileSize}px, ${row * tileSize}px)`,
  };

  const effectiveTile =
    empty && showFinalTile
      ? size * size - 1 // القطعة الأخيرة (null سابقًا)
      : tile;

  const backgroundStyle = {
    backgroundImage: empty && !showFinalTile ? "none" : `url(${image})`,
    backgroundSize: `${size * 100}%`,
    backgroundPosition: `${(effectiveTile % size) * (100 / (size - 1))}% ${
      Math.floor(effectiveTile / size) * (100 / (size - 1))
    }%`,
  };

  return (
    <div
      className={`absolute w-32 h-32 border border-gray-300 ${
        empty && !showFinalTile ? "bg-white" : "shadow-md"
      } transition-transform duration-300 ease-in-out text-white text-xl font-bold`}
      style={{ ...translateStyle, ...backgroundStyle }}
    >
      {!empty && (
        <span className="w-8 h-8 rounded-full m-1 bg-black/50 text-white text-sm flex items-center justify-center">
          {tile + 1}
        </span>
      )}
    </div>
  );
};

export default Tile;
