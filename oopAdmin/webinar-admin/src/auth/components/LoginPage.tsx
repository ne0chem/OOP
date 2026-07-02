import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authApi";
import { useAppDispatch } from "../../app/hooks";
import { setToken } from "../../app/store";
import { toast } from "sonner";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }).unwrap();
      dispatch(setToken(response.token));
      localStorage.setItem("token", response.token);
      toast.success("Успешный вход!");
      navigate("/webinars");
    } catch (error) {
      toast.error("Ошибка входа. Проверьте логин и пароль.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 className="page-title" style={{ fontSize: "1.75rem" }}>
            Админ панель
          </h1>
          <p style={{ color: "#8e8e93", marginTop: "0.5rem" }}>
            Войдите в систему
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Логин</label>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
            />
          </div>

          <div className="input-group">
            <label className="label">Пароль</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="123"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};
