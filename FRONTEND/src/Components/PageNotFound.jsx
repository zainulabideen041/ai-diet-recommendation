const NotFoundPage = () => {
  return (
    <div
      style={{
        height: "95vh",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "5rem" }}>404 Page Not Found</h1>
      <p style={{ fontSize: "2rem" }}>
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
