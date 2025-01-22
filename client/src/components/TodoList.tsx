import { CSSProperties } from "react";

// CSS-in-JS
const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  innerContainer: {
    width: "50%",
    height: "50%",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "#ccd8e1",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "32px",
    color: "#333",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    boxSizing: "border-box",
    borderRadius: "4px",
    border: "none",
    outline: "none",
  },
  list: {
    listStyleType: "none",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    margin: "8px 0",
    padding: "12px",
    borderRadius: "4px",
    textAlign: "left",
    transition: "box-shadow 0.3s",
  },
  addButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
  deleteButton: {
    marginLeft: "10px",
    cursor: "pointer",
    color: "red",
    textAlign: "right",
    transition: "color 0.3s",
  },
};

const Test = () => {
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <p style={styles.title}>Todo List</p>
        <input
          type="text"
          placeholder="What needs to be done?"
          style={styles.input}
        />
        <button style={styles.addButton}>Add Todo</button>
        <ul style={styles.list}>
          <li
            style={styles.listItem}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            TRPCの勉強
            <span
              style={styles.deleteButton}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6347")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "red")}
            >
              ✖
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Test;
