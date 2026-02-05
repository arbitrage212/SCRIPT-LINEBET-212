const DURATION = 2 * 60 * 60 * 1000;

// ================= LOGIN =================
async function checkCode() {
  const code = document.getElementById("code").value;

  if (!/^\d{10}$/.test(code)) {
    alert("ACCESS DENIED");
    return;
  }

  const res = await fetch("codes.json");
  const data = await res.json();

  if (data.codes.includes(code)) {
    localStorage.setItem("code", code);
    localStorage.setItem("start", Date.now());
    window.location.href = "app.html";
  } else {
    alert("INVALID CODE");
  }
}

// ================= TIMER =================
function startTimer() {
  if (!localStorage.getItem("start")) {
    window.location.href = "index.html";
    return;
  }

  setInterval(() => {
    const elapsed = Date.now() - localStorage.getItem("start");
    const remaining = DURATION - elapsed;

    if (remaining <= 0) {
      logout();
      return;
    }

    document.getElementById("timer").innerText =
      new Date(remaining).toISOString().substr(11, 8);
  }, 1000);
}

// ================= GOLD SYSTEM =================
function showGold() {
  const rows = document.querySelectorAll(".row");

  rows.forEach(row => {
    const cells = row.querySelectorAll(".cell");

    // RESET DE LA LIGNE
    cells.forEach(cell => {
      cell.classList.remove("gold");
      cell.innerText = "";
    });

    // CHOIX ALÉATOIRE (1 SUR 2)
    const chosen = cells[Math.floor(Math.random() * 2)];
    chosen.classList.add("gold");
    chosen.innerText = "GOLD";
  });
}

// ================= LOGOUT =================
function logout() {
  localStorage.clear();
  alert("SESSION EXPIRED");
  window.location.href = "index.html";
}
