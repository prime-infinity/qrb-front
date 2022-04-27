function LoadingScreen() {
  return (
    <div className="cover">
      <div className="text-center to-center">
        <div
          className="spinner-border"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
