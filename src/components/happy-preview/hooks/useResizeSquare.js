export const useResizeSquare = () => {
  const maskSquareDown = (e) => {
    console.log("square down");
  };

  const maskSquareMove = (e) => {
    console.log("square move");
  };
  return {
    maskSquareDown,
    maskSquareMove,
  };
};
