import { navigate } from "../main.js";
import { updateNav } from "../main.js";

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("apiKey");

  updateNav();
  navigate("/");
}
