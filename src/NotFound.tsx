import Navbar from "./Navbar";

function NotFound(){
  return (
    <>
      <Navbar/>
      <div className="container-parent">
        <div className="container-box">
          <div
            className="alert alert-secondary container-top"
            style={{ backgroundColor: "red" }}
          >
            <h1 className="mb-3 text-center">Page not found</h1>
          </div>
          <img
            src="/src/assets/404.png"
            style={{ display: "block", margin: "auto" }}
          />
        </div>
      </div>
    </>
  );
}

export default NotFound;