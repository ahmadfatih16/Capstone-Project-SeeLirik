const LandingPresenter = {
    init() {
      const menuIcon = document.querySelector('ion-icon[name="menu"]');
      const navLinks = document.querySelector("nav ul");
  
      if (menuIcon && navLinks) {
        menuIcon.addEventListener("click", () => {
          const expanded = navLinks.classList.contains("top-[80px]");
          navLinks.classList.toggle("top-[80px]", !expanded);
          navLinks.classList.toggle("opacity-100", !expanded);
          navLinks.classList.toggle("top-[-400px]", expanded);
        });
      }
    },
  };
  
  export default LandingPresenter;
  