const navToggleButton = document.getElementById("navToggle");
const navElement = document.getElementById("siteNav");
const yearElement = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");
const statElements = document.querySelectorAll(".stat");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

if (navToggleButton && navElement) {
  navToggleButton.addEventListener("click", () => {
    navElement.classList.toggle("open");
  });

  navElement.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navElement.classList.remove("open");
    });
  });
}

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

if (statElements.length > 0) {
  const statObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const statElement = entry.target;
        const targetValue = Number(statElement.getAttribute("data-target"));
        const suffix = targetValue === 99 ? ".95%" : "+";
        const durationMilliseconds = 1400;
        const startTime = performance.now();

        const animate = (timestamp) => {
          const progress = Math.min((timestamp - startTime) / durationMilliseconds, 1);
          const currentValue = Math.floor(progress * targetValue);
          statElement.textContent = `${currentValue}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            statElement.textContent = `${targetValue}${suffix}`;
          }
        };

        requestAnimationFrame(animate);
        observer.unobserve(statElement);
      });
    },
    { threshold: 0.3 }
  );

  statElements.forEach((statElement) => {
    statObserver.observe(statElement);
  });
}
