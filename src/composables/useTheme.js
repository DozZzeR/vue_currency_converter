import { ref, onMounted } from "vue";

const KEY = "theme";

export function useTheme() {
  const theme = ref("dark");

  function apply(next) {
    theme.value = next;
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(KEY, next); } catch {}
  }

  function toggle() {
    apply(theme.value === "dark" ? "light" : "dark");
  }

  onMounted(() => {
    const saved = (() => {
      try { return localStorage.getItem(KEY); } catch { return null; }
    })();

    if (saved === "light" || saved === "dark") {
      apply(saved);
      return;
    }

    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
    apply(prefersDark ? "dark" : "light");
  });

  return { theme, apply, toggle };
}
