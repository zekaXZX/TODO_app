document.addEventListener("DOMContentLoaded", () => {

    const tasks = document.querySelectorAll(".task-card");
    const searchInput = document.getElementById("searchInput");
    const categoryButtons = document.querySelectorAll(".category-filter");

    let currentCategory = "all";
    let currentSearchQuery = "";

    /* ===========================
        UNIFIED FILTERING (SEARCH + CATEGORY)
    =========================== */
    function applyFilters() {
        tasks.forEach(task => {
            const taskText = task.innerText.toLowerCase();
            const taskCategory = task.dataset.category ? task.dataset.category.toLowerCase() : "";

            const matchesCategory = (currentCategory === "all") || (taskCategory === currentCategory);
            const matchesSearch = taskText.includes(currentSearchQuery);

            if (matchesCategory && matchesSearch) {
                task.style.display = "block";
                setTimeout(() => task.style.opacity = "1", 10);
            } else {
                task.style.opacity = "0";
                task.style.display = "none";
            }
        });
    }

    /* ===========================
            CATEGORY FILTER
    =========================== */
    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentCategory = button.dataset.category.toLowerCase();

            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            applyFilters();
        });
    });

    /* ===========================
            SEARCH
    =========================== */
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            currentSearchQuery = searchInput.value.toLowerCase().trim();
            applyFilters();
        });
    }

    /* Keyboard shortcut CTRL + K */
    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            searchInput?.focus();
        }
    });

    /* ===========================
            THEME SWITCHER
    =========================== */
    const themeButton = document.getElementById("themeToggle");
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        html.setAttribute("data-theme", savedTheme);
    }

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            html.style.transition = "0.4s";
            html.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);

            showToast(newTheme === "dark" ? "🌙 Dark mode enabled" : "☀️ Light mode enabled");
        });
    }

    /* ===========================
            SCROLL BUTTON
    =========================== */
    const scrollButton = document.getElementById("scrollTop");

    if (scrollButton) {
        window.addEventListener("scroll", () => {
            scrollButton.classList.toggle("show", window.scrollY > 500);
        });

        scrollButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ===========================
            BUTTON RIPPLE
    =========================== */
    document.querySelectorAll("a, button").forEach(button => {
        button.addEventListener("click", function(e) {
            if (this.type === "submit") return;

            const circle = document.createElement("span");
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const rect = this.getBoundingClientRect();

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
            circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
            circle.classList.add("ripple");

            this.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
        });
    });

    /* ===========================
            CARD REVEAL
    =========================== */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.15 });

    tasks.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        observer.observe(card);
    });

    /* ===========================
            CREATE TASK MODAL
    =========================== */
    const modal = document.getElementById("taskModal");
    const openButtons = document.querySelectorAll(".hero .new-task, .empty-state .new-task");
    const closeModal = document.getElementById("closeModal");

    openButtons.forEach(btn => btn.addEventListener("click", () => modal?.classList.add("active")));
    closeModal?.addEventListener("click", () => modal?.classList.remove("active"));

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("active");
    });

    /* ===========================
            EDIT TASK MODAL
    =========================== */
    const editButtons = document.querySelectorAll(".edit");
    const editModal = document.getElementById("editTaskModal");
    const closeEditModal = document.getElementById("closeEditModal");

    const editTitle = document.getElementById("editTitle");
    const editDescription = document.getElementById("editDescription");
    const editCategory = document.getElementById("editCategory");
    const editForm = document.getElementById("editTaskForm");

    editButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (editTitle) editTitle.value = button.dataset.title || "";
            if (editDescription) editDescription.value = button.dataset.description || "";
            if (editCategory) editCategory.value = button.dataset.category || "";

            if (editForm) editForm.action = button.dataset.url || "";

            editModal?.classList.add("active");
        });
    });

    closeEditModal?.addEventListener("click", () => editModal?.classList.remove("active"));

    editModal?.addEventListener("click", (e) => {
        if (e.target === editModal) editModal.classList.remove("active");
    });

    /* ESC Key to close all modals */
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal?.classList.remove("active");
            editModal?.classList.remove("active");
        }
    });
});

/* ===========================
        TOAST NOTIFICATION
=========================== */
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerHTML = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}