import { CSSProperties, useState } from "react";
import { trpc } from "../utils/trpc";

// CSS-in-JS
const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  innerContainer: {
    width: "100%",
    maxWidth: "600px",
    minHeight: "400px",
    padding: "30px",
    borderRadius: "15px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0 16px 0",
    boxSizing: "border-box",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "16px",
    transition: "border-color 0.3s",
  },
  inputFocus: {
    borderColor: "#4CAF50",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: "20px 0 0 0",
    maxHeight: "400px",
    overflowY: "auto",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    margin: "8px 0",
    padding: "12px 16px",
    borderRadius: "8px",
    textAlign: "left",
    transition: "all 0.3s ease",
    border: "1px solid #eee",
  },
  addButton: {
    width: "100%",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#4CAF50",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  addButtonHover: {
    backgroundColor: "#45a049",
  },
  deleteButton: {
    marginLeft: "10px",
    cursor: "pointer",
    color: "#ff4444",
    fontSize: "18px",
    background: "none",
    border: "none",
    padding: "4px 8px",
    transition: "color 0.3s",
  },
};

const Test = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isAddButtonHovered, setIsAddButtonHovered] = useState(false);
  const allTodoLists = trpc.getTodoList.useQuery();
  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      allTodoLists.refetch();
    },
  });

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <p style={styles.title}>Todo List</p>
        <input
          type="text"
          placeholder="What needs to be done?"
          style={{
            ...styles.input,
            ...(isInputFocused ? styles.inputFocus : {}),
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          value={inputValue}
        />
        <button
          style={{
            ...styles.addButton,
            ...(isAddButtonHovered ? styles.addButtonHover : {}),
          }}
          onMouseEnter={() => setIsAddButtonHovered(true)}
          onMouseLeave={() => setIsAddButtonHovered(false)}
          onClick={() => {
            addTodo.mutate(inputValue);
            setInputValue("");
          }}
        >
          Add Todo
        </button>
        <ul style={styles.list}>
          {allTodoLists.data?.map((todo) => (
            <li
              key={todo.id}
              style={styles.listItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0px 4px 10px rgba(0,0,0,0.2)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {todo.content}
              <span
                style={styles.deleteButton}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6347")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "red")}
              >
                ✖
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Test;
